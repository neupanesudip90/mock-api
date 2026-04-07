"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/shared/StatsCard";
import { CopyButton } from "@/components/shared/CopyButton";
import { formatDate } from "@/lib/utils";
import type { Project } from "@/types";
import { Route, Key, Activity, Clock, Globe, Shield } from "lucide-react";

interface OverviewTabProps {
  project: Project;
}

export function OverviewTab({ project }: OverviewTabProps) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
    "http://localhost:3000";
  const mockUrl = `${baseUrl}/api/mock/${project.id}`;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Endpoints"
          value={project.endpointCount}
          icon={Route}
        />
        <StatsCard title="API Keys" value={project.apiKeyCount} icon={Key} />
        <StatsCard
          title="Requests Today"
          value="1.2k"
          icon={Activity}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard title="Avg Response Time" value="120ms" icon={Clock} />
      </div>

      {/* Project Details */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Base URL Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe className="h-4 w-4" />
              Base URL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted font-mono text-sm">
              <code className="flex-1 break-all">{mockUrl}</code>
              <CopyButton value={mockUrl} />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Use this base URL with your API key to access your mock endpoints.
            </p>
          </CardContent>
        </Card>

        {/* Rate Limiting Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="h-4 w-4" />
              Rate Limiting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Strategy</span>
                <span className="text-sm font-medium">
                  {project.defaultRateLimitStrategy.replace("_", " ")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Max Requests
                </span>
                <span className="text-sm font-medium">
                  {project.defaultRateLimitMax} /{" "}
                  {project.defaultRateLimitWindow}s
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Info Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Project Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-sm text-muted-foreground">Project ID</p>
                <div className="flex items-center gap-2 mt-1">
                  <code className="text-sm font-mono">{project.id}</code>
                  <CopyButton value={project.id} />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-sm font-medium mt-1 capitalize">
                  {project.status.toLowerCase()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="text-sm font-medium mt-1">
                  {formatDate(project.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-sm font-medium mt-1">
                  {formatDate(project.updatedAt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Start Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Start</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Make your first request to a mock endpoint:
            </p>
            <div className="rounded-lg bg-gray-950 p-4 overflow-x-auto">
              <pre className="text-sm text-gray-100 font-mono">
                {`curl -X GET "${mockUrl}/your-endpoint" \\
  -H "x-api-key: YOUR_API_KEY"`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
