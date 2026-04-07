"use client";

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
import { HTTP_METHODS } from "@/lib/utils";
import { JsonEditor } from "@/components/shared/JsonEditor";

interface CreateEndpointDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
}

const defaultResponseSchema = `{
  "id": "{{params.id}}",
  "name": "{{person.fullName}}",
  "email": "{{internet.email}}",
  "avatar": "{{image.avatar}}",
  "createdAt": "{{date.past}}"
}`;

export function CreateEndpointDialog({
  open,
  onOpenChange,
  projectId,
}: CreateEndpointDialogProps) {
  const { createEndpoint } = useEndpoints(projectId);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateEndpointFormData>({
    resolver: zodResolver(createEndpointSchema),
    defaultValues: {
      path: "/",
      method: "GET",
      statusCode: 200,
      delayMs: 0,
      responseSchema: defaultResponseSchema,
      rateLimitEnabled: true,
    },
  });

  const onSubmit = async (data: CreateEndpointFormData) => {
    createEndpoint.mutate(
      {
        path: data.path,
        method: data.method,
        statusCode: data.statusCode,
        delayMs: data.delayMs,
        responseSchema: JSON.parse(data.responseSchema),
        rateLimitEnabled: data.rateLimitEnabled,
      },
      {
        onSuccess: () => {
          reset();
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Endpoint</DialogTitle>
          <DialogDescription>
            Define a new mock API endpoint with a custom response schema.
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
                placeholder="200"
                className="mt-1.5"
                {...register("statusCode")}
              />
            </div>
            <div>
              <Label htmlFor="delayMs">Delay (ms)</Label>
              <Input
                id="delayMs"
                type="number"
                placeholder="0"
                className="mt-1.5"
                {...register("delayMs")}
              />
            </div>
          </div>

          {/* Response Schema */}
          <div>
            <Label>Response Schema (JSON)</Label>
            <p className="text-xs text-muted-foreground mt-1 mb-2">
              Use Faker.js templates like {"{{person.fullName}}"} or{" "}
              {"{{params.id}}"} for dynamic data.
            </p>
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

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={createEndpoint.isPending}>
              Create Endpoint
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
