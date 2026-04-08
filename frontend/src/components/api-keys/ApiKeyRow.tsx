"use client";
import { useState } from "react";
import { useApiKeys } from "@/hooks/useApiKeys";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/shared/CopyButton";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2, RefreshCw, Key } from "lucide-react";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { ApiKey } from "@/types";

interface ApiKeyRowProps {
  apiKey: ApiKey;
  projectId: string;
  isLast?: boolean;
  onRotateSuccess?: (plainKey: string) => void; // ← Add this
}

export function ApiKeyRow({
  apiKey,
  projectId,
  isLast,
  onRotateSuccess,
}: ApiKeyRowProps) {
  const { revokeApiKey, rotateApiKey } = useApiKeys(projectId);
  const [showRevokeDialog, setShowRevokeDialog] = useState(false);
  const [showRotateDialog, setShowRotateDialog] = useState(false);

  const handleRotate = () => {
    rotateApiKey.mutate(apiKey.id, {
      onSuccess: (data) => {
        onRotateSuccess?.(data.plainKey); // ← Call parent handler
        setShowRotateDialog(false);
      },
    });
  };

  return (
    <>
      <div
        className={cn(
          "flex items-center justify-between p-4 hover:bg-muted/50 transition-colors",
          !isLast && "border-b",
        )}
      >
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Key className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="font-medium truncate">{apiKey.name}</p>
              {!apiKey.isActive && <Badge variant="secondary">Inactive</Badge>}
            </div>
            <div className="flex items-center gap-3 mt-1">
              <code className="text-xs text-muted-foreground font-mono">
                {apiKey.keyPrefix}...
              </code>
              <span className="text-xs text-muted-foreground">
                {apiKey.lastUsedAt
                  ? `Last used ${formatRelativeTime(apiKey.lastUsedAt)}`
                  : "Never used"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CopyButton value={apiKey.keyPrefix} variant="outline" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowRotateDialog(true)}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Rotate Key
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setShowRevokeDialog(true)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Revoke
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Revoke Confirmation */}
      <ConfirmDialog
        open={showRevokeDialog}
        onOpenChange={setShowRevokeDialog}
        title="Revoke API Key"
        description={`Are you sure you want to revoke "${apiKey.name}"? Any applications using this key will immediately lose access.`}
        confirmLabel="Revoke Key"
        onConfirm={() => {
          revokeApiKey.mutate(apiKey.id);
          setShowRevokeDialog(false);
        }}
        isLoading={revokeApiKey.isPending}
      />

      {/* Rotate Confirmation */}
      <ConfirmDialog
        open={showRotateDialog}
        onOpenChange={setShowRotateDialog}
        title="Rotate API Key"
        description={`This will invalidate the current key and generate a new one. Any applications using "${apiKey.name}" will need to be updated.`}
        confirmLabel="Rotate Key"
        onConfirm={handleRotate}
        isLoading={rotateApiKey.isPending}
        variant="default"
      />

      {/* Removed KeyRevealDialog from here */}
    </>
  );
}
