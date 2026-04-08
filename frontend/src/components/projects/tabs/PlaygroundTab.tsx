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
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Endpoint } from "@/types";

interface PlaygroundTabProps {
  projectId: string;
}

interface RequestResult {
  status: number;
  statusText: string;
  data: any;
  time: number;
  headers: Record<string, string>;
}

export function PlaygroundTab({ projectId }: PlaygroundTabProps) {
  const { endpoints, isLoading: endpointsLoading } = useEndpoints(projectId);
  const { apiKeys, isLoading: keysLoading } = useApiKeys(projectId);

  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("");
  const [selectedApiKeyId, setSelectedApiKeyId] = useState<string>("");
  const [fullApiKey, setFullApiKey] = useState<string>(""); // ← New: Full key input
  const [showFullKey, setShowFullKey] = useState(false);
  const [pathParams, setPathParams] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RequestResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentEndpoint = endpoints?.find((e) => e.id === selectedEndpoint);
  const selectedKeyInfo = apiKeys?.find((k) => k.id === selectedApiKeyId);

  // Extract path parameters from endpoint path
  const getPathParams = (path: string): string[] => {
    const matches = path.match(/:(\w+)/g);
    return matches ? matches.map((m) => m.slice(1)) : [];
  };

  const params = currentEndpoint ? getPathParams(currentEndpoint.path) : [];

  const buildUrl = (): string => {
    if (!currentEndpoint) return "";
    let path = currentEndpoint.path;
    params.forEach((param) => {
      path = path.replace(`:${param}`, pathParams[param] || `:${param}`);
    });
    return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:3000"}/api/mock/${projectId}${path}`;
  };

  const handleSendRequest = async () => {
    if (!currentEndpoint || !fullApiKey.trim()) {
      setError("Please select an endpoint and enter your full API key");
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);

    const startTime = performance.now();

    try {
      const url = buildUrl();

      const response = await fetch(url, {
        method: currentEndpoint.method,
        headers: {
          "x-api-key": fullApiKey.trim(), // ← Full key sent here
          "Content-Type": "application/json",
        },
      });

      const endTime = performance.now();
      const data = await response.json().catch(() => null);

      setResult({
        status: response.status,
        statusText: response.statusText,
        data: data || "No JSON body returned",
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
                  {endpoints.map((endpoint) => (
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

            {/* Full API Key Input - THIS IS THE IMPORTANT PART */}
            <div className="space-y-2">
              <Label>
                Full API Key <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  type={showFullKey ? "text" : "password"}
                  placeholder="Paste your full API key here"
                  value={fullApiKey}
                  onChange={(e) => setFullApiKey(e.target.value)}
                  className="font-mono pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setShowFullKey(!showFullKey)}
                >
                  {showFullKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Paste the full key shown when you created or rotated the key.
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
              disabled={!currentEndpoint || !fullApiKey.trim() || isLoading}
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

        {/* Response Panel - unchanged */}
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
