import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, getErrorMessage } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type {
  Endpoint,
  CreateEndpointPayload,
  UpdateEndpointPayload,
} from "@/types";

export function useEndpoints(projectId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // List Endpoints
  const { data: endpoints, isLoading } = useQuery({
    queryKey: ["projects", projectId, "endpoints"],
    queryFn: async () => {
      const response = await api.get<{ success: boolean; data: Endpoint[] }>(
        `/projects/${projectId}/endpoints`,
      );
      return response.data.data;
    },
    enabled: !!projectId,
  });

  // Get Single Endpoint
  const useEndpoint = (endpointId: string) => {
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
  };

  // Create Endpoint
  const createEndpoint = useMutation({
    mutationFn: async (payload: CreateEndpointPayload) => {
      const response = await api.post<{ success: boolean; data: Endpoint }>(
        `/projects/${projectId}/endpoints`,
        {
          ...payload,
          responseSchema:
            typeof payload.responseSchema === "string"
              ? JSON.parse(payload.responseSchema)
              : payload.responseSchema,
        },
      );
      return response.data.data;
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
      const response = await api.patch<{ success: boolean; data: Endpoint }>(
        `/projects/${projectId}/endpoints/${endpointId}`,
        {
          ...payload,
          responseSchema:
            typeof payload.responseSchema === "string"
              ? JSON.parse(payload.responseSchema)
              : payload.responseSchema,
        },
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", projectId, "endpoints"],
      });
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
      await api.delete(`/projects/${projectId}/endpoints/${endpointId}`);
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
    endpoints,
    isLoading,
    useEndpoint,
    createEndpoint,
    updateEndpoint,
    deleteEndpoint,
  };
}
