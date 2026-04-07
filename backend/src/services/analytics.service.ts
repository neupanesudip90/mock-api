import { prisma } from "@/config/database";
import { verifyProjectOwnership } from "@/services/project.service";
import type {
  UsageSummary,
  EndpointStats,
  TimeSeriesData,
  AnalyticsResponse,
  AnalyticsQuery,
} from "@/types/analytics.types";

// ============================================================================
// Get Usage Summary
// ============================================================================
const getUsageSummary = async (
  projectId: string,
  startDate: Date,
  endDate: Date,
): Promise<UsageSummary> => {
  const [stats, uniqueIPs] = await Promise.all([
    prisma.usageLog.aggregate({
      where: {
        projectId,
        timestamp: { gte: startDate, lte: endDate },
      },
      _count: { id: true },
      _avg: { responseTimeMs: true },
    }),
    prisma.usageLog.groupBy({
      by: ["ipAddress"],
      where: {
        projectId,
        timestamp: { gte: startDate, lte: endDate },
        ipAddress: { not: null },
      },
    }),
  ]);

  const [successCount, failedCount, rateLimitedCount] = await Promise.all([
    prisma.usageLog.count({
      where: {
        projectId,
        timestamp: { gte: startDate, lte: endDate },
        statusCode: { gte: 200, lt: 400 },
      },
    }),
    prisma.usageLog.count({
      where: {
        projectId,
        timestamp: { gte: startDate, lte: endDate },
        statusCode: { gte: 400 },
        rateLimitHit: false,
      },
    }),
    prisma.usageLog.count({
      where: {
        projectId,
        timestamp: { gte: startDate, lte: endDate },
        rateLimitHit: true,
      },
    }),
  ]);

  return {
    totalRequests: stats._count.id,
    successfulRequests: successCount,
    failedRequests: failedCount,
    rateLimitedRequests: rateLimitedCount,
    averageResponseTime: Math.round(stats._avg.responseTimeMs || 0),
    uniqueIPs: uniqueIPs.length,
  };
};

// ============================================================================
// Get Endpoint Stats
// ============================================================================
const getEndpointStats = async (
  projectId: string,
  startDate: Date,
  endDate: Date,
): Promise<EndpointStats[]> => {
  const endpoints = await prisma.endpoint.findMany({
    where: { projectId },
    select: { id: true, path: true, method: true },
  });

  const stats = await Promise.all(
    endpoints.map(async (endpoint) => {
      const [total, success, rateLimited, avgResponse] = await Promise.all([
        prisma.usageLog.count({
          where: {
            endpointId: endpoint.id,
            timestamp: { gte: startDate, lte: endDate },
          },
        }),
        prisma.usageLog.count({
          where: {
            endpointId: endpoint.id,
            timestamp: { gte: startDate, lte: endDate },
            statusCode: { gte: 200, lt: 400 },
          },
        }),
        prisma.usageLog.count({
          where: {
            endpointId: endpoint.id,
            timestamp: { gte: startDate, lte: endDate },
            rateLimitHit: true,
          },
        }),
        prisma.usageLog.aggregate({
          where: {
            endpointId: endpoint.id,
            timestamp: { gte: startDate, lte: endDate },
          },
          _avg: { responseTimeMs: true },
        }),
      ]);

      return {
        endpointId: endpoint.id,
        path: endpoint.path,
        method: endpoint.method,
        totalRequests: total,
        successRate: total > 0 ? Math.round((success / total) * 100) : 100,
        averageResponseTime: Math.round(avgResponse._avg.responseTimeMs || 0),
        rateLimitedCount: rateLimited,
      };
    }),
  );

  return stats.sort((a, b) => b.totalRequests - a.totalRequests);
};

// ============================================================================
// Get Time Series Data
// ============================================================================
const getTimeSeries = async (
  projectId: string,
  startDate: Date,
  endDate: Date,
  groupBy: "hour" | "day" | "week" = "hour",
): Promise<TimeSeriesData[]> => {
  // Use raw query for time-based grouping
  const intervalMap = {
    hour: "hour",
    day: "day",
    week: "week",
  };

  const interval = intervalMap[groupBy];

  const result = await prisma.$queryRaw<
    {
      bucket: Date;
      requests: bigint;
      errors: bigint;
      avg_response: number;
    }[]
  >`
    SELECT 
      date_trunc(${interval}, timestamp) as bucket,
      COUNT(*) as requests,
      COUNT(*) FILTER (WHERE status_code >= 400) as errors,
      AVG(response_time_ms) as avg_response
    FROM usage_logs
    WHERE project_id = ${projectId}
      AND timestamp >= ${startDate}
      AND timestamp <= ${endDate}
    GROUP BY bucket
    ORDER BY bucket ASC
  `;

  return result.map((row) => ({
    timestamp: row.bucket,
    requests: Number(row.requests),
    errors: Number(row.errors),
    avgResponseTime: Math.round(row.avg_response || 0),
  }));
};

// ============================================================================
// Get Top IPs
// ============================================================================
const getTopIPs = async (
  projectId: string,
  startDate: Date,
  endDate: Date,
  limit: number = 10,
): Promise<{ ip: string; count: number }[]> => {
  const result = await prisma.usageLog.groupBy({
    by: ["ipAddress"],
    where: {
      projectId,
      timestamp: { gte: startDate, lte: endDate },
      ipAddress: { not: null },
    },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: limit,
  });

  return result.map((row) => ({
    ip: row.ipAddress || "unknown",
    count: row._count.id,
  }));
};

// ============================================================================
// Main Analytics Function
// ============================================================================
export const getProjectAnalytics = async (
  userId: string,
  projectId: string,
  query: AnalyticsQuery = {},
): Promise<AnalyticsResponse> => {
  await verifyProjectOwnership(userId, projectId);

  const endDate = query.endDate || new Date();
  const startDate =
    query.startDate || new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000); // Default: 7 days

  const [summary, endpointStats, timeSeries, topIPs] = await Promise.all([
    getUsageSummary(projectId, startDate, endDate),
    getEndpointStats(projectId, startDate, endDate),
    getTimeSeries(projectId, startDate, endDate, query.groupBy),
    getTopIPs(projectId, startDate, endDate),
  ]);

  return {
    summary,
    endpointStats,
    timeSeries,
    topIPs,
    period: {
      start: startDate,
      end: endDate,
    },
  };
};

// ============================================================================
// Single Endpoint Analytics
// ============================================================================
export const getEndpointAnalytics = async (
  userId: string,
  projectId: string,
  endpointId: string,
  query: AnalyticsQuery = {},
): Promise<{
  endpoint: EndpointStats;
  timeSeries: TimeSeriesData[];
  recentRequests: any[];
}> => {
  await verifyProjectOwnership(userId, projectId);

  const endDate = query.endDate || new Date();
  const startDate =
    query.startDate || new Date(endDate.getTime() - 24 * 60 * 60 * 1000); // Default: 24 hours

  const endpoint = await prisma.endpoint.findFirst({
    where: { id: endpointId, projectId },
  });

  if (!endpoint) {
    throw new Error("Endpoint not found");
  }

  // Get endpoint stats
  const [total, success, rateLimited, avgResponse] = await Promise.all([
    prisma.usageLog.count({
      where: {
        endpointId,
        timestamp: { gte: startDate, lte: endDate },
      },
    }),
    prisma.usageLog.count({
      where: {
        endpointId,
        timestamp: { gte: startDate, lte: endDate },
        statusCode: { gte: 200, lt: 400 },
      },
    }),
    prisma.usageLog.count({
      where: {
        endpointId,
        timestamp: { gte: startDate, lte: endDate },
        rateLimitHit: true,
      },
    }),
    prisma.usageLog.aggregate({
      where: {
        endpointId,
        timestamp: { gte: startDate, lte: endDate },
      },
      _avg: { responseTimeMs: true },
    }),
  ]);

  // Time series for this endpoint
  const timeSeries = await prisma.$queryRaw<
    {
      bucket: Date;
      requests: bigint;
      errors: bigint;
      avg_response: number;
    }[]
  >`
    SELECT 
      date_trunc('hour', timestamp) as bucket,
      COUNT(*) as requests,
      COUNT(*) FILTER (WHERE status_code >= 400) as errors,
      AVG(response_time_ms) as avg_response
    FROM usage_logs
    WHERE endpoint_id = ${endpointId}
      AND timestamp >= ${startDate}
      AND timestamp <= ${endDate}
    GROUP BY bucket
    ORDER BY bucket ASC
  `;

  // Recent requests
  const recentRequests = await prisma.usageLog.findMany({
    where: {
      endpointId,
      timestamp: { gte: startDate, lte: endDate },
    },
    orderBy: { timestamp: "desc" },
    take: 50,
    select: {
      id: true,
      ipAddress: true,
      statusCode: true,
      responseTimeMs: true,
      rateLimitHit: true,
      timestamp: true,
    },
  });

  return {
    endpoint: {
      endpointId: endpoint.id,
      path: endpoint.path,
      method: endpoint.method,
      totalRequests: total,
      successRate: total > 0 ? Math.round((success / total) * 100) : 100,
      averageResponseTime: Math.round(avgResponse._avg.responseTimeMs || 0),
      rateLimitedCount: rateLimited,
    },
    timeSeries: timeSeries.map((row) => ({
      timestamp: row.bucket,
      requests: Number(row.requests),
      errors: Number(row.errors),
      avgResponseTime: Math.round(row.avg_response || 0),
    })),
    recentRequests,
  };
};
