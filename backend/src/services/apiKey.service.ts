import { prisma } from "@/config/database";
import { ApiError } from "@/utils/ApiError";
import { generateApiKey, verifyApiKey } from "@/utils/apiKey.utils";
import { verifyProjectOwnership } from "@/services/project.service";
import type {
  CreateApiKeyInput,
  UpdateApiKeyInput,
  ApiKeyResponse,
  ApiKeyWithSecret,
  ApiKeyListResponse,
  ValidatedApiKey,
} from "@/types/apiKey.types";


// Constants

const MAX_API_KEYS_PER_PROJECT = 10;


// Helpers

const formatApiKey = (key: any): ApiKeyResponse => ({
  id: key.id,
  projectId: key.projectId,
  name: key.name,
  keyPrefix: key.keyPrefix,
  isActive: key.isActive,
  lastUsedAt: key.lastUsedAt,
  createdAt: key.createdAt,
  updatedAt: key.updatedAt,
});


// Create API Key
export const createApiKey = async (
  userId: string,
  projectId: string,
  input: CreateApiKeyInput,
): Promise<ApiKeyWithSecret> => {
  // Verify project ownership
  await verifyProjectOwnership(userId, projectId);

  // Check API key limit
  const existingCount = await prisma.apiKey.count({
    where: { projectId },
  });

  if (existingCount >= MAX_API_KEYS_PER_PROJECT) {
    throw new ApiError(
      400,
      `Maximum of ${MAX_API_KEYS_PER_PROJECT} API keys per project`,
    );
  }

  // Check for duplicate name within project
  const duplicateName = await prisma.apiKey.findFirst({
    where: { projectId, name: input.name },
  });

  if (duplicateName) {
    throw new ApiError(409, "An API key with this name already exists");
  }

  // Generate new API key
  const { plainKey, keyHash, keyPrefix } = generateApiKey();

  // Create API key record
  const apiKey = await prisma.apiKey.create({
    data: {
      projectId,
      name: input.name,
      keyHash,
      keyPrefix,
    },
  });

  return {
    ...formatApiKey(apiKey),
    plainKey, // Only returned on creation
  };
};


// List API Keys
export const listApiKeys = async (
  userId: string,
  projectId: string,
  includeInactive: boolean = false,
): Promise<ApiKeyListResponse> => {
  // Verify project ownership
  await verifyProjectOwnership(userId, projectId);

  const where = {
    projectId,
    ...(includeInactive ? {} : { isActive: true }),
  };

  const apiKeys = await prisma.apiKey.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return {
    apiKeys: apiKeys.map(formatApiKey),
    total: apiKeys.length,
  };
};


// Get Single API Key
export const getApiKey = async (
  userId: string,
  projectId: string,
  keyId: string,
): Promise<ApiKeyResponse> => {
  // Verify project ownership
  await verifyProjectOwnership(userId, projectId);

  const apiKey = await prisma.apiKey.findFirst({
    where: { id: keyId, projectId },
  });

  if (!apiKey) {
    throw new ApiError(404, "API key not found");
  }

  return formatApiKey(apiKey);
};


// Update API Key
export const updateApiKey = async (
  userId: string,
  projectId: string,
  keyId: string,
  input: UpdateApiKeyInput,
): Promise<ApiKeyResponse> => {
  // Verify project ownership
  await verifyProjectOwnership(userId, projectId);

  // Check key exists
  const apiKey = await prisma.apiKey.findFirst({
    where: { id: keyId, projectId },
  });

  if (!apiKey) {
    throw new ApiError(404, "API key not found");
  }

  // Check name uniqueness if changing name
  if (input.name && input.name !== apiKey.name) {
    const duplicate = await prisma.apiKey.findFirst({
      where: {
        projectId,
        name: input.name,
        id: { not: keyId },
      },
    });

    if (duplicate) {
      throw new ApiError(409, "An API key with this name already exists");
    }
  }

  // Update key
  const updated = await prisma.apiKey.update({
    where: { id: keyId },
    data: {
      ...(input.name !== undefined && { name: input.name }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
    },
  });

  return formatApiKey(updated);
};


// Revoke (Delete) API Key
export const revokeApiKey = async (
  userId: string,
  projectId: string,
  keyId: string,
): Promise<void> => {
  // Verify project ownership
  await verifyProjectOwnership(userId, projectId);

  const apiKey = await prisma.apiKey.findFirst({
    where: { id: keyId, projectId },
  });

  if (!apiKey) {
    throw new ApiError(404, "API key not found");
  }

  await prisma.apiKey.delete({
    where: { id: keyId },
  });
};


// Rotate API Key (Delete old + Create new with same name)
export const rotateApiKey = async (
  userId: string,
  projectId: string,
  keyId: string,
): Promise<ApiKeyWithSecret> => {
  // Verify project ownership
  await verifyProjectOwnership(userId, projectId);

  const oldKey = await prisma.apiKey.findFirst({
    where: { id: keyId, projectId },
  });

  if (!oldKey) {
    throw new ApiError(404, "API key not found");
  }

  // Generate new key
  const { plainKey, keyHash, keyPrefix } = generateApiKey();

  // Delete old, create new in transaction
  const newKey = await prisma.$transaction(async (tx) => {
    await tx.apiKey.delete({
      where: { id: keyId },
    });

    return tx.apiKey.create({
      data: {
        projectId,
        name: oldKey.name, // Keep same name
        keyHash,
        keyPrefix,
      },
    });
  });

  return {
    ...formatApiKey(newKey),
    plainKey,
  };
};


// Validate API Key (for public endpoint access)
export const validateApiKey = async (
  plainKey: string,
): Promise<ValidatedApiKey | null> => {
  if (!plainKey || plainKey.length < 12) {
    return null;
  }

  const keyPrefix = plainKey.slice(0, 12);

  // Find candidates by prefix
  const candidates = await prisma.apiKey.findMany({
    where: {
      keyPrefix,
      isActive: true,
      project: {
        status: "ACTIVE", // Only active projects
      },
    },
    include: {
      project: {
        select: { id: true, status: true },
      },
    },
  });

  // Verify full key against hash
  for (const key of candidates) {
    if (await verifyApiKey(plainKey, key.keyHash)) {
      // Update lastUsedAt (non-blocking)
      prisma.apiKey
        .update({
          where: { id: key.id },
          data: { lastUsedAt: new Date() },
        })
        .catch(() => {}); // Ignore errors

      return {
        keyId: key.id,
        projectId: key.projectId,
        name: key.name,
      };
    }
  }

  return null;
};
