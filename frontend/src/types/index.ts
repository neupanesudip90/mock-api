// ============================================================================
// Auth Types
// ============================================================================
export interface User {
  id: string;
  email: string;
  name: string | null;
  emailVerified: boolean;
}

export interface AuthTokens {
  accessToken: string;
  expiresIn: number;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name?: string;
}

export interface VerifyEmailPayload {
  otp: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  otp: string;
  newPassword: string;
}

// ============================================================================
// Project Types
// ============================================================================
export type ProjectStatus = "ACTIVE" | "INACTIVE" | "ARCHIVED";
export type RateLimitStrategy =
  | "FIXED_WINDOW"
  | "SLIDING_LOG"
  | "TOKEN_BUCKET"
  | "LEAKY_BUCKET";
export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

export interface Project {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  defaultRateLimitMax: number;
  defaultRateLimitWindow: number;
  defaultRateLimitStrategy: RateLimitStrategy;
  endpointCount: number;
  apiKeyCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectPayload {
  name: string;
  description?: string;
  defaultRateLimitMax?: number;
  defaultRateLimitWindow?: number;
  defaultRateLimitStrategy?: RateLimitStrategy;
}

export interface UpdateProjectPayload {
  name?: string;
  description?: string;
  status?: ProjectStatus;
  defaultRateLimitMax?: number;
  defaultRateLimitWindow?: number;
  defaultRateLimitStrategy?: RateLimitStrategy;
}

// ============================================================================
// Endpoint Types
// ============================================================================
export interface Endpoint {
  id: string;
  projectId: string;
  path: string;
  method: HttpMethod;
  responseSchema: Record<string, unknown>;
  statusCode: number;
  delayMs: number;
  rateLimitEnabled: boolean;
  rateLimitStrategy: RateLimitStrategy;
  rateLimitMax: number;
  rateLimitWindow: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEndpointPayload {
  path: string;
  method: HttpMethod;
  responseSchema: Record<string, unknown>;
  statusCode?: number;
  delayMs?: number;
  rateLimitEnabled?: boolean;
  rateLimitStrategy?: RateLimitStrategy;
  rateLimitMax?: number;
  rateLimitWindow?: number;
}

export interface UpdateEndpointPayload {
  path?: string;
  method?: HttpMethod;
  responseSchema?: Record<string, unknown>;
  statusCode?: number;
  delayMs?: number;
  rateLimitEnabled?: boolean;
  rateLimitStrategy?: RateLimitStrategy;
  rateLimitMax?: number;
  rateLimitWindow?: number;
}

// ============================================================================
// API Key Types
// ============================================================================
export interface ApiKey {
  id: string;
  projectId: string;
  name: string;
  keyPrefix: string;
  isActive: boolean;
  lastUsedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiKeyWithSecret extends ApiKey {
  plainKey: string;
}

export interface CreateApiKeyPayload {
  name: string;
}

// ============================================================================
// Analytics Types
// ============================================================================
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
  timestamp: string;
  requests: number;
  errors: number;
  avgResponseTime: number;
}

export interface Analytics {
  summary: UsageSummary;
  endpointStats: EndpointStats[];
  timeSeries: TimeSeriesData[];
  topIPs: Array<{ ip: string; count: number }>;
  period: {
    start: string;
    end: string;
  };
}

// ============================================================================
// API Response Types
// ============================================================================
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
