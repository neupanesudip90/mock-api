import { Metadata } from "next";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { VerifyEmailForm } from "@/components/auth/VerifyEmailForm";

export const metadata: Metadata = {
  title: "Verify Email | MockAPI",
  description: "Verify your email address",
};

export default function VerifyEmailPage() {
  return (
    <AuthLayout
      title="Check your email"
      description="We've sent you a 6-digit verification code"
    >
      <VerifyEmailForm />
    </AuthLayout>
  );
}
