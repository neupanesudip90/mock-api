// components/projects/tabs/EndpointsTab.tsx
"use client";

import { useState } from "react";
import { useEndpoints } from "@/hooks/useEndpoints";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, RefreshCw, Inbox } from "lucide-react";
import { CreateEndpointDialog } from "@/components/endpoints/CreateEndpointDialog";
import { EditEndpointDialog } from "@/components/endpoints/EditEndpointDialog";
import { EndpointRow } from "@/components/endpoints/EndpointRow";
import type { Endpoint } from "@/types";

interface EndpointsTabProps {
  projectId: string;
}

export function EndpointsTab({ projectId }: EndpointsTabProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(
    null,
  );

  // ✅ Destructure correctly - endpoints is now Endpoint[] | undefined, not a query object
  const { endpoints, isLoading } = useEndpoints(projectId);

  // ✅ Convert to array with fallback
  const endpointsList = endpoints ?? [];

  const handleEdit = (endpoint: Endpoint) => {
    setSelectedEndpoint(endpoint);
    setEditDialogOpen(true);
  };

  // ✅ Use isLoading directly
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Endpoints</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Endpoints ({endpointsList.length})</CardTitle>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => setCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Endpoint
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {endpointsList.length === 0 ? (
            // Empty state
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Inbox className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No endpoints yet</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Create your first endpoint to get started
              </p>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Endpoint
              </Button>
            </div>
          ) : (
            // Map over the endpoints array
            endpointsList.map((endpoint, index) => (
              <EndpointRow
                key={endpoint.id}
                endpoint={endpoint}
                projectId={projectId}
                isLast={index === endpointsList.length - 1}
              />
            ))
          )}
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <CreateEndpointDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        projectId={projectId}
      />

      {/* Edit Dialog */}
      {selectedEndpoint && (
        <EditEndpointDialog
          open={editDialogOpen}
          onOpenChange={(open) => {
            setEditDialogOpen(open);
            if (!open) setSelectedEndpoint(null);
          }}
          projectId={projectId}
          endpoint={selectedEndpoint}
        />
      )}
    </>
  );
}
