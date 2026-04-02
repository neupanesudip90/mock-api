import type { ErrorRequestHandler } from "express";
import { ApiError, isApiError } from "@/utils/ApiError";
import { logger } from "@/utils/logger";
import { isDev } from "@/config/env";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, _next) => {
  logger.error(`Error: ${err.message}`, { stack: err.stack, url: req.url });

  if (isApiError(err)) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        ...(isDev && { stack: err.stack }),
      },
    });
  }

  // Handle Prisma errors
  if (err.name === "PrismaClientKnownRequestError") {
    return res.status(400).json({
      success: false,
      error: { message: "Database validation error" },
    });
  }

  // Fallback
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: {
      message: isDev ? err.message : "Internal Server Error",
      ...(isDev && { stack: err.stack }),
    },
  });
};
