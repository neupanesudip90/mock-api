import { Request, Response, NextFunction } from "express";
import { validateApiKey } from "@/services/apiKey.service";
import { ApiError } from "@/utils/ApiError";

// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      apiKey?: {
        keyId: string;
        projectId: string;
        name: string;
      };
    }
  }
}


// API Key Authentication Middleware
// Used for public mock endpoint access (not user dashboard)
export const apiKeyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Get API key from header
    const apiKey =
      (req.headers["x-api-key"] as string) ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.slice(7)
        : null);

    if (!apiKey) {
      throw new ApiError(401, "API key required. Provide x-api-key header.");
    }

    // Validate the key
    const validated = await validateApiKey(apiKey);

    if (!validated) {
      throw new ApiError(401, "Invalid or inactive API key");
    }

    // Attach to request
    req.apiKey = validated;

    next();
  } catch (err) {
    next(err);
  }
};


// Optional API Key (doesn't fail if missing, but validates if present)
export const optionalApiKeyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const apiKey =
      (req.headers["x-api-key"] as string) ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.slice(7)
        : null);

    if (apiKey) {
      const validated = await validateApiKey(apiKey);
      if (validated) {
        req.apiKey = validated;
      }
    }

    next();
  } catch (err) {
    next(err);
  }
};
