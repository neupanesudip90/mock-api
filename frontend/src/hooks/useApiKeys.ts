import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, getErrorMessage } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { ApiKey, ApiKeyWithSecret, CreateApiKeyPayload } from "@/types";

export function useApiKeys(projectId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // List API Keys
  const { data: apiKeys, isLoading } = useQuery({
    queryKey: ["projects", projectId, "api-keys"],
    queryFn: async () => {
      const response = await api.get<{
        success: boolean;
        data: { apiKeys: ApiKey[]; total: number };
      }>(`/projects/${projectId}/api-keys`);
      return response.data.data.apiKeys;
    },
    enabled: !!projectId,
  });

  // Create API Key
  const createApiKey = useMutation({
    mutationFn: async (payload: CreateApiKeyPayload) => {
      const response = await api.post<{
        success: boolean;
        data: ApiKeyWithSecret;
      }>(`/projects/${projectId}/api-keys`, payload);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", projectId, "api-keys"],
      });
      queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to create API key",
        description: getErrorMessage(error),
      });
    },
  });

  // Revoke API Key
  const revokeApiKey = useMutation({
    mutationFn: async (keyId: string) => {
      await api.delete(`/projects/${projectId}/api-keys/${keyId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", projectId, "api-keys"],
      });
      queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
      toast({
        variant: "success",
        title: "API key revoked!",
        description: "The API key has been revoked successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to revoke API key",
        description: getErrorMessage(error),
      });
    },
  });

  // Rotate API Key
  const rotateApiKey = useMutation({
    mutationFn: async (keyId: string) => {
      const response = await api.post<{
        success: boolean;
        data: ApiKeyWithSecret;
      }>(`/projects/${projectId}/api-keys/${keyId}/rotate`);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", projectId, "api-keys"],
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to rotate API key",
        description: getErrorMessage(error),
      });
    },
  });

  return {
    apiKeys,
    isLoading,
    createApiKey,
    revokeApiKey,
    rotateApiKey,
  };
}
