import "module-alias/register";
import app from "./app";
import { env } from "@/config/env";
import { logger } from "@/utils/logger";
import { prisma } from "@/config/database";
import { getRedisClient } from "@/config/redis.config";
import { initializeCleanupJobs } from "@/jobs/cleanup.job";
import { closeRedisConnection } from "@/config/redis.config";
import { closeEmailTransporter } from "@/config/email.config";

const PORT = parseInt(env.PORT, 10);

const startServer = async () => {
  // Check DB connection before accepting requests
  try {
    await prisma.$connect();
    logger.info("✅ Database connected successfully");
  } catch (error) {
    logger.error("❌ Database connection failed", { error });
    process.exit(1); // no point running if DB is down
  }

  //redis connection
  try {
    const redis = getRedisClient();
    await redis.connect();
    await redis.ping();
  } catch (error) {
    logger.error("❌ Redis connection failed", { error });
    process.exit(1); // no point running if Redis is down
  }
  const server = app.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT} in ${env.NODE_ENV} mode`);
  });

  // Graceful Shutdown
  const shutdown = async (signal: string) => {
    logger.info(`Received ${signal}. Shutting down gracefully...`);
    server.close(async () => {
      await prisma.$disconnect();
      logger.info("Database connection closed.");

      await closeRedisConnection();

      await closeEmailTransporter();

      logger.info("All connections closed. Exiting now.");

      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));

  // Handle uncaught exceptions
  process.on("uncaughtException", (err) => {
    logger.error("Uncaught Exception:", err);
    shutdown("uncaughtException");
  });

  process.on("unhandledRejection", (err) => {
    logger.error("Unhandled Rejection:", err);
    shutdown("unhandledRejection");
  });
};

startServer();
