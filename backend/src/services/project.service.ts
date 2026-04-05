import { prisma } from "@/config/database";
import { ApiError } from "@/utils/ApiError";
import type {
  CreateProjectInput,
  UpdateProjectInput,
  ProjectResponse,
  PaginatedProjectsResponse,
} from "@/types/project.types";
import { Prisma } from "@/generated/client";
import {ListProjectsQuery} from "../validators/project.validator"

// ============================================================================
// Helpers
// ============================================================================
const formatProject = (
  project: any,
  endpointCount: number = 0,
  apiKeyCount: number = 0,
): ProjectResponse => ({
  id: project.id,
  name: project.name,
  description: project.description,
  status: project.status,
  defaultRateLimitMax: project.defaultRateLimitMax,
  defaultRateLimitWindow: project.defaultRateLimitWindow,
  defaultRateLimitStrategy: project.defaultRateLimitStrategy,
  endpointCount,
  apiKeyCount,
  createdAt: project.createdAt,
  updatedAt: project.updatedAt,
});

// ============================================================================
// Create Project
// ============================================================================
export const createProject = async (
  userId: string,
  input: CreateProjectInput,
): Promise<ProjectResponse> => {
  const project = await prisma.project.create({
    data: {
      userId,
      name: input.name,
      description: input.description ?? null,
      defaultRateLimitMax: input.defaultRateLimitMax ?? 1000,
      defaultRateLimitWindow: input.defaultRateLimitWindow ?? 60,
      defaultRateLimitStrategy:
        input.defaultRateLimitStrategy ?? "FIXED_WINDOW",
    },
  });

  return formatProject(project, 0, 0);
};

// ============================================================================
// List Projects (with pagination, filtering, sorting)
// ============================================================================
export const listProjects = async (
  userId: string,
  query: ListProjectsQuery,
): Promise<PaginatedProjectsResponse> => {
  const {
    status,
    search,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  // Build where clause
  const where: Prisma.ProjectWhereInput = {
    userId,
    ...(status && { status }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  // Get total count
  const total = await prisma.project.count({ where });

  // Get paginated results
  const projects = await prisma.project.findMany({
    where,
    include: {
      _count: {
        select: {
          endpoints: true,
          apiKeys: true,
        },
      },
    },
    orderBy: { [sortBy]: sortOrder },
    skip: (page - 1) * limit,
    take: limit,
  });

  return {
    projects: projects.map((p) =>
      formatProject(p, p._count.endpoints, p._count.apiKeys),
    ),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// ============================================================================
// Get Single Project
// ============================================================================
export const getProject = async (
  userId: string,
  projectId: string,
): Promise<ProjectResponse> => {
  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
    include: {
      _count: {
        select: {
          endpoints: true,
          apiKeys: true,
        },
      },
    },
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return formatProject(
    project,
    project._count.endpoints,
    project._count.apiKeys,
  );
};

// ============================================================================
// Update Project
// ============================================================================
export const updateProject = async (
  userId: string,
  projectId: string,
  input: UpdateProjectInput,
): Promise<ProjectResponse> => {
  // Check project exists and belongs to user
  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  // Check name uniqueness if changing name
  if (input.name && input.name !== project.name) {
    const duplicate = await prisma.project.findFirst({
      where: {
        userId,
        name: input.name,
        id: { not: projectId },
      },
    });

    if (duplicate) {
      throw new ApiError(409, "A project with this name already exists");
    }
  }

  // Update project
  const updated = await prisma.project.update({
    where: { id: projectId },
    data: {
      ...(input.name !== undefined && { name: input.name }),
      ...(input.description !== undefined && {
        description: input.description,
      }),
      ...(input.status !== undefined && { status: input.status }),
      ...(input.defaultRateLimitMax !== undefined && {
        defaultRateLimitMax: input.defaultRateLimitMax,
      }),
      ...(input.defaultRateLimitWindow !== undefined && {
        defaultRateLimitWindow: input.defaultRateLimitWindow,
      }),
      ...(input.defaultRateLimitStrategy !== undefined && {
        defaultRateLimitStrategy: input.defaultRateLimitStrategy,
      }),
    },
    include: {
      _count: {
        select: {
          endpoints: true,
          apiKeys: true,
        },
      },
    },
  });

  return formatProject(
    updated,
    updated._count.endpoints,
    updated._count.apiKeys,
  );
};

// ============================================================================
// Delete Project
// ============================================================================
export const deleteProject = async (
  userId: string,
  projectId: string,
): Promise<void> => {
  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  // Cascade delete will remove endpoints, api keys, and logs
  await prisma.project.delete({
    where: { id: projectId },
  });
};

// ============================================================================
// Verify Project Ownership (helper for other services)
// ============================================================================
export const verifyProjectOwnership = async (
  userId: string,
  projectId: string,
): Promise<void> => {
  const project = await prisma.project.findFirst({
    where: { id: projectId, userId },
    select: { id: true },
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }
};
