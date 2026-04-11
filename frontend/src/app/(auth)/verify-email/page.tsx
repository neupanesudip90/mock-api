import { Metadata } from "next";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { VerifyEmailForm } from "@/components/auth/VerifyEmailForm";

export const metadata: Metadata = {
  title: "Verify Email | MockAPI",
  description: "Verify your email address",
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const params = await searchParams;

  return (
    <AuthLayout
      title="Verify your email"
      description="Enter the code sent to your email"
    >
      <VerifyEmailForm email={params.email} />
    </AuthLayout>
  );
}
