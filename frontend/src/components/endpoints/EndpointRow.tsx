"use client";

import { useState } from "react";
import { useEndpoints } from "@/hooks/useEndpoints";
import { Button } from "@/components/ui/button";
import { MethodBadge } from "@/components/shared/MethodBadge";
import { CopyButton } from "@/components/shared/CopyButton";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash2, Copy, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Endpoint } from "@/types";
import { EditEndpointDialog } from "./EditEndpointDialog";

interface EndpointRowProps {
  endpoint: Endpoint;
  projectId: string;
  isLast?: boolean;
}

export function EndpointRow({ endpoint, projectId, isLast }: EndpointRowProps) {
  const { deleteEndpoint } = useEndpoints(projectId);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
    "http://localhost:3000";
  const fullUrl = `${baseUrl}/api/mock/${projectId}${endpoint.path}`;

  return (
    <>
      <div
        className={cn(
          "flex items-center justify-between p-4 hover:bg-muted/50 transition-colors",
          !isLast && "border-b",
        )}
      >
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <MethodBadge method={endpoint.method} />
          <div className="min-w-0 flex-1">
            <p className="font-mono text-sm truncate">{endpoint.path}</p>
            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
              <span>Status: {endpoint.statusCode}</span>
              {endpoint.delayMs > 0 && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {endpoint.delayMs}ms delay
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CopyButton value={fullUrl} variant="outline" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(fullUrl)}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy URL
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Edit Dialog */}
      <EditEndpointDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        projectId={projectId}
        endpoint={endpoint}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete Endpoint"
        description={`Are you sure you want to delete ${endpoint.method} ${endpoint.path}? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={() => {
          deleteEndpoint.mutate(endpoint.id);
          setShowDeleteDialog(false);
        }}
        isLoading={deleteEndpoint.isPending}
      />
    </>
  );
}
