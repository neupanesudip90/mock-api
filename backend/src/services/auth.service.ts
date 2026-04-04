import { prisma } from "@/config/database";
import { ApiError } from "@/utils/ApiError";
import {
  hashPassword,
  verifyPassword,
  isStrongPassword,
} from "@/utils/password.utils";
import { generateApiKey, verifyApiKey } from "@/utils/apiKey.utils";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generateOTP,
  getEmailVerificationExpiry,
  getPasswordResetExpiry,
  getOTPExpiry,
} from "@/utils/token.utils";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendPasswordChangedEmail,
} from "@/services/email.service";
import type {
  RegisterInput,
  LoginInput,
  AuthResponse,
  AuthTokens,
  ForgotPasswordInput,
  ResetPasswordInput,
  ChangePasswordInput,
  ApiKeyInput,
  ApiKeyResponse,
  ApiKeyListItem,
} from "@/types/auth.types";

// ============================================================================
// Helpers
// ============================================================================
const buildAuthResponse = async (user: {
  id: string;
  email: string;
  name: string | null;
  emailVerified: boolean;
  tokenVersion: number;
}): Promise<{ response: AuthResponse; refreshToken: string }> => {
  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
  });
  const refreshToken = generateRefreshToken({
    userId: user.id,
    email: user.email,
    tokenVersion: user.tokenVersion,
  });

  const tokens: AuthTokens = {
    accessToken,
    expiresIn: 900, // 15 minutes in seconds
  };

  return {
    response: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerified,
      },
      tokens,
    },
    refreshToken, // caller puts this in httpOnly cookie
  };
};

// ============================================================================
// Register
// ============================================================================
export const registerUser = async (
  input: RegisterInput,
): Promise<{ response: AuthResponse; refreshToken: string }> => {
  if (!isStrongPassword(input.password)) {
    throw new ApiError(
      400,
      "Password must be at least 8 characters with uppercase, lowercase, and a number",
    );
  }

  const existing = await prisma.user.findUnique({
    where: { email: input.email.toLowerCase() },
  });

  if (existing) {
    throw new ApiError(409, "An account with this email already exists");
  }

  const hashedPassword = await hashPassword(input.password);
  const otp = generateOTP();
  const otpExpiry = getOTPExpiry();


  const user = await prisma.user.create({
    data: {
      email: input.email.toLowerCase(),
      password: hashedPassword,
      name: input.name ?? null,
      emailVerificationToken: otp,
      emailVerificationExpiry: otpExpiry,
      tokenVersion: 0,
    },
  });

  // Send verification email (non-blocking — don't fail registration if email fails)
  sendVerificationEmail(user.email, user.name, otp).catch(
    (err) => {
      console.error("Failed to send verification email:", err);
    },
  );

  return buildAuthResponse(user);
};

// ============================================================================
// Email Verification
// ============================================================================
export const verifyEmail = async (token: string): Promise<void> => {
  const user = await prisma.user.findFirst({
    where: {
      emailVerificationToken: token,
      emailVerificationExpiry: { gt: new Date() },
      emailVerified: false,
    },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired verification token");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      emailVerificationToken: null,
      emailVerificationExpiry: null,
    },
  });
};

// ============================================================================
// Resend Verification Email
// ============================================================================
export const resendVerificationEmail = async (email: string): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  // Always respond the same — don't reveal if email exists
  if (!user || user.emailVerified) return;

const otp = generateOTP();
const otpExpiry = getOTPExpiry();

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerificationToken: otp,
      emailVerificationExpiry: otpExpiry,
    },
  });

  await sendVerificationEmail(user.email, user.name, otp);
};

// ============================================================================
// Login
// ============================================================================
export const loginUser = async (
  input: LoginInput,
): Promise<{ response: AuthResponse; refreshToken: string }> => {
  const user = await prisma.user.findUnique({
    where: { email: input.email.toLowerCase() },
  });

  // Same error for wrong email OR wrong password — prevents enumeration
  if (!user || !(await verifyPassword(input.password, user.password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  return buildAuthResponse(user);
};

// ============================================================================
// Refresh Access Token
// ============================================================================
export const refreshAccessToken = async (
  refreshToken: string,
): Promise<{ accessToken: string; expiresIn: number }> => {
  const payload = verifyRefreshToken(refreshToken);

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) {
    throw new ApiError(401, "User no longer exists");
  }

  // tokenVersion mismatch means user logged out — token is invalidated
  if (user.tokenVersion !== payload.tokenVersion) {
    throw new ApiError(401, "Token has been revoked. Please log in again.");
  }

  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
  });

  return { accessToken, expiresIn: 900 };
};

// ============================================================================
// Logout — invalidates ALL refresh tokens for this user
// ============================================================================
export const logoutUser = async (userId: string): Promise<void> => {
  // Incrementing tokenVersion invalidates every existing refresh token
  await prisma.user.update({
    where: { id: userId },
    data: { tokenVersion: { increment: 1 } },
  });
};

// ============================================================================
// Forgot Password
// ============================================================================
export const forgotPassword = async (
  input: ForgotPasswordInput,
): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { email: input.email.toLowerCase() },
  });

  // Always return success — don't reveal if email exists
  if (!user) return;

const otp = generateOTP();
const otpExpiry = getOTPExpiry();

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordResetToken: otp,
      passwordResetExpiry: otpExpiry,
    },
  });

  await sendPasswordResetEmail(user.email, user.name, otp);
};

// ============================================================================
// Reset Password (from forgot password flow)
// ============================================================================
export const resetPassword = async (
  input: ResetPasswordInput,
): Promise<void> => {
  if (!isStrongPassword(input.newPassword)) {
    throw new ApiError(
      400,
      "Password must be at least 8 characters with uppercase, lowercase, and a number",
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      passwordResetToken: input.token,
      passwordResetExpiry: { gt: new Date() },
    },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired reset token");
  }

  const hashedPassword = await hashPassword(input.newPassword);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetExpiry: null,
      tokenVersion: { increment: 1 }, // invalidate all existing refresh tokens
    },
  });

  await sendPasswordChangedEmail(user.email, user.name);
};

// ============================================================================
// Change Password (logged in user)
// ============================================================================
export const changePassword = async (
  userId: string,
  input: ChangePasswordInput,
): Promise<void> => {
  if (!isStrongPassword(input.newPassword)) {
    throw new ApiError(
      400,
      "Password must be at least 8 characters with uppercase, lowercase, and a number",
    );
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user || !(await verifyPassword(input.currentPassword, user.password))) {
    throw new ApiError(401, "Current password is incorrect");
  }

  const hashedPassword = await hashPassword(input.newPassword);

  await prisma.user.update({
    where: { id: userId },
    data: {
      password: hashedPassword,
      tokenVersion: { increment: 1 }, // log out all other sessions
    },
  });

  await sendPasswordChangedEmail(user.email, user.name);
};

// ============================================================================
// API Key Management
// ============================================================================
export const createApiKey = async (
  userId: string,
  input: ApiKeyInput,
): Promise<ApiKeyResponse> => {
  const project = await prisma.project.findFirst({
    where: { id: input.projectId, userId },
  });

  if (!project) {
    throw new ApiError(403, "You do not have access to this project");
  }

  const { plainKey, keyHash, keyPrefix } = generateApiKey();

  const apiKey = await prisma.apiKey.create({
    data: {
      projectId: input.projectId,
      name: input.name,
      keyHash,
      keyPrefix,
    },
  });

  return {
    id: apiKey.id,
    name: apiKey.name,
    keyPrefix: apiKey.keyPrefix!,
    plainKey, // ⚠️ Only returned here, never again
    createdAt: apiKey.createdAt,
  };
};

export const validateApiKey = async (
  plainKey: string,
): Promise<{ keyId: string; projectId: string; name: string } | null> => {
  const keyPrefix = plainKey.slice(0, 12);

  const candidates = await prisma.apiKey.findMany({
    where: { keyPrefix, revoked: false },
  });

  for (const key of candidates) {
    if (await verifyApiKey(plainKey, key.keyHash)) {
      // Fire and forget — don't await, don't block the request
      prisma.apiKey
        .update({ where: { id: key.id }, data: { lastUsedAt: new Date() } })
        .catch(() => {});

      return { keyId: key.id, projectId: key.projectId, name: key.name };
    }
  }

  return null;
};

export const revokeApiKey = async (
  userId: string,
  apiKeyId: string,
): Promise<void> => {
  const key = await prisma.apiKey.findFirst({
    where: { id: apiKeyId, project: { userId } },
  });

  if (!key) throw new ApiError(404, "API key not found");

  await prisma.apiKey.update({
    where: { id: apiKeyId },
    data: { revoked: true },
  });
};

export const listApiKeys = async (
  userId: string,
  projectId: string,
): Promise<ApiKeyListItem[]> => {
  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
  });

  if (!project)
    throw new ApiError(403, "You do not have access to this project");

  return prisma.apiKey.findMany({
    where: { projectId },
    select: {
      id: true,
      name: true,
      keyPrefix: true,
      createdAt: true,
      lastUsedAt: true,
      revoked: true,
    },
    orderBy: { createdAt: "desc" },
  });
};
