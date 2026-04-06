import { prisma } from "@/config/database";
import { ApiError } from "@/utils/ApiError";
import { verifyProjectOwnership } from "@/services/project.service";
import type {
  CreateEndpointInput,
  UpdateEndpointInput,
  EndpointResponse,
  EndpointListResponse,
} from "@/types/endpoint.types";

// ============================================================================
// Helpers
// ============================================================================
const formatEndpoint = (endpoint: any): EndpointResponse => ({
  id: endpoint.id,
  projectId: endpoint.projectId,
  path: endpoint.path,
  method: endpoint.method,
  responseSchema: endpoint.responseSchema,
  statusCode: endpoint.statusCode,
  delayMs: endpoint.delayMs,
  rateLimitEnabled: endpoint.rateLimitEnabled,
  rateLimitStrategy: endpoint.rateLimitStrategy,
  rateLimitMax: endpoint.rateLimitMax,
  rateLimitWindow: endpoint.rateLimitWindow,
  createdAt: endpoint.createdAt,
  updatedAt: endpoint.updatedAt,
});

// ============================================================================
// Validate Path Pattern
// ============================================================================
const validatePathPattern = (path: string): void => {
  if (!path.startsWith("/")) {
    throw new ApiError(400, "Path must start with /");
  }

  // Basic validation - you can enhance this
  const invalidChars = /[^a-zA-Z0-9/_:-]/;
  if (invalidChars.test(path.replace(/:\w+/g, ""))) {
    throw new ApiError(400, "Path contains invalid characters");
  }
};

// ============================================================================
// Create Endpoint
// ============================================================================
export const createEndpoint = async (
  userId: string,
  projectId: string,
  input: CreateEndpointInput,
): Promise<EndpointResponse> => {
  // Verify project ownership
  await verifyProjectOwnership(userId, projectId);

  // Validate path
  validatePathPattern(input.path);

  // Check for duplicate path+method
  const existing = await prisma.endpoint.findFirst({
    where: {
      projectId,
      method: input.method,
      path: input.path,
    },
  });

  if (existing) {
    throw new ApiError(
      409,
      `Endpoint ${input.method} ${input.path} already exists`,
    );
  }

  // Get project defaults
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      defaultRateLimitMax: true,
      defaultRateLimitWindow: true,
      defaultRateLimitStrategy: true,
    },
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const endpoint = await prisma.endpoint.create({
    data: {
      projectId,
      path: input.path,
      method: input.method,
      responseSchema: input.responseSchema,
      statusCode: input.statusCode ?? 200,
      delayMs: input.delayMs ?? 0,
      rateLimitEnabled: input.rateLimitEnabled ?? true,
      rateLimitStrategy:
        input.rateLimitStrategy ?? project.defaultRateLimitStrategy,
      rateLimitMax: input.rateLimitMax ?? project.defaultRateLimitMax,
      rateLimitWindow: input.rateLimitWindow ?? project.defaultRateLimitWindow,
    },
  });

  return formatEndpoint(endpoint);
};

// ============================================================================
// List Endpoints
// ============================================================================
export const listEndpoints = async (
  userId: string,
  projectId: string,
): Promise<EndpointListResponse> => {
  await verifyProjectOwnership(userId, projectId);

  const endpoints = await prisma.endpoint.findMany({
    where: { projectId },
    orderBy: [{ method: "asc" }, { path: "asc" }],
  });

  return {
    endpoints: endpoints.map(formatEndpoint),
    total: endpoints.length,
  };
};

// ============================================================================
// Get Endpoint
// ============================================================================
export const getEndpoint = async (
  userId: string,
  projectId: string,
  endpointId: string,
): Promise<EndpointResponse> => {
  await verifyProjectOwnership(userId, projectId);

  const endpoint = await prisma.endpoint.findFirst({
    where: { id: endpointId, projectId },
  });

  if (!endpoint) {
    throw new ApiError(404, "Endpoint not found");
  }

  return formatEndpoint(endpoint);
};

// ============================================================================
// Update Endpoint
// ============================================================================
export const updateEndpoint = async (
  userId: string,
  projectId: string,
  endpointId: string,
  input: UpdateEndpointInput,
): Promise<EndpointResponse> => {
  await verifyProjectOwnership(userId, projectId);

  const endpoint = await prisma.endpoint.findFirst({
    where: { id: endpointId, projectId },
  });

  if (!endpoint) {
    throw new ApiError(404, "Endpoint not found");
  }

  // Validate path if provided
  if (input.path) {
    validatePathPattern(input.path);
  }

  // Check for duplicate if path or method changed
  if (input.path || input.method) {
    const duplicate = await prisma.endpoint.findFirst({
      where: {
        projectId,
        method: input.method ?? endpoint.method,
        path: input.path ?? endpoint.path,
        id: { not: endpointId },
      },
    });

    if (duplicate) {
      throw new ApiError(
        409,
        `Endpoint ${input.method ?? endpoint.method} ${input.path ?? endpoint.path} already exists`,
      );
    }
  }

  const updated = await prisma.endpoint.update({
    where: { id: endpointId },
    data: {
      ...(input.path !== undefined && { path: input.path }),
      ...(input.method !== undefined && { method: input.method }),
      ...(input.responseSchema !== undefined && {
        responseSchema: input.responseSchema,
      }),
      ...(input.statusCode !== undefined && { statusCode: input.statusCode }),
      ...(input.delayMs !== undefined && { delayMs: input.delayMs }),
      ...(input.rateLimitEnabled !== undefined && {
        rateLimitEnabled: input.rateLimitEnabled,
      }),
      ...(input.rateLimitStrategy !== undefined && {
        rateLimitStrategy: input.rateLimitStrategy,
      }),
      ...(input.rateLimitMax !== undefined && {
        rateLimitMax: input.rateLimitMax,
      }),
      ...(input.rateLimitWindow !== undefined && {
        rateLimitWindow: input.rateLimitWindow,
      }),
    },
  });

  return formatEndpoint(updated);
};

// ============================================================================
// Delete Endpoint
// ============================================================================
export const deleteEndpoint = async (
  userId: string,
  projectId: string,
  endpointId: string,
): Promise<void> => {
  await verifyProjectOwnership(userId, projectId);

  const endpoint = await prisma.endpoint.findFirst({
    where: { id: endpointId, projectId },
  });

  if (!endpoint) {
    throw new ApiError(404, "Endpoint not found");
  }

  await prisma.endpoint.delete({
    where: { id: endpointId },
  });
};
