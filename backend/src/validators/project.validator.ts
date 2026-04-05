import { z } from "zod";
import { ProjectStatus, RateLimitStrategy } from "@/generated/client";

// ============================================================================
// Create Project
// ============================================================================
export const createProjectSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(100, "Name must be less than 100 characters")
      .trim(),
    description: z
      .string()
      .max(500, "Description must be less than 500 characters")
      .trim()
      .optional(),
    defaultRateLimitMax: z
      .number()
      .int()
      .min(1, "Rate limit must be at least 1")
      .max(100000, "Rate limit must be less than 100000")
      .optional(),
    defaultRateLimitWindow: z
      .number()
      .int()
      .min(1, "Window must be at least 1 second")
      .max(86400, "Window must be less than 24 hours")
      .optional(),
    defaultRateLimitStrategy: z.nativeEnum(RateLimitStrategy).optional(),
  }),
});

// ============================================================================
// Update Project
// ============================================================================
export const updateProjectSchema = z.object({
  params: z.object({
    projectId: z.string().uuid("Invalid project ID"),
  }),
  body: z
    .object({
      name: z
        .string()
        .min(1, "Name cannot be empty")
        .max(100, "Name must be less than 100 characters")
        .trim()
        .optional(),
      description: z
        .string()
        .max(500, "Description must be less than 500 characters")
        .trim()
        .nullable()
        .optional(),
      status: z.nativeEnum(ProjectStatus).optional(),
      defaultRateLimitMax: z.number().int().min(1).max(100000).optional(),
      defaultRateLimitWindow: z.number().int().min(1).max(86400).optional(),
      defaultRateLimitStrategy: z.nativeEnum(RateLimitStrategy).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided",
    }),
});

// ============================================================================
// Get/Delete Project
// ============================================================================
export const projectIdSchema = z.object({
  params: z.object({
    projectId: z.string().uuid("Invalid project ID"),
  }),
});

// ============================================================================
// List Projects Query
// ============================================================================
export const listProjectsSchema = z.object({
  query: z.object({
    status: z.nativeEnum(ProjectStatus).optional(),
    search: z.string().max(100).optional(),
    page: z
      .string()
      .transform((val) => parseInt(val, 10))
      .pipe(z.number().int().min(1))
      .optional()
      .default(1),
    limit: z
      .string()
      .transform((val) => parseInt(val, 10))
      .pipe(z.number().int().min(1).max(100))
      .optional()
      .default(10),
    sortBy: z
      .enum(["name", "createdAt", "updatedAt"])
      .optional()
      .default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
  }),
});

// ============================================================================
// Type Exports
// ============================================================================
export type CreateProjectBody = z.infer<typeof createProjectSchema>["body"];
export type UpdateProjectBody = z.infer<typeof updateProjectSchema>["body"];
export type ListProjectsQuery = z.infer<typeof listProjectsSchema>["query"];
