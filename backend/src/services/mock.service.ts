import { prisma } from "@/config/database";
import { ApiError } from "@/utils/ApiError";
import { generateMockData } from "@/utils/mockGenerator";
import { match } from "path-to-regexp";

export interface MockRequestParams {
  projectId: string;
  method: string;
  path: string;
}

export const findMatchingEndpoint = async ({
  projectId,
  method,
  path,
}: MockRequestParams) => {
  console.log("Looking for:", { projectId, method, path }); // add this
  // Fetch all endpoints for this project
  const endpoints = await prisma.endpoint.findMany({
    where: {
      projectId,
      method: method as any,
    },
  });
  console.log("Found endpoints:", endpoints.length);

  // Find the first endpoint that matches the path
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

export const generateMockResponse = async (
  endpoint: any,
  params: Record<string, string>,
) => {
  if (endpoint.delayMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, endpoint.delayMs));
  }

  const data = generateMockData(endpoint.responseSchema, params);

  return {
    statusCode: endpoint.statusCode,
    data,
  };
};
