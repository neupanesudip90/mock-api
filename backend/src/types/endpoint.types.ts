import { HttpMethod, RateLimitStrategy } from "@/generated/client";


// Input Types
export interface CreateEndpointInput {
  path: string;
  method: HttpMethod;
  responseSchema: Record<string, any>;
  statusCode?: number;
  delayMs?: number;
  rateLimitEnabled?: boolean;
  rateLimitStrategy?: RateLimitStrategy;
  rateLimitMax?: number;
  rateLimitWindow?: number;
}

export interface UpdateEndpointInput {
  path?: string;
  method?: HttpMethod;
  responseSchema?: Record<string, any>;
  statusCode?: number;
  delayMs?: number;
  rateLimitEnabled?: boolean;
  rateLimitStrategy?: RateLimitStrategy;
  rateLimitMax?: number;
  rateLimitWindow?: number;
}


// Response Types
export interface EndpointResponse {
  id: string;
  projectId: string;
  path: string;
  method: HttpMethod;
  responseSchema: Record<string, any>;
  statusCode: number;
  delayMs: number;
  rateLimitEnabled: boolean;
  rateLimitStrategy: RateLimitStrategy;
  rateLimitMax: number;
  rateLimitWindow: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EndpointListResponse {
  endpoints: EndpointResponse[];
  total: number;
}
