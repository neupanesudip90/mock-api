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
import type { Endpoint } from "@/types";

interface EditEndpointDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  endpoint: Endpoint;
}

export function EditEndpointDialog({
  open,
  onOpenChange,
  projectId,
  endpoint,
}: EditEndpointDialogProps) {
  const { updateEndpoint } = useEndpoints(projectId);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateEndpointFormData>({
    resolver: zodResolver(createEndpointSchema),
    defaultValues: {
      path: endpoint.path,
      method: endpoint.method,
      statusCode: endpoint.statusCode,
      delayMs: endpoint.delayMs,
      responseSchema: JSON.stringify(endpoint.responseSchema, null, 2),
      rateLimitEnabled: endpoint.rateLimitEnabled,
    },
  });

  const onSubmit = async (data: CreateEndpointFormData) => {
    updateEndpoint.mutate(
      {
        endpointId: endpoint.id,
        payload: {
          path: data.path,
          method: data.method,
          statusCode: data.statusCode,
          delayMs: data.delayMs,
          responseSchema: JSON.parse(data.responseSchema),
          rateLimitEnabled: data.rateLimitEnabled,
        },
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Endpoint</DialogTitle>
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
                className="mt-1.5"
                {...register("statusCode")}
              />
            </div>
            <div>
              <Label htmlFor="delayMs">Delay (ms)</Label>
              <Input
                id="delayMs"
                type="number"
                className="mt-1.5"
                {...register("delayMs")}
              />
            </div>
          </div>

          {/* Response Schema */}
          <div>
            <Label>Response Schema (JSON)</Label>
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
            <Button type="submit" isLoading={updateEndpoint.isPending}>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
