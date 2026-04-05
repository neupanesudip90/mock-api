import { Request, Response, NextFunction } from "express";
import * as projectService from "@/services/project.service";
import type { ListProjectsQuery } from "@/validators/project.validator";
import { ApiError } from "@/utils/ApiError";

// ============================================================================
// Helper: Get User ID
// ============================================================================
const getUserId = (req: Request): string => {
  if (!req.user?.userId) {
    throw new ApiError(401, "Authentication required");
  }
  return req.user.userId;
};

// ============================================================================
// Create Project
// ============================================================================
export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const project = await projectService.createProject(userId, req.body);
    res.status(201).json({
      success: true,
      data: project,
      message:
        "Project created successfully. Create an API key to access endpoints.",
    });
  } catch (err) {
    next(err);
  }
};

// ============================================================================
// List Projects
export const listProjects = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = getUserId(req);

    // Read from validatedQuery instead of req.query
    const query = ((req as any).validatedQuery ??
      req.query) as ListProjectsQuery;

    const result = await projectService.listProjects(userId, query);
    res.json({
      success: true,
      data: result.projects,
      pagination: result.pagination,
    });
  } catch (err) {
    next(err);
  }
};

// ============================================================================
// Get Project
// ============================================================================
export const getProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = getUserId(req);
   const { projectId } = req.params as { projectId: string };
    const project = await projectService.getProject(userId, projectId);
    res.json({
      success: true,
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

// ============================================================================
// Update Project
// ============================================================================
export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { projectId } = req.params as { projectId: string };
    const project = await projectService.updateProject(
      userId,
      projectId,
      req.body,
    );
    res.json({
      success: true,
      data: project,
      message: "Project updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

// ============================================================================
// Delete Project
// ============================================================================
export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = getUserId(req);
   const { projectId } = req.params as { projectId: string }
    await projectService.deleteProject(userId, projectId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
