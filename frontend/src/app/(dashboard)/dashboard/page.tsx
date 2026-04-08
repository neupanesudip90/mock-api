"use client";

import { useProjects } from "@/hooks/useProjects";
import { useAuthStore } from "@/store/authStore";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsCard } from "@/components/shared/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatRelativeTime } from "@/lib/utils";
import Link from "next/link";
import {
  FolderKanban,
  Route,
  Activity,
  Key,
  Plus,
  ArrowRight,
} from "lucide-react";


export default function DashboardPage() {
  const { user } = useAuthStore();
  const { projects, isLoading } = useProjects();

  const totalEndpoints =
    projects?.reduce((acc, p) => acc + p.endpointCount, 0) || 0;
  const totalApiKeys =
    projects?.reduce((acc, p) => acc + p.apiKeyCount, 0) || 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title={`Welcome back, ${user?.name || "Developer"}!`}
        description="Here's what's happening with your mock APIs today."
      >
        <Link href="/projects">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </Link>
      </PageHeader>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Projects"
          value={isLoading ? "-" : projects?.length || 0}
          icon={FolderKanban}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Total Endpoints"
          value={isLoading ? "-" : totalEndpoints}
          icon={Route}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatsCard
          title="API Keys"
          value={isLoading ? "-" : totalApiKeys}
          icon={Key}
        />
        <StatsCard
          title="Requests Today"
          value="1.2k"
          icon={Activity}
          trend={{ value: 4.1, isPositive: false }}
        />
      </div>

      {/* Recent Projects */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Projects</CardTitle>
          <Link href="/projects">
            <Button variant="ghost" size="sm" className="gap-1">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-8 w-20" />
                </div>
              ))}
            </div>
          ) : projects?.length === 0 ? (
            <div className="text-center py-12">
              <FolderKanban className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No projects yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first mock API project to get started.
              </p>
              <Link href="/projects">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Project
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {projects?.slice(0, 5).map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{project.name}</h4>
                        <StatusBadge status={project.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {project.endpointCount} endpoints · Updated{" "}
                        {formatRelativeTime(project.updatedAt)}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
