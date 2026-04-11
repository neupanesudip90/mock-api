import { Request, Response, NextFunction } from "express";
import * as endpointService from "@/services/endpoint.service";
import { ApiError } from "@/utils/ApiError";
import { catchAsync } from "@/utils/catchAsync";

const getUserId = (req: Request): string => {
  if (!req.user?.userId) {
    throw new ApiError(401, "Authentication required");
  }
  return req.user.userId;
};

export const createEndpoint = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);
    const { projectId } = req.params as {
      projectId: string;
      endpointId: string;
    };

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
  },
);

export const listEndpoints = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);
   const { projectId } = req.params as { projectId: string; endpointId: string };

    const result = await endpointService.listEndpoints(userId, projectId);

    res.json({
      success: true,
      data: result.endpoints,
      total: result.total,
    });
  },
);

export const getEndpoint = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);
   const { projectId, endpointId } = req.params as {
     projectId: string;
     endpointId: string;
   };

    const endpoint = await endpointService.getEndpoint(
      userId,
      projectId,
      endpointId,
    );

    res.json({
      success: true,
      data: endpoint,
    });
  },
);

export const updateEndpoint = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);
   const { projectId, endpointId } = req.params as {
     projectId: string;
     endpointId: string;
   };

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
  },
);

export const deleteEndpoint = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);
      const { projectId, endpointId } = req.params as {
        projectId: string;
        endpointId: string;
      };

    await endpointService.deleteEndpoint(userId, projectId, endpointId);

    res.status(204).send();
  },
);
