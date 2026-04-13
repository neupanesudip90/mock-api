"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { LoadingPage } from "@/components/shared/LoadingSpinner";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  // Read token synchronously during render — safe in a "use client" component
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  // Store hasn't hydrated yet but token exists — wait for it
  const isHydrating = !isAuthenticated && !!token;

  useEffect(() => {
    if (!isAuthenticated && !token) {
      router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, token, router, pathname]);

  // Definitively not logged in — redirect in flight
  if (!isAuthenticated && !token) {
    return <LoadingPage />;
  }

  // Token exists but Zustand hasn't rehydrated yet — hold on
  if (isHydrating) {
    return <LoadingPage />;
  }

  return <>{children}</>;
}
