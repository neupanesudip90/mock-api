"use client";

import { useState, useEffect } from "react";
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
import { Sparkles, FileJson, Info } from "lucide-react";
import type { Endpoint } from "@/types";

interface EditEndpointDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  endpoint: Endpoint;
}


// Response Templates

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
    auth: `{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600,
  "user": {
    "id": 1,
    "role": "admin"
  }
}`,
  },
};


// Helper Functions

const hasDynamicTemplates = (value: string): boolean => {
  return /\{\{[^}]+\}\}/.test(value);
};

const detectInitialMode = (schema: any): "dynamic" | "static" => {
  const schemaStr = JSON.stringify(schema);
  return hasDynamicTemplates(schemaStr) ? "dynamic" : "static";
};

export function EditEndpointDialog({
  open,
  onOpenChange,
  projectId,
  endpoint,
}: EditEndpointDialogProps) {
  const { updateEndpoint } = useEndpoints(projectId);

  // Detect initial mode based on existing schema
  const initialSchema = JSON.stringify(endpoint.responseSchema, null, 2);
  const [responseMode, setResponseMode] = useState<"dynamic" | "static">(
    detectInitialMode(endpoint.responseSchema),
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(createEndpointSchema),
    defaultValues: {
      path: endpoint.path,
      method: endpoint.method as CreateEndpointFormData["method"],
      statusCode: endpoint.statusCode,
      delayMs: endpoint.delayMs ?? 0,
      responseSchema: initialSchema,
      rateLimitEnabled: endpoint.rateLimitEnabled ?? true,
    },
  });

  const currentSchema = watch("responseSchema");

  // Check if current schema has dynamic templates
  const currentHasDynamicTemplates = hasDynamicTemplates(currentSchema);

  // Reset form when endpoint changes
  useEffect(() => {
    if (open) {
      const schema = JSON.stringify(endpoint.responseSchema, null, 2);
      reset({
        path: endpoint.path,
        method: endpoint.method as CreateEndpointFormData["method"],
        statusCode: endpoint.statusCode,
        delayMs: endpoint.delayMs ?? 0,
        responseSchema: schema,
        rateLimitEnabled: endpoint.rateLimitEnabled ?? true,
      });
      setResponseMode(detectInitialMode(endpoint.responseSchema));
    }
  }, [endpoint, open, reset]);

  const onSubmit = async (data: CreateEndpointFormData) => {
    // Debug: Log form data
    console.log("Form data before submit:", data);
    console.log("Form errors:", errors);

    // Parse responseSchema string to JSON
    let parsedSchema;
    try {
      parsedSchema = JSON.parse(data.responseSchema);
    } catch (error) {
      console.error("JSON parse error:", error);
      return;
    }

    const payload = {
      path: data.path,
      method: data.method,
      statusCode: Number(data.statusCode), // Ensure number
      delayMs: Number(data.delayMs), // Ensure number
      responseSchema: parsedSchema,
      rateLimitEnabled: data.rateLimitEnabled,
    };

    // Debug: Log payload
    console.log("Payload to send:", JSON.stringify(payload, null, 2));

    updateEndpoint.mutate(
      {
        endpointId: endpoint.id,
        payload,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
        onError: (error) => {
          console.error("Update error:", error);
        },
      },
    );
  };

  const applyTemplate = (template: string) => {
    setValue("responseSchema", template, { shouldDirty: true });
  };

  const handleModeChange = (mode: "dynamic" | "static") => {
    setResponseMode(mode);
  };

  const handleApplyDefaultTemplate = () => {
    if (responseMode === "dynamic") {
      setValue("responseSchema", RESPONSE_TEMPLATES.dynamic.user, {
        shouldDirty: true,
      });
    } else {
      setValue("responseSchema", RESPONSE_TEMPLATES.static.success, {
        shouldDirty: true,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Edit Endpoint
            <Badge variant="outline" className="font-mono text-xs">
              {endpoint.method}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Update the endpoint configuration and response schema.
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
                  templates to generate random data.
                </p>
              ) : (
                <p className="text-muted-foreground">
                  Return the exact JSON you define. Perfect for fixed responses.
                </p>
              )}
            </div>
          </div>

          {/* Quick Templates */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs text-muted-foreground">
                Quick Templates
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-xs h-6"
                onClick={handleApplyDefaultTemplate}
              >
                Reset to Default
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
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
                      applyTemplate(RESPONSE_TEMPLATES.static.auth)
                    }
                  >
                    Auth Token
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
                  onChange={field.onChange}
                  height="250px"
                />
              )}
            />
            {errors.responseSchema && (
              <p className="text-sm text-destructive mt-1">
                {errors.responseSchema.message}
              </p>
            )}
          </div>

          {/* Available Faker Methods */}
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

          {/* Debug: Show all errors */}
          {Object.keys(errors).length > 0 && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              <p className="font-medium">Validation Errors:</p>
              <ul className="list-disc list-inside mt-1">
                {Object.entries(errors).map(([key, error]) => (
                  <li key={key}>
                    {key}: {error?.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={updateEndpoint.isPending}>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}