import Redis from "ioredis";
import { env } from "@/config/env";
import { logger } from "@/utils/logger";

let redisClient: Redis | null = null;

let redis: Redis | null = null;

export const getRedisClient = (): Redis => {
  if (!redis) {
    redis = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      lazyConnect: true,
    });

    redis.on("connect", () => {
      logger.info("✅ Redis connected");
    });

    redis.on("error", (err) => {
      logger.error("❌ Redis error", err);
    });
  }

  return redis;
};

export const closeRedisConnection = async (): Promise<void> => {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
    logger.info("Redis connection closed");
  }
};
