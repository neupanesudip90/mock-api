import { Request } from "express";

/**
 * Safely get a header value as string
 */
export const getHeader = (req: Request, name: string): string | null => {
  const value = req.headers[name.toLowerCase()];

  if (!value) return null;
  if (Array.isArray(value)) return value[0] || null;
  return value;
};

/**
 * Get Bearer token from Authorization header
 */
export const getBearerToken = (req: Request): string | null => {
  const authHeader = getHeader(req, "authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.slice(7);
};

/**
 * Get API key from x-api-key or Authorization header
 */
export const getApiKey = (req: Request): string | null => {
  // First try x-api-key
  const xApiKey = getHeader(req, "x-api-key");
  if (xApiKey) return xApiKey;

  // Fall back to Bearer token
  return getBearerToken(req);
};

/**
 * Get client IP address
 */
export const getClientIp = (req: Request): string | null => {
  const forwarded = getHeader(req, "x-forwarded-for");
  if (forwarded) {
    return (forwarded as string).split(",")[0]?.trim() ?? null;
  }

  return req.ip || req.socket.remoteAddress || null;
};
