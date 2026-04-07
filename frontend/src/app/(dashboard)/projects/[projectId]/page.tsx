"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProjects } from "@/hooks/useProjects";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingPage } from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  MoreVertical,
  Settings,
  Trash2,
  Archive,
} from "lucide-react";
import Link from "next/link";

// Tab Components
import { OverviewTab } from "@/components/projects/tabs/OverviewTab";
import { EndpointsTab } from "@/components/projects/tabs/EndpointsTab";
import { ApiKeysTab } from "@/components/projects/tabs/ApiKeysTab";
import { AnalyticsTab } from "@/components/projects/tabs/AnalyticsTab";
import { PlaygroundTab } from "@/components/projects/tabs/PlaygroundTab";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;

  const { useProject, deleteProject } = useProjects();
  const { data: project, isLoading, error } = useProject(projectId);

  const [activeTab, setActiveTab] = useState("overview");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <h2 className="text-2xl font-bold">Project not found</h2>
        <p className="text-muted-foreground">
          The project you're looking for doesn't exist or you don't have access.
        </p>
        <Link href="/projects">
          <Button>Back to Projects</Button>
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    deleteProject.mutate(projectId, {
      onSuccess: () => {
        router.push("/projects");
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{project.name}</h1>
              <StatusBadge status={project.status} />
            </div>
            {project.description && (
              <p className="mt-1 text-muted-foreground">
                {project.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="mr-2 h-4 w-4" />
                Archive
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

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="playground">Playground</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewTab project={project} />
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-6">
          <EndpointsTab projectId={projectId} />
        </TabsContent>

        <TabsContent value="api-keys" className="space-y-6">
          <ApiKeysTab projectId={projectId} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsTab projectId={projectId} />
        </TabsContent>

        <TabsContent value="playground" className="space-y-6">
          <PlaygroundTab projectId={projectId} />
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete Project"
        description="Are you sure you want to delete this project? All endpoints, API keys, and usage data will be permanently removed."
        confirmLabel="Delete Project"
        onConfirm={handleDelete}
        isLoading={deleteProject.isPending}
      />
    </div>
  );
}
