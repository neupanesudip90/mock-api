import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const { user, setUser, setToken, logout: storeLogout } = useAuthStore();

  // Register
  const register = useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      const response = await api.post<{ success: boolean; data: AuthResponse }>(
        "/auth/register",
        credentials,
      );
      return response.data.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.tokens.accessToken);
      toast({
        variant: "success",
        title: "Account created!",
        description: "Please verify your email address.",
      });
      router.push("/verify-email");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: getErrorMessage(error),
      });
    },
  });

  // Login
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
      toast({
        variant: "success",
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: getErrorMessage(error),
      });
    },
  });

  // Verify Email
  const verifyEmail = useMutation({
    mutationFn: async (payload: VerifyEmailPayload) => {
      const response = await api.post("/auth/verify-email", payload);
      return response.data;
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Email verified!",
        description: "Your email has been verified successfully.",
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: getErrorMessage(error),
      });
    },
  });

  // Resend Verification Email
  const resendVerificationEmail = useMutation({
    mutationFn: async (email: string) => {
      const response = await api.post("/auth/resend-verification", { email });
      return response.data;
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Code sent!",
        description: "A new verification code has been sent to your email.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to send code",
        description: getErrorMessage(error),
      });
    },
  });

  // Forgot Password
  const forgotPassword = useMutation({
    mutationFn: async (payload: ForgotPasswordPayload) => {
      const response = await api.post("/auth/forgot-password", payload);
      return response.data;
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Reset code sent!",
        description: "Check your email for the password reset code.",
      });
      router.push("/reset-password");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to send reset code",
        description: getErrorMessage(error),
      });
    },
  });

  // Reset Password
  const resetPassword = useMutation({
    mutationFn: async (payload: ResetPasswordPayload) => {
      const response = await api.post("/auth/reset-password", payload);
      return response.data;
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Password reset!",
        description: "Your password has been reset successfully.",
      });
      router.push("/login");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Reset failed",
        description: getErrorMessage(error),
      });
    },
  });

  // Logout
  const logout = useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },
    onSuccess: () => {
      storeLogout();
      queryClient.clear();
      router.push("/login");
      toast({
        variant: "info",
        title: "Logged out",
        description: "You've been logged out successfully.",
      });
    },
    onError: () => {
      // Still logout on frontend even if backend fails
      storeLogout();
      queryClient.clear();
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
