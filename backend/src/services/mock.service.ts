import { prisma } from "@/config/database";
import { ApiError } from "@/utils/ApiError";
import { generateMockData } from "@/utils/mockGenerator";
import { match } from "path-to-regexp";
import { HttpMethod } from "@/generated/client";
import { logger } from "@/utils/logger";


export interface MockRequestParams {
  projectId: string;
  method: string;
  path: string;
}

export interface UsageLogData {
  endpointId: string;
  projectId: string;
  ipAddress: string | null;
  userAgent: string | undefined;
  statusCode: number;
  responseTimeMs: number;
  rateLimitHit: boolean;
}



// ============================================================================
// Find Matching Endpoint
// ============================================================================
export const findMatchingEndpoint = async ({
  projectId,
  method,
  path,
}: MockRequestParams) => {
  // Verify project is active
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { status: true },
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (project.status !== "ACTIVE") {
    throw new ApiError(403, "Project is not active");
  }

  // Fetch all endpoints for this project with matching method
  const endpoints = await prisma.endpoint.findMany({
    where: {
      projectId,
      method: method as HttpMethod,
    },
  });
  // Find the first endpoint that matches the path pattern
  for (const endpoint of endpoints) {
    try {
      const matcher = match(endpoint.path, { decode: decodeURIComponent });
      const result = matcher(path);

      if (result) {
        return {
          endpoint,
          params: result.params as Record<string, string>,
        };
      }
    } catch {
      // Invalid path pattern, skip
      continue;
    }
  }

  return null;
};

// ============================================================================
// Generate Mock Response
// ============================================================================
export const generateMockResponse = async (
  endpoint: any,
  params: Record<string, string>,
) => {
  // Apply delay if configured
  if (endpoint.delayMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, endpoint.delayMs));
  }

  // Generate data from schema
  const data = generateMockData(endpoint.responseSchema, params);

  return {
    statusCode: endpoint.statusCode,
    data,
  };
};

// ============================================================================
// Log Usage
// ============================================================================
export const logUsage = async (data: UsageLogData): Promise<void> => {
  await prisma.usageLog.create({
    data: {
      endpointId: data.endpointId,
      projectId: data.projectId,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      statusCode: data.statusCode,
      responseTimeMs: data.responseTimeMs,
      rateLimitHit: data.rateLimitHit,
    },
  });
};
