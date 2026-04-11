// // components/projects/tabs/PlaygroundTab.tsx
// "use client";
// import { useState } from "react";
// import { useEndpoints } from "@/hooks/useEndpoints";
// import { useApiKeys } from "@/hooks/useApiKeys";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { JsonEditor } from "@/components/shared/JsonEditor";
// import { MethodBadge } from "@/components/shared/MethodBadge";
// import { EmptyState } from "@/components/shared/EmptyState";
// import {
//   Play,
//   Loader2,
//   Clock,
//   CheckCircle,
//   XCircle,
//   Route,
//   Eye,
//   EyeOff,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface PlaygroundTabProps {
//   projectId: string;
// }

// interface RequestResult {
//   status: number;
//   statusText: string;
//   data: any;
//   time: number;
//   headers: Record<string, string>;
// }

// export function PlaygroundTab({ projectId }: PlaygroundTabProps) {
//   // ✅ Both hooks now return data directly (consistent structure)
//   const { endpoints, isLoading: endpointsLoading } = useEndpoints(projectId);
//   const { apiKeys, isLoading: apiKeysLoading } = useApiKeys(projectId);

//   // ✅ Convert to arrays with fallback
//   const endpointsList = endpoints ?? [];
//   const apiKeysList = apiKeys ?? [];

//   const isLoading = endpointsLoading || apiKeysLoading;

//   const [selectedEndpoint, setSelectedEndpoint] = useState<string>("");
//   const [selectedApiKeyId, setSelectedApiKeyId] = useState<string>("");
//   const [fullApiKey, setFullApiKey] = useState<string>("");
//   const [showFullKey, setShowFullKey] = useState(false);
//   const [pathParams, setPathParams] = useState<Record<string, string>>({});
//   const [isRequesting, setIsRequesting] = useState(false);
//   const [result, setResult] = useState<RequestResult | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   // Now these work correctly
//   const currentEndpoint = endpointsList.find((e) => e.id === selectedEndpoint);
//   const selectedKeyInfo = apiKeysList.find((k) => k.id === selectedApiKeyId);

//   // Extract path parameters from endpoint path
//   const getPathParams = (path: string): string[] => {
//     const matches = path.match(/:(\w+)/g);
//     return matches ? matches.map((m) => m.slice(1)) : [];
//   };

//   const params = currentEndpoint ? getPathParams(currentEndpoint.path) : [];

//   const buildUrl = (): string => {
//     if (!currentEndpoint) return "";
//     let path = currentEndpoint.path;
//     params.forEach((param) => {
//       path = path.replace(`:${param}`, pathParams[param] || `:${param}`);
//     });
//     return `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:3000"}/api/mock/${projectId}${path}`;
//   };

//   const handleSendRequest = async () => {
//     if (!currentEndpoint || !fullApiKey.trim()) {
//       setError("Please select an endpoint and enter your full API key");
//       return;
//     }

//     setIsRequesting(true);
//     setResult(null);
//     setError(null);

//     const startTime = performance.now();

//     try {
//       const url = buildUrl();

//       const response = await fetch(url, {
//         method: currentEndpoint.method,
//         headers: {
//           "x-api-key": fullApiKey.trim(),
//           "Content-Type": "application/json",
//         },
//       });

//       const endTime = performance.now();
//       const data = await response.json().catch(() => null);

//       setResult({
//         status: response.status,
//         statusText: response.statusText,
//         data: data || "No JSON body returned",
//         time: Math.round(endTime - startTime),
//         headers: Object.fromEntries(response.headers.entries()),
//       });
//     } catch (err: any) {
//       setError(err.message || "Request failed");
//     } finally {
//       setIsRequesting(false);
//     }
//   };

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
//       </div>
//     );
//   }

//   // ✅ Check using the arrays
//   if (endpointsList.length === 0 || apiKeysList.length === 0) {
//     return (
//       <EmptyState
//         icon={Route}
//         title="Setup Required"
//         description={
//           endpointsList.length === 0
//             ? "Create at least one endpoint to use the playground."
//             : "Create an API key to authenticate playground requests."
//         }
//       />
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h2 className="text-lg font-semibold">API Playground</h2>
//         <p className="text-sm text-muted-foreground">
//           Test your mock endpoints directly in the browser
//         </p>
//       </div>

//       <div className="grid gap-6 lg:grid-cols-2">
//         {/* Request Builder */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-base">Request</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {/* Endpoint Selection */}
//             <div className="space-y-2">
//               <Label>Endpoint</Label>
//               <Select
//                 value={selectedEndpoint}
//                 onValueChange={setSelectedEndpoint}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select an endpoint" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {endpointsList.map((endpoint) => (
//                     <SelectItem key={endpoint.id} value={endpoint.id}>
//                       <div className="flex items-center gap-2">
//                         <MethodBadge method={endpoint.method} />
//                         <span className="font-mono text-sm">
//                           {endpoint.path}
//                         </span>
//                       </div>
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Full API Key Input */}
//             <div className="space-y-2">
//               <Label>
//                 Full API Key <span className="text-destructive">*</span>
//               </Label>
//               <div className="relative">
//                 <Input
//                   type={showFullKey ? "text" : "password"}
//                   placeholder="Paste your full API key here"
//                   value={fullApiKey}
//                   onChange={(e) => setFullApiKey(e.target.value)}
//                   className="font-mono pr-10"
//                 />
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   size="icon"
//                   className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
//                   onClick={() => setShowFullKey(!showFullKey)}
//                 >
//                   {showFullKey ? (
//                     <EyeOff className="h-4 w-4" />
//                   ) : (
//                     <Eye className="h-4 w-4" />
//                   )}
//                 </Button>
//               </div>
//               <p className="text-xs text-muted-foreground">
//                 Paste the full key shown when you created or rotated the key.
//               </p>
//             </div>

//             {/* Path Parameters */}
//             {params.length > 0 && (
//               <div className="space-y-3">
//                 <Label>Path Parameters</Label>
//                 {params.map((param) => (
//                   <div key={param} className="flex items-center gap-2">
//                     <span className="text-sm text-muted-foreground w-20 font-mono">
//                       :{param}
//                     </span>
//                     <Input
//                       placeholder={`Enter ${param}`}
//                       value={pathParams[param] || ""}
//                       onChange={(e) =>
//                         setPathParams({
//                           ...pathParams,
//                           [param]: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* URL Preview */}
//             {currentEndpoint && (
//               <div className="space-y-2">
//                 <Label>Request URL</Label>
//                 <div className="p-3 rounded-lg bg-muted font-mono text-sm break-all">
//                   {buildUrl()}
//                 </div>
//               </div>
//             )}

//             {/* Send Button */}
//             <Button
//               onClick={handleSendRequest}
//               disabled={!currentEndpoint || !fullApiKey.trim() || isRequesting}
//               className="w-full gap-2"
//             >
//               {isRequesting ? (
//                 <>
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   Sending...
//                 </>
//               ) : (
//                 <>
//                   <Play className="h-4 w-4" />
//                   Send Request
//                 </>
//               )}
//             </Button>
//           </CardContent>
//         </Card>

//         {/* Response Panel */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-base">Response</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {error ? (
//               <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 text-destructive">
//                 <XCircle className="h-5 w-5 shrink-0" />
//                 <div>
//                   <p className="font-medium">Request Failed</p>
//                   <p className="text-sm">{error}</p>
//                 </div>
//               </div>
//             ) : result ? (
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     {result.status < 400 ? (
//                       <CheckCircle className="h-5 w-5 text-success" />
//                     ) : (
//                       <XCircle className="h-5 w-5 text-destructive" />
//                     )}
//                     <span
//                       className={cn(
//                         "font-medium",
//                         result.status < 400
//                           ? "text-success"
//                           : "text-destructive",
//                       )}
//                     >
//                       {result.status} {result.statusText}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                     <Clock className="h-4 w-4" />
//                     {result.time}ms
//                   </div>
//                 </div>

//                 <div>
//                   <Label className="mb-2 block">Response Body</Label>
//                   <JsonEditor
//                     value={JSON.stringify(result.data, null, 2)}
//                     onChange={() => {}}
//                     readOnly
//                     height="300px"
//                   />
//                 </div>
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
//                 <Play className="h-12 w-12 mb-4 opacity-20" />
//                 <p>Send a request to see the response</p>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
// components/projects/tabs/PlaygroundTab.tsx
"use client";

import { useState, useEffect } from "react";
import { useEndpoints } from "@/hooks/useEndpoints";
import { useApiKeys } from "@/hooks/useApiKeys";
import { useSavedApiKeys } from "@/hooks/useSavedApiKeys";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
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
  Key,
  Save,
  Trash2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  // Hooks
  const { endpoints, isLoading: endpointsLoading } = useEndpoints(projectId);
  const { apiKeys, isLoading: apiKeysLoading } = useApiKeys(projectId);
  const { savedKeys, saveKey, removeKey, getFullKey, isKeySaved } =
    useSavedApiKeys(projectId);

  // Data arrays
  const endpointsList = endpoints ?? [];
  const apiKeysList = apiKeys ?? [];
  const isLoading = endpointsLoading || apiKeysLoading;

  // State
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("");
  const [selectedApiKeyId, setSelectedApiKeyId] = useState<string>("");
  const [fullApiKey, setFullApiKey] = useState<string>("");
  const [showFullKey, setShowFullKey] = useState(false);
  const [pathParams, setPathParams] = useState<Record<string, string>>({});
  const [isRequesting, setIsRequesting] = useState(false);
  const [result, setResult] = useState<RequestResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Save key dialog
  const [saveKeyDialogOpen, setSaveKeyDialogOpen] = useState(false);
  const [keyToSave, setKeyToSave] = useState<string>("");

  // Get current endpoint and key info
  const currentEndpoint = endpointsList.find((e) => e.id === selectedEndpoint);
  const selectedKeyInfo = apiKeysList.find((k) => k.id === selectedApiKeyId);
  const isCurrentKeySaved = selectedApiKeyId
    ? isKeySaved(selectedApiKeyId)
    : false;

  // Auto-fill key when selecting a saved API key
  useEffect(() => {
    if (selectedApiKeyId) {
      const savedFullKey = getFullKey(selectedApiKeyId);
      if (savedFullKey) {
        setFullApiKey(savedFullKey);
      } else {
        setFullApiKey("");
      }
    }
  }, [selectedApiKeyId, getFullKey]);

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

  const handleSaveKey = () => {
    if (selectedApiKeyId && fullApiKey.trim() && selectedKeyInfo) {
      saveKey(selectedApiKeyId, selectedKeyInfo.name, fullApiKey.trim());
      setSaveKeyDialogOpen(false);
      setKeyToSave("");
    }
  };

  const handleRemoveSavedKey = () => {
    if (selectedApiKeyId) {
      removeKey(selectedApiKeyId);
      setFullApiKey("");
    }
  };

  const handleSendRequest = async () => {
    if (!currentEndpoint || !fullApiKey.trim()) {
      setError("Please select an endpoint and provide an API key");
      return;
    }

    setIsRequesting(true);
    setResult(null);
    setError(null);

    const startTime = performance.now();

    try {
      const url = buildUrl();

      const response = await fetch(url, {
        method: currentEndpoint.method,
        headers: {
          "x-api-key": fullApiKey.trim(),
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
      setIsRequesting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Empty state
  if (endpointsList.length === 0 || apiKeysList.length === 0) {
    return (
      <EmptyState
        icon={Route}
        title="Setup Required"
        description={
          endpointsList.length === 0
            ? "Create at least one endpoint to use the playground."
            : "Create an API key to authenticate playground requests."
        }
      />
    );
  }

  return (
    <TooltipProvider>
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
                    {endpointsList.map((endpoint) => (
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
                <Select
                  value={selectedApiKeyId}
                  onValueChange={setSelectedApiKeyId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an API key" />
                  </SelectTrigger>
                  <SelectContent>
                    {apiKeysList.map((key) => {
                      const isSaved = isKeySaved(key.id);
                      return (
                        <SelectItem key={key.id} value={key.id}>
                          <div className="flex items-center gap-2">
                            <Key className="h-4 w-4 text-muted-foreground" />
                            <span>{key.name}</span>
                            {isSaved && (
                              <Badge
                                variant="secondary"
                                className="text-xs ml-1"
                              >
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Saved
                              </Badge>
                            )}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Full API Key Input / Display */}
              {selectedApiKeyId && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>
                      Full API Key{" "}
                      {!isCurrentKeySaved && (
                        <span className="text-destructive">*</span>
                      )}
                    </Label>
                    <div className="flex items-center gap-1">
                      {isCurrentKeySaved ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-destructive hover:text-destructive"
                              onClick={handleRemoveSavedKey}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Remove
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            Remove saved key from browser
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        fullApiKey.trim() && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs"
                                onClick={() => setSaveKeyDialogOpen(true)}
                              >
                                <Save className="h-3 w-3 mr-1" />
                                Save
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              Save key to browser for quick access
                            </TooltipContent>
                          </Tooltip>
                        )
                      )}
                    </div>
                  </div>

                  {isCurrentKeySaved ? (
                    // Saved key - show masked
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          Key saved in browser
                        </p>
                        <p className="text-xs text-muted-foreground font-mono truncate">
                          {showFullKey
                            ? fullApiKey
                            : `${fullApiKey.slice(0, 12)}${"•".repeat(20)}`}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 shrink-0"
                        onClick={() => setShowFullKey(!showFullKey)}
                      >
                        {showFullKey ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ) : (
                    // Not saved - show input
                    <>
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
                      <div className="flex items-start gap-2 text-xs text-muted-foreground">
                        <AlertCircle className="h-3 w-3 mt-0.5 shrink-0" />
                        <p>
                          Paste the full key shown when you created the key.
                          Click "Save" to store it in your browser for quick
                          access.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}

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
                disabled={
                  !currentEndpoint || !fullApiKey.trim() || isRequesting
                }
                className="w-full gap-2"
              >
                {isRequesting ? (
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

          {/* Response Panel */}
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

        {/* Save Key Dialog */}
        <Dialog open={saveKeyDialogOpen} onOpenChange={setSaveKeyDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Save API Key</DialogTitle>
              <DialogDescription>
                Save this API key to your browser for quick access. The key will
                be stored locally and never sent to our servers.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                <Key className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{selectedKeyInfo?.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {fullApiKey.slice(0, 12)}...
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <p className="text-sm">
                  Only save keys on your personal devices. Anyone with access to
                  this browser can use the saved keys.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSaveKeyDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveKey}>
                <Save className="h-4 w-4 mr-2" />
                Save to Browser
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
