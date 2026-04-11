import { z } from "zod";

// ============================================================================
// Auth Validations
// ============================================================================
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const resetPasswordSchema = z
  .object({
    otp: z.string().length(6, "OTP must be 6 digits"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const verifyEmailSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

// ============================================================================
// Project Validations
// ============================================================================
export const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  defaultRateLimitMax: z.coerce.number().int().min(1).max(100000).optional(),
  defaultRateLimitWindow: z.coerce.number().int().min(1).max(86400).optional(),
});

// ============================================================================
// Endpoint Validations
// ============================================================================


// Helper function to validate JSON string
const isValidJson = (str: string): boolean => {
  if (!str || str.trim() === "") return false;
  try {
    const trimmed = str.trim();
    JSON.parse(trimmed);
    return true;
  } catch {
    return false;
  }
};

export const createEndpointSchema = z.object({
  path: z
    .string()
    .min(1, "Path is required")
    .regex(/^\//, "Path must start with /"),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  statusCode: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .int("Must be an integer")
    .min(100, "Must be at least 100")
    .max(599, "Must be at most 599"),
  delayMs: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .int("Must be an integer")
    .min(0, "Must be at least 0")
    .default(0),
  responseSchema: z
    .string()
    .min(1, "Response schema is required")
    .refine(isValidJson, {
      message: "Invalid JSON format. Please check your syntax.",
    }),
  rateLimitEnabled: z.boolean().default(true),
});

// ============================================================================
// API Key Validations
// ============================================================================
export const createApiKeySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
});

// ============================================================================
// Type Exports
// ============================================================================
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;
export type CreateProjectFormData = z.infer<typeof createProjectSchema>;
export type CreateEndpointFormData = z.infer<typeof createEndpointSchema>;
export type CreateApiKeyFormData = z.infer<typeof createApiKeySchema>;

// Separate schema for updates (all fields optional except what you're changing)
export const updateEndpointSchema = createEndpointSchema.partial();

export type UpdateEndpointFormData = z.infer<typeof updateEndpointSchema>;
