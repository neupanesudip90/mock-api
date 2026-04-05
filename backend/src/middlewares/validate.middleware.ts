import { Request, Response, NextFunction } from "express";
import { ZodTypeAny, ZodError, ZodIssue } from "zod";
import { ApiError } from "@/utils/ApiError";

interface ValidationError {
  field: string;
  message: string;
}

const formatZodErrors = (error: ZodError): ValidationError[] => {
  return error.issues.map((issue: ZodIssue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
};

export const validate = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = (await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })) as { body?: unknown; query?: unknown; params?: unknown };

      // ✅ Only reassign body and params — req.query is getter-only
      if (validated.body) req.body = validated.body;
      if (validated.params)
        req.params = validated.params as Record<string, string>;

      // ✅ Attach validated query to req.body won't work
      // Instead store on a custom property for controllers to use
      if (validated.query) {
        (req as any).validatedQuery = validated.query;
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: formatZodErrors(error),
        });
        return;
      }
      next(error);
    }
  };
};

export const validateBody = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: formatZodErrors(error),
        });
        return;
      }
      next(error);
    }
  };
};

export const validateQuery = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = (await schema.parseAsync(req.query)) as typeof req.query;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: formatZodErrors(error),
        });
        return;
      }
      next(error);
    }
  };
};

export const validateParams = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = (await schema.parseAsync(req.params)) as typeof req.params;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: formatZodErrors(error),
        });
        return;
      }
      next(error);
    }
  };
};
