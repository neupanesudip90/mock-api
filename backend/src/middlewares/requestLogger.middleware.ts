import { Request, Response, NextFunction } from "express";
import { logger } from "@/utils/logger";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const startTime = Date.now();

  // Log after response is sent
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    logger.http(req.method, req.originalUrl, res.statusCode, duration);
  });

  next();
};
