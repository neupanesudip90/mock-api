// src/validations/endpoint.validation.ts
import { z } from "zod";
import { HttpMethod, RateLimitStrategy } from "@/generated/client";

const HttpMethodEnum = z.enum(
  Object.values(HttpMethod) as [string, ...string[]],
);
const RateLimitStrategyEnum = z.enum(
  Object.values(RateLimitStrategy) as [string, ...string[]],
);

/**
 * Validates that the value is a valid JSON structure (object or array)
 */
const responseSchemaValidator = z.any().refine(
  (val) => {
    if (val === null || val === undefined) return false;
    return typeof val === "object"; // Objects and arrays pass this check
  },
  { message: "Response schema must be a valid JSON object or array" },
);

// ============================================================================
// Create Endpoint Schema
// ============================================================================
export const createEndpointSchema = z.object({
  body: z.object({
    path: z
      .string({ required_error: "Path is required" })
      .min(1, "Path cannot be empty")
      .regex(/^\//, "Path must start with /"),

    method: HttpMethodEnum,

    statusCode: z
      .number({ required_error: "Status code is required" })
      .int("Status code must be an integer")
      .min(100, "Status code must be at least 100")
      .max(599, "Status code must be at most 599"),

    delayMs: z
      .number()
      .int("Delay must be an integer")
      .min(0, "Delay cannot be negative")
      .optional()
      .default(0),

    responseSchema: responseSchemaValidator,

    rateLimitEnabled: z.boolean().optional().default(true),

    rateLimitMax: z.number().int().min(1).optional(),

    rateLimitWindow: z.number().int().min(1).optional(),

    rateLimitStrategy: RateLimitStrategyEnum.optional(),
  }),
});

// ============================================================================
// Update Endpoint Schema
// ============================================================================
export const updateEndpointSchema = z.object({
  body: z
    .object({
      path: z
        .string()
        .min(1, "Path cannot be empty")
        .regex(/^\//, "Path must start with /")
        .optional(),

      method: HttpMethodEnum.optional(),

      statusCode: z
        .number()
        .int("Status code must be an integer")
        .min(100, "Status code must be at least 100")
        .max(599, "Status code must be at most 599")
        .optional(),

      delayMs: z
        .number()
        .int("Delay must be an integer")
        .min(0, "Delay cannot be negative")
        .optional(),

      responseSchema: responseSchemaValidator.optional(),

      rateLimitEnabled: z.boolean().optional(),

      rateLimitMax: z.number().int().min(1).optional(),

      rateLimitWindow: z.number().int().min(1).optional(),

      rateLimitStrategy: RateLimitStrategyEnum.optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided for update",
    }),
});

// ============================================================================
// Params Schema
// ============================================================================
export const endpointParamsSchema = z.object({
  params: z.object({
    projectId: z.string().uuid(),
    endpointId: z.string().uuid(),
  }),
});

export const projectParamsSchema = z.object({
  params: z.object({
    projectId: z.string().uuid(),
  }),
});

// ============================================================================
// Type Exports
// ============================================================================
export type CreateEndpointInput = z.infer<typeof createEndpointSchema>["body"];
export type UpdateEndpointInput = z.infer<typeof updateEndpointSchema>["body"];
