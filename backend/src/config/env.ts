import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
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
  // Resend
  RESEND_API_KEY: z.string().min(1),
  // Email
  EMAIL_FROM: z.string(),
  // Redis
  REDIS_URL: z.string().url(),
  // CORS
  CORS_ORIGIN: z.string().optional(),
  // Logging
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("❌ Environment validation failed:");
  console.error(parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
export const isProd = env.NODE_ENV === "production";
export const isDev = env.NODE_ENV === "development";
export const isTest = env.NODE_ENV === "test";
