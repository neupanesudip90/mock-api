import { Router } from "express";
import * as authController from "@/controllers/auth.controller";
import { requireAuth } from "@/middlewares/auth.middleware";

const router = Router();


// Public routes — no token needed
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/verify-email", authController.verifyEmailController);
router.post("/resend-verification", authController.resendVerification);


// Protected routes — JWT required
router.post("/logout", requireAuth, authController.logout);
router.post("/change-password", requireAuth, authController.changePassword);

export default router;
