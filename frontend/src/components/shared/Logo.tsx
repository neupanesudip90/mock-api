import Link from "next/link";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: {
    icon: "h-5 w-5",
    text: "text-lg",
    container: "gap-1.5",
  },
  md: {
    icon: "h-6 w-6",
    text: "text-xl",
    container: "gap-2",
  },
  lg: {
    icon: "h-8 w-8",
    text: "text-2xl",
    container: "gap-2.5",
  },
};

export function Logo({ className, iconOnly = false, size = "md" }: LogoProps) {
  const sizes = sizeClasses[size];

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center font-bold transition-opacity hover:opacity-80",
        sizes.container,
        className,
      )}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
        <div className="relative flex items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-600 p-1.5">
          <Zap className={cn("text-white", sizes.icon)} fill="currentColor" />
        </div>
      </div>
      {!iconOnly && (
        <span className={cn("gradient-text", sizes.text)}>MockAPI</span>
      )}
    </Link>
  );
}
