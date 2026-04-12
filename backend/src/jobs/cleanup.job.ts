import cron from "node-cron";
import { prisma } from "@/config/database";
import { logger } from "@/utils/logger";
import { env } from "@/config/env";


// Cleanup Expired OTPs

const cleanupExpiredOTPs = async (): Promise<void> => {
  try {
    const result = await prisma.otpCode.deleteMany({
      where: {
        OR: [{ expiresAt: { lt: new Date() } }, { usedAt: { not: null } }],
      },
    });

    if (result.count > 0) {
      logger.info(`Cleaned up ${result.count} expired/used OTPs`);
    }
  } catch (error) {
    logger.error("Failed to cleanup OTPs:", error);
  }
};


// Cleanup Old Usage Logs (Keep last 30 days)

const cleanupOldUsageLogs = async (): Promise<void> => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const result = await prisma.usageLog.deleteMany({
      where: {
        timestamp: { lt: thirtyDaysAgo },
      },
    });

    if (result.count > 0) {
      logger.info(`Cleaned up ${result.count} old usage logs`);
    }
  } catch (error) {
    logger.error("Failed to cleanup usage logs:", error);
  }
};


// Cleanup Inactive API Keys (not used in 90 days)

const warnUnusedAPIKeys = async (): Promise<void> => {
  try {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const unusedKeys = await prisma.apiKey.findMany({
      where: {
        isActive: true,
        OR: [{ lastUsedAt: null }, { lastUsedAt: { lt: ninetyDaysAgo } }],
      },
      include: {
        project: {
          select: {
            name: true,
            user: { select: { email: true } },
          },
        },
      },
    });

    for (const key of unusedKeys) {
      logger.warn(
        `API Key "${key.name}" in project "${key.project.name}" hasn't been used in 90+ days`,
      );
      // Could send email notification to user here
    }
  } catch (error) {
    logger.error("Failed to check unused API keys:", error);
  }
};


// Archive Old Projects (optional - mark as ARCHIVED if no activity)

const archiveInactiveProjects = async (): Promise<void> => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // Find projects with no usage logs in 6 months
    const inactiveProjects = await prisma.project.findMany({
      where: {
        status: "ACTIVE",
        logs: {
          none: {
            timestamp: { gte: sixMonthsAgo },
          },
        },
      },
    });

    for (const project of inactiveProjects) {
      logger.info(
        `Project "${project.name}" (${project.id}) has no activity in 6 months - consider archiving`,
      );
      // Auto-archive is risky, just log for now
      // await prisma.project.update({
      //   where: { id: project.id },
      //   data: { status: "ARCHIVED" },
      // });
    }
  } catch (error) {
    logger.error("Failed to check inactive projects:", error);
  }
};


// Database Statistics (for monitoring)

const logDatabaseStats = async (): Promise<void> => {
  try {
    const [users, projects, endpoints, apiKeys, usageLogs, otpCodes] =
      await Promise.all([
        prisma.user.count(),
        prisma.project.count(),
        prisma.endpoint.count(),
        prisma.apiKey.count(),
        prisma.usageLog.count(),
        prisma.otpCode.count(),
      ]);

    logger.info("Database Statistics:", {
      users,
      projects,
      endpoints,
      apiKeys,
      usageLogs,
      otpCodes,
    });
  } catch (error) {
    logger.error("Failed to get database stats:", error);
  }
};


// Initialize All Cron Jobs

export const initializeCleanupJobs = (): void => {
  if (env.NODE_ENV === "test") {
    logger.info("Skipping cron jobs in test environment");
    return;
  }

  // Cleanup expired OTPs every hour
  cron.schedule("0 * * * *", () => {
    logger.info("Running OTP cleanup job...");
    cleanupExpiredOTPs();
  });

  // Cleanup old usage logs daily at 3 AM
  cron.schedule("0 3 * * *", () => {
    logger.info("Running usage logs cleanup job...");
    cleanupOldUsageLogs();
  });

  // Check unused API keys weekly on Sunday at 4 AM
  cron.schedule("0 4 * * 0", () => {
    logger.info("Running unused API keys check...");
    warnUnusedAPIKeys();
  });

  // Check inactive projects monthly on the 1st at 5 AM
  cron.schedule("0 5 1 * *", () => {
    logger.info("Running inactive projects check...");
    archiveInactiveProjects();
  });

  // Log database stats daily at midnight
  cron.schedule("0 0 * * *", () => {
    logDatabaseStats();
  });

  logger.info("Cleanup jobs initialized");
};


// Manual Cleanup Functions (for admin endpoints or CLI)

export const runAllCleanups = async (): Promise<{
  otps: number;
  logs: number;
}> => {
  const [otpResult, logResult] = await Promise.all([
    prisma.otpCode.deleteMany({
      where: {
        OR: [{ expiresAt: { lt: new Date() } }, { usedAt: { not: null } }],
      },
    }),
    prisma.usageLog.deleteMany({
      where: {
        timestamp: { lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      },
    }),
  ]);

  return {
    otps: otpResult.count,
    logs: logResult.count,
  };
};
