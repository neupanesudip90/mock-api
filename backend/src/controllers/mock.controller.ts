import { Request, Response } from "express";
import { catchAsync } from "@/utils/catchAsync";
import { ApiError } from "@/utils/ApiError";
import {
  findMatchingEndpoint,
  generateMockResponse,
  logUsage,
} from "@/services/mock.service";
import { checkRateLimit } from "@/services/rateLimit.service";
import { logger } from "@/utils/logger";
import { getClientIp } from "@/utils/request.utils";

export const handleMockRequest = catchAsync(
  async (req: Request, res: Response) => {
    const { projectId } = req.params as { projectId: string };
    const method = req.method;

    const rawPath = req.params["path"];
    const path =
      "/" + (Array.isArray(rawPath) ? rawPath.join("/") : (rawPath ?? ""));

    const startTime = Date.now();
    const clientIp = getClientIp(req);

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

    
    // Rate Limiting
    
    let rateLimitHit = false;

    if (endpoint.rateLimitEnabled) {
      const identifier = clientIp || req.apiKey?.keyId || "unknown";

      const rateLimitResult = await checkRateLimit({
        projectId,
        endpointId: endpoint.id,
        identifier,
        strategy: endpoint.rateLimitStrategy,
        max: endpoint.rateLimitMax,
        windowSeconds: endpoint.rateLimitWindow,
      });

      // Set rate limit headers
      res.setHeader("X-RateLimit-Limit", rateLimitResult.total);
      res.setHeader("X-RateLimit-Remaining", rateLimitResult.remaining);
      res.setHeader(
        "X-RateLimit-Reset",
        Math.ceil(rateLimitResult.resetAt.getTime() / 1000),
      );

      if (!rateLimitResult.allowed) {
        rateLimitHit = true;
        const responseTime = Date.now() - startTime;

        // Log the rate limit hit
        logUsage({
          endpointId: endpoint.id,
          projectId,
          ipAddress: clientIp,
          userAgent: req.headers["user-agent"],
          statusCode: 429,
          responseTimeMs: responseTime,
          rateLimitHit: true,
        }).catch((err) => logger.error("Failed to log usage:", err));

        const retryAfter = Math.ceil(
          (rateLimitResult.resetAt.getTime() - Date.now()) / 1000,
        );
        res.setHeader("Retry-After", retryAfter);

        throw new ApiError(429, "Rate limit exceeded. Please try again later.");
      }
    }

    
    // Generate Response
    
    const { statusCode, data } = await generateMockResponse(endpoint, params, {
      query: req.query as Record<string, any>,
      body: req.body as Record<string, any>,
      headers: req.headers as Record<string, any>,
    });

    const responseTime = Date.now() - startTime;

    // Log usage (async)
    logUsage({
      endpointId: endpoint.id,
      projectId,
      ipAddress: clientIp,
      userAgent: req.headers["user-agent"],
      statusCode,
      responseTimeMs: responseTime,
      rateLimitHit: false,
    }).catch((err) => logger.error("Failed to log usage:", err));

    logger.info(`Mock response: ${statusCode} in ${responseTime}ms`);

    // Send response
    res.status(statusCode).json(data);
  },
);
