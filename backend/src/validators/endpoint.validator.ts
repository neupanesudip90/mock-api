import { z } from "zod";
import { HttpMethod, RateLimitStrategy } from "@/generated/client";

const HttpMethodEnum = z.enum(
  Object.values(HttpMethod) as [string, ...string[]],
);
const RateLimitStrategyEnum = z.enum(
  Object.values(RateLimitStrategy) as [string, ...string[]],
);

export const createEndpointSchema = z.object({
  params: z.object({
    projectId: z.string().uuid(),
  }),
  body: z.object({
    path: z.string().min(1).regex(/^\//, "Path must start with /"),
    method: z.nativeEnum(HttpMethod),
    responseSchema: z.record(z.string(), z.any()),
    statusCode: z.number().int().min(100).max(599).optional(),
    delayMs: z.number().int().min(0).max(10000).optional(),
    rateLimitEnabled: z.boolean().optional(),
    rateLimitStrategy: z.nativeEnum(RateLimitStrategy).optional(),
    rateLimitMax: z.number().int().min(1).max(100000).optional(),
    rateLimitWindow: z.number().int().min(1).max(86400).optional(),
  }),
});

export const updateEndpointSchema = z.object({
  params: z.object({
    projectId: z.string().uuid(),
    endpointId: z.string().uuid(),
  }),
  body: z
    .object({
      path: z.string().min(1).regex(/^\//).optional(),
      method: z.nativeEnum(HttpMethod).optional(),
      responseSchema: z.record(z.string(), z.any()),
      statusCode: z.number().int().min(100).max(599).optional(),
      delayMs: z.number().int().min(0).max(10000).optional(),
      rateLimitEnabled: z.boolean().optional(),
      rateLimitStrategy: z.nativeEnum(RateLimitStrategy).optional(),
      rateLimitMax: z.number().int().min(1).max(100000).optional(),
      rateLimitWindow: z.number().int().min(1).max(86400).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided",
    }),
});

export const endpointParamsSchema = z.object({
  params: z.object({
    projectId: z.string().uuid(),
    endpointId: z.string().uuid(),
  }),
});
