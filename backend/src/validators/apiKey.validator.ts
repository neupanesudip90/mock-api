import { z } from "zod";


// Create API Key
export const createApiKeySchema = z.object({
  params: z.object({
    projectId: z.string().uuid("Invalid project ID"),
  }),
  body: z.object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(50, "Name must be less than 50 characters")
      .trim(),
  }),
});


// Update API Key
export const updateApiKeySchema = z.object({
  params: z.object({
    projectId: z.string().uuid("Invalid project ID"),
    keyId: z.string().uuid("Invalid API key ID"),
  }),
  body: z
    .object({
      name: z
        .string()
        .min(1, "Name cannot be empty")
        .max(50, "Name must be less than 50 characters")
        .trim()
        .optional(),
      isActive: z.boolean().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided",
    }),
});


// List API Keys
export const listApiKeysSchema = z.object({
  params: z.object({
    projectId: z.string().uuid("Invalid project ID"),
  }),
  query: z.object({
    includeInactive: z
      .string()
      .transform((val) => val === "true")
      .optional()
      .default(false),
  }),
});


// Delete/Rotate API Key
export const apiKeyParamsSchema = z.object({
  params: z.object({
    projectId: z.string().uuid("Invalid project ID"),
    keyId: z.string().uuid("Invalid API key ID"),
  }),
});


// Type Exports
export type CreateApiKeyBody = z.infer<typeof createApiKeySchema>["body"];
export type UpdateApiKeyBody = z.infer<typeof updateApiKeySchema>["body"];
