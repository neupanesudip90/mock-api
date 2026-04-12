import { Request, Response, NextFunction } from "express";
import * as authService from "@/services/auth.service";
import { ApiError } from "@/utils/ApiError";

// Cookie config — httpOnly prevents JS access (XSS protection)
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // HTTPS only in prod
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  path: "/api/auth/refresh", // cookie only sent to this path
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { response, refreshToken } = await authService.registerUser(req.body);
    res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);
    res.status(201).json({ success: true, data: response });
  } catch (err) {
    next(err);
  }
};

// export const verifyEmailController = async (req: Request, res: Response) => {
//   const { email, code, type } = req.body;

//   if (!email || !code) {
//     throw new ApiError(400, "Email and code are required");
//   }

//   await authService.verifyEmail({ email, code, type });
//   res
//     .status(200)
//     .json({ success: true, message: "Email verified successfully" });
// };
export const verifyEmailController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, code, type } = req.body;
    if (!email || !code) throw new ApiError(400, "Email and code are required");

    const { response, refreshToken } = await authService.verifyEmail({ email, code, type });
    res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);
    res.status(200).json({ success: true, data: response });
  } catch (err) {
    next(err);
  }
};

export const resendVerification = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await authService.resendVerificationEmail(req.body.email);
    // Always same response — don't reveal if email exists
    res.json({
      success: true,
      message: "If that email exists, a verification link has been sent",
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { response, refreshToken } = await authService.loginUser(req.body);
    res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);
    res.json({ success: true, data: response });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) {
      res.status(401).json({ success: false, message: "No refresh token" });
      return;
    }
    const result = await authService.refreshAccessToken(token);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await authService.logoutUser(req.user!.userId);
    // Clear the cookie
    res.clearCookie("refreshToken", { path: "/api/auth/refresh" });
    res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await authService.forgotPassword(req.body);
    // Always same response
    res.json({
      success: true,
      message: "If that email exists, a reset link has been sent",
    });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await authService.resetPassword(req.body);
    res.json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await authService.changePassword(req.user!.userId, req.body);
    res.json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    next(err);
  }
};
