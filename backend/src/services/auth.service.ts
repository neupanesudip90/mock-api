import { prisma } from "@/config/database";
import { ApiError } from "@/utils/ApiError";
import { OtpType } from "../generated/client";
import {
  hashPassword,
  verifyPassword,
  isStrongPassword,
} from "@/utils/password.utils";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generateOTP,
  getOTPExpiry,
} from "@/utils/token.utils";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendPasswordChangedEmail,
} from "@/services/email.service";
import { logger } from "@/utils/logger";
import type {
  RegisterInput,
  LoginInput,
  AuthResponse,
  AuthTokens,
  ForgotPasswordInput,
  ResetPasswordInput,
  ChangePasswordInput,
} from "@/types/auth.types";


// Helpers
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
    expiresIn: 900,
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
    refreshToken,
  };
};


// Register
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

  if (existing)
    throw new ApiError(409, "An account with this email already exists");

  const hashedPassword = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      email: input.email.toLowerCase(),
      password: hashedPassword,
      name: input.name ?? null,
      tokenVersion: 0,
    },
  });

  // Create OTP record
  const otp = generateOTP();
  await prisma.otpCode.create({
    data: {
      userId: user.id,
      code: otp,
      type: OtpType.EMAIL_VERIFICATION,
      expiresAt: getOTPExpiry(),
    },
  });

  // Non-blocking — don't fail registration if email fails
  // sendVerificationEmail(user.email, user.name, otp).catch((err) => {
  //   logger.error(`Failed to send verification email: ${err.message}`);
  // });
  // In registerUser - temporarily await it to see the real error
  try {
    await sendVerificationEmail(user.email, user.name, otp);
    logger.info("✅ Verification email sent successfully");
  } catch (err: any) {
    logger.error(`❌ Failed to send verification email:`, err);
  }

  return buildAuthResponse(user);
};


// Email Verification
export const verifyEmail = async (payload: {
  email: string;
  code: string;
  type?: string;
}): Promise<{ response: AuthResponse; refreshToken: string }> => {
  const { email, code, type = "EMAIL_VERIFICATION" } = payload;
  const cleanCode = code.trim();

  console.log("🔍 VERIFY EMAIL - FULL DEBUG");
  console.log("Received payload:", { email, code: cleanCode, type });

  // 1. Find user
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // 2. Find OTP with very loose conditions first for debugging
  const otpRecord = await prisma.otpCode.findFirst({
    where: {
      userId: user.id,
      code: cleanCode,
      type: type as OtpType,
      expiresAt: { gt: new Date() },
      usedAt: null,
    },
  });

  if (!otpRecord) {
    // Show all OTPs for this user to see what's actually in DB
    const allOtps = await prisma.otpCode.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    console.log(
      "All OTPs for this user:",
      allOtps.map((o) => ({
        id: o.id,
        code: o.code,
        type: o.type,
        expiresAt: o.expiresAt,
        usedAt: o.usedAt,
        createdAt: o.createdAt,
      })),
    );

    throw new ApiError(400, "Invalid or expired OTP");
  }

  await prisma.$transaction([
    prisma.otpCode.update({
      where: { id: otpRecord.id },
      data: { usedAt: new Date() },
    }),
    prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true },
    }),
  ]);
  // return tokens just like login does
  const updatedUser = { ...user, emailVerified: true };
  return buildAuthResponse(updatedUser);
  console.log("✅ Email verification completed successfully");
};;

// Resend Verification Email
export const resendVerificationEmail = async (email: string): Promise<void> => {
  const cleanEmail = email.toLowerCase().trim();

  const user = await prisma.user.findUnique({
    where: { email: cleanEmail },
  });

  if (!user) {
    // Don't reveal if user exists or not (security)
    return;
  }

  // Delete old unused OTPs for this user
  await prisma.otpCode.deleteMany({
    where: {
      userId: user.id,
      type: "EMAIL_VERIFICATION",
      usedAt: null,
    },
  });

  // Generate new OTP
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit code
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  await prisma.otpCode.create({
    data: {
      userId: user.id,
      code,
      type: "EMAIL_VERIFICATION",
      expiresAt,
    },
  });

};

// Login
export const loginUser = async (
  input: LoginInput,
): Promise<{ response: AuthResponse; refreshToken: string }> => {
  const user = await prisma.user.findUnique({
    where: { email: input.email.toLowerCase() },
  });

  if (!user || !(await verifyPassword(input.password, user.password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  return buildAuthResponse(user);
};


// Refresh Access Token
export const refreshAccessToken = async (
  refreshToken: string,
): Promise<{ accessToken: string; expiresIn: number }> => {
  const payload = verifyRefreshToken(refreshToken);

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) throw new ApiError(401, "User no longer exists");

  if (user.tokenVersion !== payload.tokenVersion) {
    throw new ApiError(401, "Token has been revoked. Please log in again.");
  }

  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
  });

  return { accessToken, expiresIn: 900 };
};


// Logout
export const logoutUser = async (userId: string): Promise<void> => {
  await prisma.user.update({
    where: { id: userId },
    data: { tokenVersion: { increment: 1 } },
  });
};


// Forgot Password
export const forgotPassword = async (
  input: ForgotPasswordInput,
): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { email: input.email.toLowerCase() },
  });

  if (!user) return; // always silent

  // Invalidate previous reset OTPs
  await prisma.otpCode.updateMany({
    where: {
      userId: user.id,
      type: OtpType.PASSWORD_RESET,
      usedAt: null,
    },
    data: { usedAt: new Date() },
  });

  const otp = generateOTP();
  await prisma.otpCode.create({
    data: {
      userId: user.id,
      code: otp,
      type: OtpType.PASSWORD_RESET,
      expiresAt: getOTPExpiry(),
    },
  });

  await sendPasswordResetEmail(user.email, user.name, otp);
};


// Reset Password
export const resetPassword = async (
  input: ResetPasswordInput,
): Promise<void> => {
  if (!isStrongPassword(input.newPassword)) {
    throw new ApiError(
      400,
      "Password must be at least 8 characters with uppercase, lowercase, and a number",
    );
  }

  const otpRecord = await prisma.otpCode.findFirst({
    where: {
      code: input.otp,
      type: OtpType.PASSWORD_RESET,
      expiresAt: { gt: new Date() },
      usedAt: null,
    },
  });

  if (!otpRecord) throw new ApiError(400, "Invalid or expired OTP");

  const hashedPassword = await hashPassword(input.newPassword);

  await prisma.$transaction([
    prisma.otpCode.update({
      where: { id: otpRecord.id },
      data: { usedAt: new Date() },
    }),
    prisma.user.update({
      where: { id: otpRecord.userId },
      data: {
        password: hashedPassword,
        tokenVersion: { increment: 1 },
      },
    }),
  ]);

  const user = await prisma.user.findUnique({
    where: { id: otpRecord.userId },
  });
  if (user) await sendPasswordChangedEmail(user.email, user.name);
};


// Change Password
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
      tokenVersion: { increment: 1 },
    },
  });

  await sendPasswordChangedEmail(user.email, user.name);
};
