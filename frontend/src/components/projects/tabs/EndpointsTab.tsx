"use client";

import { useState } from "react";
import { useEndpoints } from "@/hooks/useEndpoints";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { EndpointRow } from "@/components/endpoints/EndpointRow";
import { CreateEndpointDialog } from "@/components/endpoints/CreateEndpointDialog";
import { Plus, Route } from "lucide-react";

interface EndpointsTabProps {
  projectId: string;
}

export function EndpointsTab({ projectId }: EndpointsTabProps) {
  const { endpoints, isLoading } = useEndpoints(projectId);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Endpoints</h2>
          <p className="text-sm text-muted-foreground">
            Configure your mock API endpoints
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Endpoint
        </Button>
      </div>

      {/* Endpoints List */}
      {isLoading ? (
        <Card>
          <CardContent className="p-0">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border-b last:border-0"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-5 w-40" />
                </div>
                <Skeleton className="h-8 w-8" />
              </div>
            ))}
          </CardContent>
        </Card>
      ) : endpoints?.length === 0 ? (
        <EmptyState
          icon={Route}
          title="No endpoints yet"
          description="Create your first endpoint to start mocking API responses."
          actionLabel="Create Endpoint"
          onAction={() => setIsCreateDialogOpen(true)}
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            {endpoints?.map((endpoint, index) => (
              <EndpointRow
                key={endpoint.id}
                endpoint={endpoint}
                projectId={projectId}
                isLast={index === endpoints.length - 1}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Create Dialog */}
      <CreateEndpointDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        projectId={projectId}
      />
    </div>
  );
}
