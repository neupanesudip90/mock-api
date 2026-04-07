"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function VerifyEmailForm() {
  const { verifyEmail, resendVerificationEmail } = useAuth();
  const { user } = useAuthStore();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000,
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when complete
    if (newOtp.every((digit) => digit) && newOtp.join("").length === 6) {
      verifyEmail.mutate({ otp: newOtp.join("") });
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);

    if (pastedData.length === 6) {
      verifyEmail.mutate({ otp: pastedData });
    }
  };

  const handleResend = () => {
    if (user?.email) {
      resendVerificationEmail.mutate(user.email);
      setResendCooldown(60);
    }
  };

  return (
    <div className="space-y-6">
      {/* Email Display */}
      <p className="text-center text-muted-foreground">
        We sent a code to{" "}
        <span className="font-medium text-foreground">{user?.email}</span>
      </p>

      {/* OTP Inputs */}
      <div className="flex justify-center gap-3" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={cn(
              "h-14 w-12 rounded-lg border bg-background text-center text-2xl font-bold transition-all",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
              "hover:border-primary/50",
            )}
          />
        ))}
      </div>

      {/* Verify Button */}
      <Button
        onClick={() => verifyEmail.mutate({ otp: otp.join("") })}
        className="w-full"
        size="lg"
        isLoading={verifyEmail.isPending}
        disabled={otp.some((digit) => !digit)}
      >
        Verify Email
      </Button>

      {/* Resend */}
      <p className="text-center text-sm text-muted-foreground">
        Didn't receive the code?{" "}
        {resendCooldown > 0 ? (
          <span className="text-foreground">Resend in {resendCooldown}s</span>
        ) : (
          <button
            onClick={handleResend}
            className="font-medium text-primary hover:underline disabled:opacity-50"
            disabled={resendVerificationEmail.isPending}
          >
            {resendVerificationEmail.isPending ? "Sending..." : "Resend code"}
          </button>
        )}
      </p>
    </div>
  );
}
