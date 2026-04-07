export interface UsageSummary {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  rateLimitedRequests: number;
  averageResponseTime: number;
  uniqueIPs: number;
}

export interface EndpointStats {
  endpointId: string;
  path: string;
  method: string;
  totalRequests: number;
  successRate: number;
  averageResponseTime: number;
  rateLimitedCount: number;
}

export interface TimeSeriesData {
  timestamp: Date;
  requests: number;
  errors: number;
  avgResponseTime: number;
}

export interface AnalyticsResponse {
  summary: UsageSummary;
  endpointStats: EndpointStats[];
  timeSeries: TimeSeriesData[];
  topIPs: { ip: string; count: number }[];
  period: {
    start: Date;
    end: Date;
  };
}

export interface AnalyticsQuery {
  startDate?: Date;
  endDate?: Date;
  endpointId?: string;
  groupBy?: "hour" | "day" | "week";
}
