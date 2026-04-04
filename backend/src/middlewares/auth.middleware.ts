import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "@/utils/token.utils";
import { validateApiKey } from "@/services/auth.service";
import { ApiError } from "@/utils/ApiError";

// Protects routes with JWT
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new ApiError(401, "No token provided");
    }

    const token = authHeader.slice(7);
    const payload = verifyAccessToken(token);
    req.user = { userId: payload.userId, email: payload.email };
    next();
  } catch (err) {
    next(err);
  }
};

// Protects mock proxy routes with API key
export const requireApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const key =
      (req.headers["x-api-key"] as string) ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.slice(7)
        : undefined);

    if (!key) throw new ApiError(401, "API key required");

    const result = await validateApiKey(key);
    if (!result) throw new ApiError(401, "Invalid or revoked API key");

    req.apiKey = result;
    next();
  } catch (err) {
    next(err);
  }
};
