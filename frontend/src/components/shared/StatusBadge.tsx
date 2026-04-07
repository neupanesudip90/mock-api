import { cn, STATUS_COLORS } from "@/lib/utils";
import type { ProjectStatus } from "@/types";

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        STATUS_COLORS[status] || "bg-gray-500/10 text-gray-500",
        className,
      )}
    >
      {status.toLowerCase()}
    </span>
  );
}
