import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z
  .object({
    // Server
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    PORT: z.string().default("3000"),

    // Database
    DATABASE_URL: z.string().url(),

    // App
    APP_URL: z.string().url(),

    // JWT
    JWT_ACCESS_SECRET: z.string().min(32),
    JWT_REFRESH_SECRET: z.string().min(32),

    // Email - Development (Ethereal)
    ETHEREAL_EMAIL: z.string().optional(),
    ETHEREAL_PASSWORD: z.string().optional(),

    // Email - Production
    EMAIL_FROM: z.string(),
    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z.string().optional(),
    SMTP_USER: z.string().optional(),
    SMTP_PASS: z.string().optional(),
    SMTP_SECURE: z.string().optional(), // "true" or "false"

    // Redis (optional)
    REDIS_URL: z.string().url(),

    // CORS
    CORS_ORIGIN: z.string().optional(),

    // Logging
    LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  })
  .refine(
    (data) => {
      // In production, SMTP credentials are required
      if (data.NODE_ENV === "production") {
        return !!(data.SMTP_HOST && data.SMTP_USER && data.SMTP_PASS);
      }
      return true;
    },
    {
      message:
        "SMTP credentials (SMTP_HOST, SMTP_USER, SMTP_PASS) are required in production",
    },
  )
  .refine(
    (data) => {
      // In development, either Ethereal or SMTP should be configured
      if (data.NODE_ENV === "development") {
        const hasEthereal = !!(data.ETHEREAL_EMAIL && data.ETHEREAL_PASSWORD);
        const hasSMTP = !!(data.SMTP_HOST && data.SMTP_USER && data.SMTP_PASS);
        return hasEthereal || hasSMTP;
      }
      return true;
    },
    {
      message:
        "Either Ethereal or SMTP credentials are required for email in development",
    },
  );

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Environment validation failed:");
  console.error(parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
