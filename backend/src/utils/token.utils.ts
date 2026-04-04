import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "@/config/env";
import { ApiError } from "@/utils/ApiError";
import type { JwtPayload, RefreshTokenPayload } from "@/types/auth.types";

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

export const generateAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(
    { userId: payload.userId, email: payload.email },
    env.JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY },
  );
};

export const generateRefreshToken = (payload: RefreshTokenPayload): string => {
  return jwt.sign(
    {
      userId: payload.userId,
      email: payload.email,
      tokenVersion: payload.tokenVersion,
    },
    env.JWT_REFRESH_SECRET, // separate secret for refresh tokens
    { expiresIn: REFRESH_TOKEN_EXPIRY },
  );
};

export const verifyAccessToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
  } catch {
    throw new ApiError(401, "Invalid or expired access token");
  }
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  try {
    return jwt.verify(token, env.JWT_REFRESH_SECRET) as RefreshTokenPayload;
  } catch {
    throw new ApiError(401, "Invalid or expired refresh token");
  }
};

// For email verification and password reset — NOT JWTs
// Replace generateOpaqueToken with these two

// For email verification — 6 digit OTP
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// For password reset — 6 digit OTP
export const getOTPExpiry = (): Date => {
  return new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
}

// Token expiry helpers
export const getEmailVerificationExpiry = (): Date => {
  return new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
};

export const getPasswordResetExpiry = (): Date => {
  return new Date(Date.now() + 60 * 60 * 1000); // 1 hour
};
