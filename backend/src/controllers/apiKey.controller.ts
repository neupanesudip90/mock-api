import { Request, Response, NextFunction } from "express";
import * as apiKeyService from "@/services/apiKey.service";
import { ApiError } from "@/utils/ApiError";

const getUserId = (req: Request): string => {
  if (!req.user?.userId) throw new ApiError(401, "Authentication required");
  return req.user.userId;
};

export const createApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { projectId } = req.params as { projectId: string };
    const result = await apiKeyService.createApiKey(
      userId,
      projectId,
      req.body,
    );
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const listApiKeys = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { projectId } = req.params as { projectId: string };
    const includeInactive = req.query.includeInactive === "true";
    const result = await apiKeyService.listApiKeys(
      userId,
      projectId,
      includeInactive,
    );
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const getApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { projectId, keyId } = req.params as {
      projectId: string;
      keyId: string;
    };
    const result = await apiKeyService.getApiKey(userId, projectId, keyId);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const updateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { projectId, keyId } = req.params as {
      projectId: string;
      keyId: string;
    };
    const result = await apiKeyService.updateApiKey(
      userId,
      projectId,
      keyId,
      req.body,
    );
    res.json({
      success: true,
      data: result,
      message: "API key updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const revokeApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { projectId, keyId } = req.params as {
      projectId: string;
      keyId: string;
    };
    await apiKeyService.revokeApiKey(userId, projectId, keyId);
    res.json({ success: true, message: "API key revoked successfully" });
  } catch (err) {
    next(err);
  }
};

export const rotateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { projectId, keyId } = req.params as {
      projectId: string;
      keyId: string;
    };
    const result = await apiKeyService.rotateApiKey(userId, projectId, keyId);
    res.status(201).json({
      success: true,
      data: result,
      message: "API key rotated. Save the new key — it won't be shown again.",
    });
  } catch (err) {
    next(err);
  }
};
