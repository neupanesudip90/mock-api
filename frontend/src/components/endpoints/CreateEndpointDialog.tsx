"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createEndpointSchema,
  type CreateEndpointFormData,
} from "@/lib/validations";
import { useEndpoints } from "@/hooks/useEndpoints";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { HTTP_METHODS } from "@/lib/utils";
import { JsonEditor } from "@/components/shared/JsonEditor";
import { Sparkles, FileJson, Info, AlertCircle } from "lucide-react";

interface CreateEndpointDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
}

// ============================================================================
// Response Templates
// ============================================================================
const RESPONSE_TEMPLATES = {
  dynamic: {
    user: `{
  "id": "{{params.id}}",
  "name": "{{person.fullName}}",
  "email": "{{internet.email}}",
  "avatar": "{{image.avatar}}",
  "createdAt": "{{date.past}}"
}`,
    userList: `[
  {
    "id": "{{string.uuid}}",
    "name": "{{person.fullName}}",
    "email": "{{internet.email}}"
  },
  {
    "id": "{{string.uuid}}",
    "name": "{{person.fullName}}",
    "email": "{{internet.email}}"
  }
]`,
    product: `{
  "id": "{{string.uuid}}",
  "name": "{{commerce.productName}}",
  "price": "{{commerce.price}}",
  "description": "{{commerce.productDescription}}",
  "category": "{{commerce.department}}",
  "inStock": "{{datatype.boolean}}"
}`,
    post: `{
  "id": "{{params.id}}",
  "title": "{{lorem.sentence}}",
  "body": "{{lorem.paragraph}}",
  "author": "{{person.fullName}}",
  "createdAt": "{{date.recent}}"
}`,
  },
  static: {
    success: `{
  "success": true,
  "message": "Operation completed successfully"
}`,
    error: `{
  "error": "Bad Request",
  "message": "Invalid input provided",
  "code": "VALIDATION_ERROR"
}`,
    config: `{
  "appName": "MyApp",
  "version": "1.0.0",
  "features": {
    "darkMode": true,
    "notifications": true
  }
}`,
    staticList: `[
  { "id": 1, "name": "Item 1", "active": true },
  { "id": 2, "name": "Item 2", "active": false },
  { "id": 3, "name": "Item 3", "active": true }
]`,
  },
};

// ============================================================================
// Helper Functions
// ============================================================================
const hasDynamicTemplates = (value: string): boolean => {
  return /\{\{[^}]+\}\}/.test(value);
};

const isValidJson = (value: string): boolean => {
  try {
    JSON.parse(value.trim());
    return true;
  } catch {
    return false;
  }
};

export function CreateEndpointDialog({
  open,
  onOpenChange,
  projectId,
}: CreateEndpointDialogProps) {
  const { createEndpoint } = useEndpoints(projectId);
  const [responseMode, setResponseMode] = useState<"dynamic" | "static">(
    "dynamic",
  );
  const [jsonError, setJsonError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateEndpointFormData>({
    resolver: zodResolver(createEndpointSchema),
    defaultValues: {
      path: "/",
      method: "GET",
      statusCode: 200,
      delayMs: 0,
      responseSchema: RESPONSE_TEMPLATES.dynamic.user,
      rateLimitEnabled: true,
    },
  });

  const currentSchema = watch("responseSchema");

  // Real-time JSON validation
  const currentIsValidJson = isValidJson(currentSchema);
  const currentHasDynamicTemplates = hasDynamicTemplates(currentSchema);

  const onSubmit = async (data: CreateEndpointFormData) => {
    // Extra safety: validate JSON before submitting
    const trimmedSchema = data.responseSchema.trim();

    if (!isValidJson(trimmedSchema)) {
      setJsonError("Invalid JSON format. Please check your syntax.");
      return;
    }

    setJsonError(null);

    try {
      const parsedSchema = JSON.parse(trimmedSchema);

      console.log("Creating endpoint with:", {
        path: data.path,
        method: data.method,
        statusCode: data.statusCode,
        delayMs: data.delayMs,
        responseSchema: parsedSchema,
        rateLimitEnabled: data.rateLimitEnabled,
      });

      createEndpoint.mutate(
        {
          path: data.path,
          method: data.method,
          statusCode: data.statusCode,
          delayMs: data.delayMs,
          responseSchema: parsedSchema,
          rateLimitEnabled: data.rateLimitEnabled,
        },
        {
          onSuccess: () => {
            reset();
            setResponseMode("dynamic");
            setJsonError(null);
            onOpenChange(false);
          },
          onError: (error: any) => {
            console.error("Create endpoint error:", error);
            setJsonError(
              error?.response?.data?.message || "Failed to create endpoint",
            );
          },
        },
      );
    } catch (e) {
      console.error("JSON parse error:", e);
      setJsonError("Failed to parse JSON. Please check your syntax.");
    }
  };

  const applyTemplate = (template: string) => {
    setValue("responseSchema", template, { shouldValidate: true });
    setJsonError(null);
  };

  const handleModeChange = (mode: "dynamic" | "static") => {
    setResponseMode(mode);
    // Apply default template for the mode
    if (mode === "dynamic") {
      applyTemplate(RESPONSE_TEMPLATES.dynamic.user);
    } else {
      applyTemplate(RESPONSE_TEMPLATES.static.success);
    }
  };

  const handleJsonChange = (value: string) => {
    // Clear error when user starts typing
    if (jsonError) {
      setJsonError(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Endpoint</DialogTitle>
          <DialogDescription>
            Define a new mock API endpoint with a custom response.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Method & Path */}
          <div className="flex gap-3">
            <div className="w-32">
              <Label>Method</Label>
              <Controller
                name="method"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {HTTP_METHODS.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.method && (
                <p className="text-sm text-destructive mt-1">
                  {errors.method.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <Label htmlFor="path">Path</Label>
              <Input
                id="path"
                placeholder="/users/:id"
                className="mt-1.5 font-mono"
                {...register("path")}
              />
              {errors.path && (
                <p className="text-sm text-destructive mt-1">
                  {errors.path.message}
                </p>
              )}
            </div>
          </div>

          {/* Status Code & Delay */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="statusCode">Status Code</Label>
              <Input
                id="statusCode"
                type="number"
                min={100}
                max={599}
                placeholder="200"
                className="mt-1.5"
                {...register("statusCode", { valueAsNumber: true })}
              />
              {errors.statusCode && (
                <p className="text-sm text-destructive mt-1">
                  {errors.statusCode.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="delayMs">Delay (ms)</Label>
              <Input
                id="delayMs"
                type="number"
                min={0}
                placeholder="0"
                className="mt-1.5"
                {...register("delayMs", { valueAsNumber: true })}
              />
              {errors.delayMs && (
                <p className="text-sm text-destructive mt-1">
                  {errors.delayMs.message}
                </p>
              )}
            </div>
          </div>

          {/* Response Type Toggle */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Response Type</Label>
              <div className="flex items-center gap-2">
                {/* JSON Validity Indicator */}
                <Badge
                  variant={currentIsValidJson ? "outline" : "destructive"}
                  className="text-xs"
                >
                  {currentIsValidJson ? "Valid JSON" : "Invalid JSON"}
                </Badge>
                {/* Dynamic/Static Badge */}
                <Badge
                  variant={currentHasDynamicTemplates ? "default" : "secondary"}
                  className="text-xs"
                >
                  {currentHasDynamicTemplates ? (
                    <>
                      <Sparkles className="w-3 h-3 mr-1" />
                      Dynamic
                    </>
                  ) : (
                    <>
                      <FileJson className="w-3 h-3 mr-1" />
                      Static
                    </>
                  )}
                </Badge>
              </div>
            </div>

            <Tabs
              value={responseMode}
              onValueChange={(v) => handleModeChange(v as "dynamic" | "static")}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="dynamic" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  Dynamic (Faker)
                </TabsTrigger>
                <TabsTrigger value="static" className="gap-2">
                  <FileJson className="w-4 h-4" />
                  Static JSON
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Mode Description */}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-sm">
              <Info className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
              {responseMode === "dynamic" ? (
                <p className="text-muted-foreground">
                  Use{" "}
                  <code className="px-1 py-0.5 rounded bg-muted text-foreground">
                    {"{{faker.method}}"}
                  </code>{" "}
                  templates to generate random data on each request.
                </p>
              ) : (
                <p className="text-muted-foreground">
                  Return the exact JSON you define. Perfect for config endpoints
                  or fixed responses.
                </p>
              )}
            </div>
          </div>

          {/* Quick Templates */}
          <div>
            <Label className="text-xs text-muted-foreground">
              Quick Templates
            </Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {responseMode === "dynamic" ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      applyTemplate(RESPONSE_TEMPLATES.dynamic.user)
                    }
                  >
                    User
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      applyTemplate(RESPONSE_TEMPLATES.dynamic.userList)
                    }
                  >
                    User List
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      applyTemplate(RESPONSE_TEMPLATES.dynamic.product)
                    }
                  >
                    Product
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      applyTemplate(RESPONSE_TEMPLATES.dynamic.post)
                    }
                  >
                    Blog Post
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      applyTemplate(RESPONSE_TEMPLATES.static.success)
                    }
                  >
                    Success
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      applyTemplate(RESPONSE_TEMPLATES.static.error)
                    }
                  >
                    Error
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      applyTemplate(RESPONSE_TEMPLATES.static.config)
                    }
                  >
                    Config
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      applyTemplate(RESPONSE_TEMPLATES.static.staticList)
                    }
                  >
                    Static List
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Response Schema Editor */}
          <div>
            <Label>Response Schema</Label>
            <Controller
              name="responseSchema"
              control={control}
              render={({ field }) => (
                <JsonEditor
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                    handleJsonChange(value);
                  }}
                  height="250px"
                  className={
                    !currentIsValidJson && currentSchema
                      ? "border-destructive"
                      : ""
                  }
                />
              )}
            />
            {/* Show validation errors */}
            {errors.responseSchema && (
              <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.responseSchema.message}
              </p>
            )}
            {/* Show JSON parsing errors */}
            {jsonError && (
              <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {jsonError}
              </p>
            )}
          </div>

          {/* Available Faker Methods (for dynamic mode) */}
          {responseMode === "dynamic" && (
            <details className="text-sm">
              <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                Available Faker Methods
              </summary>
              <div className="mt-2 p-3 rounded-lg bg-muted/50 grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-mono">
                <span>{"{{person.fullName}}"}</span>
                <span>{"{{person.firstName}}"}</span>
                <span>{"{{internet.email}}"}</span>
                <span>{"{{internet.url}}"}</span>
                <span>{"{{string.uuid}}"}</span>
                <span>{"{{number.int}}"}</span>
                <span>{"{{date.past}}"}</span>
                <span>{"{{date.recent}}"}</span>
                <span>{"{{image.avatar}}"}</span>
                <span>{"{{lorem.sentence}}"}</span>
                <span>{"{{commerce.productName}}"}</span>
                <span>{"{{commerce.price}}"}</span>
                <span>{"{{datatype.boolean}}"}</span>
                <span>{"{{params.id}}"}</span>
                <span>{"{{query.search}}"}</span>
                <span>{"{{body.name}}"}</span>
              </div>
            </details>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={createEndpoint.isPending}
              disabled={!currentIsValidJson}
            >
              Create Endpoint
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}