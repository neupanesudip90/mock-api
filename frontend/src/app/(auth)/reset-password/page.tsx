import { Metadata } from "next";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password | MockAPI",
  description: "Set a new password",
};

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  return (
    <AuthLayout
      title="Reset your password"
      description="Enter the code we sent and your new password"
    >
      <ResetPasswordForm email={searchParams.email} />
    </AuthLayout>
  );
}