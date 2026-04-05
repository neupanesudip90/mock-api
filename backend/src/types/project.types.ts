import { ProjectStatus, RateLimitStrategy } from "@/generated/client";

// ============================================================================
// Input Types
// ============================================================================
export interface CreateProjectInput {
  name: string;
  description?: string;
  defaultRateLimitMax?: number;
  defaultRateLimitWindow?: number;
  defaultRateLimitStrategy?: RateLimitStrategy;
}

export interface UpdateProjectInput {
  name?: string;
  description?: string | null;
  status?: ProjectStatus;
  defaultRateLimitMax?: number;
  defaultRateLimitWindow?: number;
  defaultRateLimitStrategy?: RateLimitStrategy;
}

// ============================================================================
// Response Types
// ============================================================================
export interface ProjectResponse {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  defaultRateLimitMax: number;
  defaultRateLimitWindow: number;
  defaultRateLimitStrategy: RateLimitStrategy;
  endpointCount: number;
  apiKeyCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedProjectsResponse {
  projects: ProjectResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
