import { Request } from "express";

// ============================================================================
// JWT
// ============================================================================
export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface RefreshTokenPayload extends JwtPayload {
  tokenVersion: number; // increments on logout to invalidate old tokens
}

// ============================================================================
// Express Augmentation
// ============================================================================
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
      apiKey?: {
        keyId: string;
        projectId: string;
        name: string;
      };
      validatedQuery?: unknown;
    }
  }
}
// ============================================================================
// Auth Tokens
// ============================================================================
export interface AuthTokens {
  accessToken: string;
  expiresIn: number;
  // refresh token goes in httpOnly cookie — not in response body
}

// ============================================================================
// Input Types
// ============================================================================
export interface RegisterInput {
  email: string;
  password: string;
  name?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  otp: string;
  newPassword: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface VerifyEmailInput {
  otp: string;
}

// ============================================================================
// Response Types
// ============================================================================
export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string | null;
    emailVerified: boolean;
  };
  tokens: AuthTokens;
}

