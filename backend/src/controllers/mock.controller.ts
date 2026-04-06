import { Request, Response } from "express";
import { catchAsync } from "@/utils/catchAsync";
import { ApiError } from "@/utils/ApiError";
import {
  findMatchingEndpoint,
  generateMockResponse,
  logUsage,
} from "@/services/mock.service";
import { logger } from "@/utils/logger";
import { getClientIp } from "@/utils/request.utils";



export const handleMockRequest = catchAsync(
  
  async (req: Request, res: Response) => {
    const { projectId } = req.params as { projectId: string };
    const method = req.method;

    // Extract path
    const rawPath = req.params["path"];
    const path =
      "/" + (Array.isArray(rawPath) ? rawPath.join("/") : (rawPath ?? ""));

    const startTime = Date.now();

    logger.info(`Mock request: ${method} ${path} for project ${projectId}`);

    // Verify API key belongs to this project
    if (req.apiKey?.projectId !== projectId) {
      throw new ApiError(403, "API key does not belong to this project");
    }

    
    // Find matching endpoint
    const matchResult = await findMatchingEndpoint({
      projectId,
      method,
      path,
    });

    if (!matchResult) {
      throw new ApiError(404, `No mock endpoint found for ${method} ${path}`);
    }

    const { endpoint, params } = matchResult;

    // Generate response
    const { statusCode, data } = await generateMockResponse(endpoint, params);

    const responseTime = Date.now() - startTime;

    // Log usage (async, don't block response)
    logUsage({
      endpointId: endpoint.id,
      projectId,
      ipAddress: getClientIp(req),
      userAgent: req.headers["user-agent"],
      statusCode,
      responseTimeMs: responseTime,
      rateLimitHit: false,
    }).catch((err) => {
      logger.error("Failed to log usage:", err);
    });

    logger.info(`Mock response: ${statusCode} in ${responseTime}ms`);

    // Send response
    res.status(statusCode).json(data);
  },
);
