import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, getErrorMessage } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type {
  Project,
  CreateProjectPayload,
  UpdateProjectPayload,
} from "@/types";

export function useProjects() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // List Projects
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await api.get<{ success: boolean; data: Project[] }>(
        "/projects",
      );
      return response.data.data;
    },
  });

  // Get Single Project
  const useProject = (projectId: string) => {
    return useQuery({
      queryKey: ["projects", projectId],
      queryFn: async () => {
        const response = await api.get<{ success: boolean; data: Project }>(
          `/projects/${projectId}`,
        );
        return response.data.data;
      },
      enabled: !!projectId,
    });
  };

  // Create Project
  const createProject = useMutation({
    mutationFn: async (payload: CreateProjectPayload) => {
      const response = await api.post<{ success: boolean; data: Project }>(
        "/projects",
        payload,
      );
      return response.data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({
        variant: "success",
        title: "Project created!",
        description: `${data.name} has been created successfully.`,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to create project",
        description: getErrorMessage(error),
      });
    },
  });

  // Update Project
  const updateProject = useMutation({
    mutationFn: async ({
      projectId,
      payload,
    }: {
      projectId: string;
      payload: UpdateProjectPayload;
    }) => {
      const response = await api.patch<{ success: boolean; data: Project }>(
        `/projects/${projectId}`,
        payload,
      );
      return response.data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects", data.id] });
      toast({
        variant: "success",
        title: "Project updated!",
        description: `${data.name} has been updated successfully.`,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to update project",
        description: getErrorMessage(error),
      });
    },
  });

  // Delete Project
  const deleteProject = useMutation({
    mutationFn: async (projectId: string) => {
      await api.delete(`/projects/${projectId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({
        variant: "success",
        title: "Project deleted!",
        description: "The project has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to delete project",
        description: getErrorMessage(error),
      });
    },
  });

  return {
    projects,
    isLoading,
    useProject,
    createProject,
    updateProject,
    deleteProject,
  };
}
