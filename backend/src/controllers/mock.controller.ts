import { Request, Response } from "express";
import { catchAsync } from "@/utils/catchAsync";
import { ApiError } from "@/utils/ApiError";
import {
  findMatchingEndpoint,
  generateMockResponse,
} from "@/services/mock.service";
import { logger } from "@/utils/logger";

export const handleMockRequest = catchAsync(
  async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const method = req.method;

    const rawPath = req.params["path"];
    const path =
      "/" + (Array.isArray(rawPath) ? rawPath.join("/") : (rawPath ?? ""));

    const startTime = Date.now();

    logger.info(`Mock request: ${method} ${path} for project ${projectId}`);

    // Find matching endpoint
    const matchResult = await findMatchingEndpoint({
      projectId,
      method,
      path,
    });

    if (!matchResult) {
      throw new ApiError(404, "Endpoint not found");
    }

    const { endpoint, params } = matchResult;

    // Generate response
    const { statusCode, data } = await generateMockResponse(endpoint, params);

    const responseTime = Date.now() - startTime;

    logger.info(`Mock response: ${statusCode} in ${responseTime}ms`);

    // Send response
    res.status(statusCode).json({
      success: true,
      data,
      meta: {
        responseTimeMs: responseTime,
        endpointId: endpoint.id,
      },
    });
  },
);
