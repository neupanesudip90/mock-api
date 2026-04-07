import { cn, HTTP_METHOD_COLORS } from "@/lib/utils";
import type { HttpMethod } from "@/types";

interface MethodBadgeProps {
  method: HttpMethod;
  className?: string;
}

export function MethodBadge({ method, className }: MethodBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold uppercase",
        HTTP_METHOD_COLORS[method] || "bg-gray-500/10 text-gray-500",
        className,
      )}
    >
      {method}
    </span>
  );
}
