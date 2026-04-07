"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatRelativeTime } from "@/lib/utils";
import type { Project } from "@/types";
import { Route, Key, MoreVertical, ExternalLink, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { useProjects } from "@/hooks/useProjects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { deleteProject } = useProjects();

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <Link href={`/projects/${project.id}`}>
              <h3 className="font-semibold hover:text-primary transition-colors cursor-pointer">
                {project.name}
              </h3>
            </Link>
            <StatusBadge status={project.status} />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/projects/${project.id}`}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open Project
                </Link>
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
        </CardHeader>
        <CardContent>
          {project.description && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {project.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Route className="h-4 w-4" />
              <span>{project.endpointCount} endpoints</span>
            </div>
            <div className="flex items-center gap-1">
              <Key className="h-4 w-4" />
              <span>{project.apiKeyCount} keys</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Updated {formatRelativeTime(project.updatedAt)}
          </p>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete Project"
        description="Are you sure you want to delete this project? All endpoints and API keys will be permanently removed. This action cannot be undone."
        confirmLabel="Delete Project"
        onConfirm={() => {
          deleteProject.mutate(project.id);
          setShowDeleteDialog(false);
        }}
        isLoading={deleteProject.isPending}
      />
    </>
  );
}
