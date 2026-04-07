import { Request, Response } from "express";
import { catchAsync } from "@/utils/catchAsync";
import { ApiError } from "@/utils/ApiError";
import {
  getProjectAnalytics,
  getEndpointAnalytics,
} from "@/services/analytics.service";

const getUserId = (req: Request): string => {
  if (!req.user?.userId) {
    throw new ApiError(401, "Authentication required");
  }
  return req.user.userId;
};

const parseDate = (value: unknown): Date | undefined => {
  if (typeof value === "string") {
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }
  return undefined;
};

// ============================================================================
// Get Project Analytics
// ============================================================================
export const getAnalytics = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);
    const { projectId } = req.params as { projectId: string };

    const query = {
      startDate: parseDate(req.query.startDate),
      endDate: parseDate(req.query.endDate),
      groupBy: (req.query.groupBy as "hour" | "day" | "week") || "hour",
    };

    const analytics = await getProjectAnalytics(userId, projectId, query);

    res.json({
      success: true,
      data: analytics,
    });
  },
);

// ============================================================================
// Get Endpoint Analytics
// ============================================================================
export const getEndpointStats = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = getUserId(req);
    const { projectId, endpointId } = req.params as {
      projectId: string;
      endpointId: string;
    };

    const query = {
      startDate: parseDate(req.query.startDate),
      endDate: parseDate(req.query.endDate),
    };

    const analytics = await getEndpointAnalytics(
      userId,
      projectId,
      endpointId,
      query,
    );

    res.json({
      success: true,
      data: analytics,
    });
  },
);
