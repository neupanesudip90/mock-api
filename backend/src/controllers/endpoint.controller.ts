import { Request, Response, NextFunction } from "express";
import * as endpointService from "@/services/endpoint.service";
import { ApiError } from "@/utils/ApiError";

const getUserId = (req: Request): string => {
  if (!req.user?.userId) {
    throw new ApiError(401, "Authentication required");
  }
  return req.user.userId;
};

export const createEndpoint = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { projectId } = req.params;

    const endpoint = await endpointService.createEndpoint(
      userId,
      projectId,
      req.body,
    );

    res.status(201).json({
      success: true,
      data: endpoint,
      message: "Endpoint created successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const listEndpoints = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { projectId } = req.params;

    const result = await endpointService.listEndpoints(userId, projectId);

    res.json({
      success: true,
      data: result.endpoints,
      total: result.total,
    });
  } catch (err) {
    next(err);
  }
};

export const getEndpoint = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { projectId, endpointId } = req.params;

    const endpoint = await endpointService.getEndpoint(
      userId,
      projectId,
      endpointId,
    );

    res.json({
      success: true,
      data: endpoint,
    });
  } catch (err) {
    next(err);
  }
};

export const updateEndpoint = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { projectId, endpointId } = req.params;

    const endpoint = await endpointService.updateEndpoint(
      userId,
      projectId,
      endpointId,
      req.body,
    );

    res.json({
      success: true,
      data: endpoint,
      message: "Endpoint updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteEndpoint = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { projectId, endpointId } = req.params;

    await endpointService.deleteEndpoint(userId, projectId, endpointId);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
