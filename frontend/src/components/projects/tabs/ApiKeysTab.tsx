"use client";

import { useState } from "react";
import { useApiKeys } from "@/hooks/useApiKeys";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiKeyRow } from "@/components/api-keys/ApiKeyRow";
import { CreateApiKeyDialog } from "@/components/api-keys/CreateApiKeyDialog";
import { Plus, Key } from "lucide-react";

interface ApiKeysTabProps {
  projectId: string;
}

export function ApiKeysTab({ projectId }: ApiKeysTabProps) {
  const { apiKeys, isLoading } = useApiKeys(projectId);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">API Keys</h2>
          <p className="text-sm text-muted-foreground">
            Manage API keys for authentication
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Key
        </Button>
      </div>

      {/* Warning */}
      <div className="rounded-lg border border-warning/50 bg-warning/10 p-4">
        <p className="text-sm text-warning">
          <strong>Security Note:</strong> API keys grant full access to this
          projects endpoints. Keep them secure and never expose them in
          client-side code.
        </p>
      </div>

      {/* API Keys List */}
      {isLoading ? (
        <Card>
          <CardContent className="p-0">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border-b last:border-0"
              >
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-8 w-8" />
              </div>
            ))}
          </CardContent>
        </Card>
      ) : apiKeys?.length === 0 ? (
        <EmptyState
          icon={Key}
          title="No API keys yet"
          description="Create an API key to authenticate requests to your mock endpoints."
          actionLabel="Create API Key"
          onAction={() => setIsCreateDialogOpen(true)}
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            {apiKeys?.map((apiKey, index) => (
              <ApiKeyRow
                key={apiKey.id}
                apiKey={apiKey}
                projectId={projectId}
                isLast={index === apiKeys.length - 1}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Create Dialog */}
      <CreateApiKeyDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        projectId={projectId}
      />
    </div>
  );
}
