"use client";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export function VerifyEmailForm({ email }: { email?: string }) {
  const { verifyEmail, resendVerificationEmail } = useAuth();
  const { user } = useAuthStore();
  const finalEmail = email || user?.email || "";

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

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((d) => d) && newOtp.join("").length === 6) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasted)) return;

    const newOtp = pasted.split("");
    setOtp(newOtp);
    if (pasted.length === 6) handleVerify(pasted);
  };

  const handleVerify = (code: string) => {
    const cleanCode = code.trim();
    if (cleanCode.length !== 6 || !finalEmail) {
      console.error("Cannot verify: missing email or incomplete code");
      return;
    }

    const payload = {
      email: finalEmail.toLowerCase(),
      code: cleanCode,
      type: "EMAIL_VERIFICATION",
    };

    verifyEmail.mutate(payload);
  };

  const handleResend = () => {
    if (!finalEmail) return;
    resendVerificationEmail.mutate(finalEmail);
    setResendCooldown(60);
  };

  return (
    <div className="space-y-6">
      <p className="text-center text-muted-foreground">
        We sent a 6-digit code to{" "}
        <span className="font-medium text-foreground">
          {email || "your email"}
        </span>
      </p>

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
            )}
          />
        ))}
      </div>

      <Button
        onClick={() => handleVerify(otp.join(""))}
        className="w-full"
        size="lg"
        isLoading={verifyEmail.isPending}
        disabled={otp.join("").length !== 6 || !email}
      >
        Verify Email
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Didn`t receive the code?{" "}
        {resendCooldown > 0 ? (
          <span>Resend in {resendCooldown}s</span>
        ) : (
          <button
            onClick={handleResend}
            className="font-medium text-primary hover:underline"
            disabled={resendVerificationEmail.isPending}
          >
            Resend code
          </button>
        )}
      </p>
    </div>
  );
}
