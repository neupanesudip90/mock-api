"use client";

import { useState } from "react";
import { useEndpoints } from "@/hooks/useEndpoints";
import { useApiKeys } from "@/hooks/useApiKeys";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JsonEditor } from "@/components/shared/JsonEditor";
import { MethodBadge } from "@/components/shared/MethodBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  Play,
  Loader2,
  Clock,
  CheckCircle,
  XCircle,
  Route,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Endpoint, HttpMethod } from "@/types";

interface PlaygroundTabProps {
  projectId: string;
}

interface RequestResult {
  status: number;
  statusText: string;
  data: string;
  time: number;
  headers: Record<string, string>;
}

export function PlaygroundTab({ projectId }: PlaygroundTabProps) {
  const { endpoints, isLoading: endpointsLoading } = useEndpoints(projectId);
  const { apiKeys, isLoading: keysLoading } = useApiKeys(projectId);

  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("");
  const [selectedApiKey, setSelectedApiKey] = useState<string>("");
  const [pathParams, setPathParams] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RequestResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
    "http://localhost:3000";

  const currentEndpoint = endpoints?.find((e) => e.id === selectedEndpoint);

  // Extract path parameters from endpoint path
  const getPathParams = (path: string): string[] => {
    const matches = path.match(/:(\w+)/g);
    return matches ? matches.map((m) => m.slice(1)) : [];
  };

  const params = currentEndpoint ? getPathParams(currentEndpoint.path) : [];

  // Build actual URL with params replaced
  const buildUrl = (): string => {
    if (!currentEndpoint) return "";
    let path = currentEndpoint.path;
    params.forEach((param) => {
      path = path.replace(`:${param}`, pathParams[param] || `:${param}`);
    });
    return `${baseUrl}/api/mock/${projectId}${path}`;
  };

  const handleSendRequest = async () => {
    if (!currentEndpoint || !selectedApiKey) return;

    setIsLoading(true);
    setResult(null);
    setError(null);

    const startTime = performance.now();

    try {
      const url = buildUrl();
      const response = await fetch(url, {
        method: currentEndpoint.method,
        headers: {
          "x-api-key": selectedApiKey,
          "Content-Type": "application/json",
        },
      });

      const endTime = performance.now();
      const data = await response.json();

      setResult({
        status: response.status,
        statusText: response.statusText,
        data,
        time: Math.round(endTime - startTime),
        headers: Object.fromEntries(response.headers.entries()),
      });
    } catch (err: any) {
      setError(err.message || "Request failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (endpointsLoading || keysLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!endpoints?.length || !apiKeys?.length) {
    return (
      <EmptyState
        icon={Route}
        title="Setup Required"
        description={
          !endpoints?.length
            ? "Create at least one endpoint to use the playground."
            : "Create an API key to authenticate playground requests."
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">API Playground</h2>
        <p className="text-sm text-muted-foreground">
          Test your mock endpoints directly in the browser
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Request Builder */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Endpoint Selection */}
            <div className="space-y-2">
              <Label>Endpoint</Label>
              <Select
                value={selectedEndpoint}
                onValueChange={setSelectedEndpoint}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an endpoint" />
                </SelectTrigger>
                <SelectContent>
                  {endpoints?.map((endpoint) => (
                    <SelectItem key={endpoint.id} value={endpoint.id}>
                      <div className="flex items-center gap-2">
                        <MethodBadge method={endpoint.method} />
                        <span className="font-mono text-sm">
                          {endpoint.path}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* API Key Selection */}
            <div className="space-y-2">
              <Label>API Key</Label>
              <Select value={selectedApiKey} onValueChange={setSelectedApiKey}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an API key" />
                </SelectTrigger>
                <SelectContent>
                  {apiKeys?.map((key) => (
                    <SelectItem key={key.id} value={key.keyPrefix + "..."}>
                      <span>{key.name}</span>
                      <span className="ml-2 text-muted-foreground font-mono text-xs">
                        ({key.keyPrefix}...)
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Note: For testing, use the full API key from creation.
              </p>
            </div>

            {/* Path Parameters */}
            {params.length > 0 && (
              <div className="space-y-3">
                <Label>Path Parameters</Label>
                {params.map((param) => (
                  <div key={param} className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground w-20 font-mono">
                      :{param}
                    </span>
                    <Input
                      placeholder={`Enter ${param}`}
                      value={pathParams[param] || ""}
                      onChange={(e) =>
                        setPathParams({
                          ...pathParams,
                          [param]: e.target.value,
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            )}

            {/* URL Preview */}
            {currentEndpoint && (
              <div className="space-y-2">
                <Label>Request URL</Label>
                <div className="p-3 rounded-lg bg-muted font-mono text-sm break-all">
                  {buildUrl()}
                </div>
              </div>
            )}

            {/* Send Button */}
            <Button
              onClick={handleSendRequest}
              disabled={!currentEndpoint || !selectedApiKey || isLoading}
              className="w-full gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Send Request
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Response */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Response</CardTitle>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 text-destructive">
                <XCircle className="h-5 w-5 shrink-0" />
                <div>
                  <p className="font-medium">Request Failed</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            ) : result ? (
              <div className="space-y-4">
                {/* Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {result.status < 400 ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                    <span
                      className={cn(
                        "font-medium",
                        result.status < 400
                          ? "text-success"
                          : "text-destructive",
                      )}
                    >
                      {result.status} {result.statusText}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {result.time}ms
                  </div>
                </div>

                {/* Response Body */}
                <div>
                  <Label className="mb-2 block">Response Body</Label>
                  <JsonEditor
                    value={JSON.stringify(result.data, null, 2)}
                    onChange={() => {}}
                    readOnly
                    height="300px"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <Play className="h-12 w-12 mb-4 opacity-20" />
                <p>Send a request to see the response</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
