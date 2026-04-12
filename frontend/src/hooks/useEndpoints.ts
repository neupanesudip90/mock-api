// hooks/useEndpoints.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import type { Endpoint } from "@/types";

// Types
export interface CreateEndpointPayload {
  path: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  statusCode: number;
  delayMs: number;
  responseSchema: any;
  rateLimitEnabled: boolean;
}

export interface UpdateEndpointPayload {
  path?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  statusCode?: number;
  delayMs?: number;
  responseSchema?: any;
  rateLimitEnabled?: boolean;
}

// Helper function to get error message
const getErrorMessage = (error: any): string => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.response?.data?.errors) {
    return error.response.data.errors
      .map((e: any) => `${e.field}: ${e.message}`)
      .join(", ");
  }
  if (error?.message) {
    return error.message;
  }
  return "An unexpected error occurred";
};

export function useEndpoints(projectId: string) {
  const queryClient = useQueryClient();

  const {
    data: endpoints,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["projects", projectId, "endpoints"],
    queryFn: async () => {
      const response = await api.get<{ success: boolean; data: Endpoint[] }>(
        `/projects/${projectId}/endpoints`,
      );
      return response.data.data;
    },
    enabled: !!projectId,
  });

  // Create Endpoint
  const createEndpoint = useMutation({
    mutationFn: async (payload: CreateEndpointPayload) => {
      console.log("=== CREATE ENDPOINT DEBUG ===");
      console.log("Original Payload:", JSON.stringify(payload, null, 2));

      const finalPayload = {
        ...payload,
        statusCode: Number(payload.statusCode),
        delayMs: Number(payload.delayMs),
        responseSchema:
          typeof payload.responseSchema === "string"
            ? JSON.parse(payload.responseSchema)
            : payload.responseSchema,
      };

      console.log("Final Payload:", JSON.stringify(finalPayload, null, 2));
      console.log("responseSchema type:", typeof finalPayload.responseSchema);
      console.log("statusCode type:", typeof finalPayload.statusCode);
      console.log("delayMs type:", typeof finalPayload.delayMs);

      try {
        const response = await api.post<{ success: boolean; data: Endpoint }>(
          `/projects/${projectId}/endpoints`,
          finalPayload,
        );
        return response.data.data;
      } catch (error: any) {

        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", projectId, "endpoints"],
      });
      queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
      toast({
        variant: "success",
        title: "Endpoint created!",
        description: "The endpoint has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to create endpoint",
        description: getErrorMessage(error),
      });
    },
  });

  // Update Endpoint
  const updateEndpoint = useMutation({
    mutationFn: async ({
      endpointId,
      payload,
    }: {
      endpointId: string;
      payload: UpdateEndpointPayload;
    }) => {
      console.log("=== UPDATE ENDPOINT DEBUG ===");
      console.log("Endpoint ID:", endpointId);
      console.log("Original Payload:", JSON.stringify(payload, null, 2));

      const finalPayload = {
        ...payload,
        statusCode:
          payload.statusCode !== undefined
            ? Number(payload.statusCode)
            : undefined,
        delayMs:
          payload.delayMs !== undefined ? Number(payload.delayMs) : undefined,
        responseSchema:
          payload.responseSchema !== undefined
            ? typeof payload.responseSchema === "string"
              ? JSON.parse(payload.responseSchema)
              : payload.responseSchema
            : undefined,
      };

      const cleanPayload = Object.fromEntries(
        Object.entries(finalPayload).filter(([_, v]) => v !== undefined),
      );

      console.log("Final Payload:", JSON.stringify(cleanPayload, null, 2));
      console.log("responseSchema type:", typeof cleanPayload.responseSchema);
      console.log("statusCode type:", typeof cleanPayload.statusCode);
      console.log("delayMs type:", typeof cleanPayload.delayMs);

      try {
        const response = await api.patch<{ success: boolean; data: Endpoint }>(
          `/projects/${projectId}/endpoints/${endpointId}`,
          cleanPayload,
        );
        return response.data.data;
      } catch (error: any) {
        console.error("=== BACKEND ERROR ===");
        console.error("Status:", error.response?.status);
        console.error(
          "Error Data:",
          JSON.stringify(error.response?.data, null, 2),
        );
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", projectId, "endpoints"],
      });
      queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
      toast({
        variant: "success",
        title: "Endpoint updated!",
        description: "The endpoint has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to update endpoint",
        description: getErrorMessage(error),
      });
    },
  });

  // Delete Endpoint
  const deleteEndpoint = useMutation({
    mutationFn: async (endpointId: string) => {
      console.log("=== DELETE ENDPOINT DEBUG ===");
      console.log("Endpoint ID:", endpointId);

      try {
        const response = await api.delete(
          `/projects/${projectId}/endpoints/${endpointId}`,
        );
        return response.data;
      } catch (error: any) {
        console.error("=== BACKEND ERROR ===");
        console.error("Status:", error.response?.status);
        console.error(
          "Error Data:",
          JSON.stringify(error.response?.data, null, 2),
        );
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", projectId, "endpoints"],
      });
      queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
      toast({
        variant: "success",
        title: "Endpoint deleted!",
        description: "The endpoint has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to delete endpoint",
        description: getErrorMessage(error),
      });
    },
  });

  return {
    endpoints, // Endpoint[] | undefined
    isLoading, // boolean
    createEndpoint, // MutationObject
    updateEndpoint, // MutationObject
    deleteEndpoint, // MutationObject
    isError, // boolean
    refetch, // function
    isFetching, // boolean
  };
}

// ============================================================================
// Separate hook for fetching a single endpoint
// ============================================================================
export function useEndpoint(projectId: string, endpointId: string) {
  return useQuery({
    queryKey: ["projects", projectId, "endpoints", endpointId],
    queryFn: async () => {
      const response = await api.get<{ success: boolean; data: Endpoint }>(
        `/projects/${projectId}/endpoints/${endpointId}`,
      );
      return response.data.data;
    },
    enabled: !!projectId && !!endpointId,
  });
}
