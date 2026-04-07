import { Metadata } from "next";
import Link from "next/link";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Sign Up | MockAPI",
  description: "Create your MockAPI account",
};

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create an account"
      description="Get started with MockAPI in seconds"
      footer={
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
}
