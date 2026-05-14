// hooks/useAuth.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api, getErrorMessage } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  VerifyEmailPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from "@/types";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    user,
    setUser,
    setToken,
    logout: storeLogout,
    setIsVerified,
  } = useAuthStore();

  //  REGISTER
  const register = useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      const response = await api.post<{ success: boolean; data: AuthResponse }>(
        "/auth/register",
        credentials,
      );
      return response.data.data;
    },

    onSuccess: (data) => {
      toast({
        variant: "success",
        title: "Account created successfully!",
        description: "We've sent a verification code to your email.",
      });

      router.push(`/verify-email?email=${encodeURIComponent(data.user.email)}`);
    },

    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: getErrorMessage(error),
      });
    },
  });

  //  VERIFY EMAIL
  const verifyEmail = useMutation({
    mutationFn: async (payload: VerifyEmailPayload) => {
      const response = await api.post<{ success: boolean; data: AuthResponse }>(
        "/auth/verify-email",
        payload,
      );
      return response.data.data;
    },

    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.tokens.accessToken);
      setIsVerified?.(true);

      // set cookie for middleware
      document.cookie = `auth-storage=${JSON.stringify({ state: { isAuthenticated: true } })}; path=/; max-age=${60 * 60 * 24 * 7}`;

      router.push("/dashboard");
    },

    onError: (error: any) => {
      console.error("Verification error:", error);
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: getErrorMessage(error),
      });
    },
  });

  //  LOGIN
  const login = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await api.post<{ success: boolean; data: AuthResponse }>(
        "/auth/login",
        credentials,
      );
      return response.data.data;
    },

    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.tokens.accessToken);
      setIsVerified?.(true);

      toast({
        variant: "success",
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      router.push("/dashboard");
    },

    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: getErrorMessage(error),
      });
    },
  });

  //  RESEND VERIFICATION
  const resendVerificationEmail = useMutation({
    mutationFn: async (email: string) => {
      await api.post("/auth/resend-verification", { email });
    },

    onSuccess: () => {
      toast({
        variant: "success",
        title: "Code sent!",
        description: "A new verification code has been sent to your email.",
      });
    },

    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Failed to resend code",
        description: getErrorMessage(error),
      });
    },
  });

  //  FORGOT PASSWORD
  const forgotPassword = useMutation({
    mutationFn: async (payload: ForgotPasswordPayload) => {
      await api.post("/auth/forgot-password", payload);
    },

    onSuccess: () => {
      toast({
        variant: "success",
        title: "Reset code sent!",
        description: "Check your email for the password reset code.",
      });
      router.push("/reset-password");
    },

    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Failed to send reset code",
        description: getErrorMessage(error),
      });
    },
  });

  //  RESET PASSWORD
  const resetPassword = useMutation({
    mutationFn: async (payload: ResetPasswordPayload) => {
      await api.post("/auth/reset-password", payload);
    },

    onSuccess: () => {
      toast({
        variant: "success",
        title: "Password reset successful!",
        description: "You can now login with your new password.",
      });
      router.push("/login");
    },

    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Password reset failed",
        description: getErrorMessage(error),
      });
    },
  });

  // LOGOUT
  const logout = useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },
    onSuccess: () => {
      // 1. Clear store and cookie FIRST
      storeLogout();
      queryClient.clear();
      document.cookie = "auth-storage=; path=/; max-age=0"; // ← moved up

      // 2. Navigate only after cookie is gone
      router.push("/login");

      toast({
        variant: "info",
        title: "Logged out",
        description: "You've been logged out successfully.",
      });
    },
    onError: () => {
      storeLogout();
      queryClient.clear();
      document.cookie = "auth-storage=; path=/; max-age=0";
      router.push("/login");
    },
  });

  return {
    user,
    isAuthenticated: !!user,
    register,
    login,
    verifyEmail,
    resendVerificationEmail,
    forgotPassword,
    resetPassword,
    logout,
  };
}
