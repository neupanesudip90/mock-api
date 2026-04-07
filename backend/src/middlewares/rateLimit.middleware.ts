import { Request, Response, NextFunction } from "express";
import { checkRateLimit, RateLimitResult } from "@/services/rateLimit.service";
import { ApiError } from "@/utils/ApiError";
import { getClientIp } from "@/utils/request.utils";
import { logger } from "@/utils/logger";

// ============================================================================
// Rate Limit Headers
// ============================================================================
const setRateLimitHeaders = (res: Response, result: RateLimitResult): void => {
  res.setHeader("X-RateLimit-Limit", result.total);
  res.setHeader("X-RateLimit-Remaining", result.remaining);
  res.setHeader(
    "X-RateLimit-Reset",
    Math.ceil(result.resetAt.getTime() / 1000),
  );
};

// ============================================================================
// Mock Endpoint Rate Limiter
// ============================================================================
export const mockRateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction,
  endpoint: any,
): Promise<void> => {
  // Skip if rate limiting is disabled for this endpoint
  if (!endpoint.rateLimitEnabled) {
    return next();
  }

  const identifier = getClientIp(req) || req.apiKey?.keyId || "unknown";

  const result = await checkRateLimit({
    projectId: endpoint.projectId,
    endpointId: endpoint.id,
    identifier,
    strategy: endpoint.rateLimitStrategy,
    max: endpoint.rateLimitMax,
    windowSeconds: endpoint.rateLimitWindow,
  });

  // Set headers
  setRateLimitHeaders(res, result);

  if (!result.allowed) {
    const retryAfter = Math.ceil(
      (result.resetAt.getTime() - Date.now()) / 1000,
    );
    res.setHeader("Retry-After", retryAfter);

    throw new ApiError(429, "Rate limit exceeded. Please try again later.");
  }

  next();
};

// ============================================================================
// Auth Rate Limiter (Prevent Brute Force)
// ============================================================================
export const authRateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const identifier = getClientIp(req) || "unknown";
  const endpoint = req.path; // e.g., /auth/login

  try {
    const result = await checkRateLimit({
      projectId: "auth",
      endpointId: endpoint,
      identifier,
      strategy: "FIXED_WINDOW",
      max: 10, // 10 attempts
      windowSeconds: 300, // per 5 minutes
    });

    setRateLimitHeaders(res, result);

    if (!result.allowed) {
      const retryAfter = Math.ceil(
        (result.resetAt.getTime() - Date.now()) / 1000,
      );
      res.setHeader("Retry-After", retryAfter);

      throw new ApiError(
        429,
        "Too many attempts. Please try again in a few minutes.",
      );
    }

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    logger.error("Auth rate limit error:", error);
    next(); // Fail open
  }
};

// ============================================================================
// Global API Rate Limiter
// ============================================================================
export const globalRateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const identifier = getClientIp(req) || "unknown";

  try {
    const result = await checkRateLimit({
      projectId: "global",
      endpointId: "api",
      identifier,
      strategy: "FIXED_WINDOW",
      max: 1000, // 1000 requests
      windowSeconds: 60, // per minute
    });

    setRateLimitHeaders(res, result);

    if (!result.allowed) {
      throw new ApiError(429, "Global rate limit exceeded");
    }

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    logger.error("Global rate limit error:", error);
    next();
  }
};
