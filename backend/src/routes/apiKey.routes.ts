import { Router } from "express";
import * as apiKeyController from "@/controllers/apiKey.controller";
import { validate } from "@/middlewares/validate.middleware";
import {
  createApiKeySchema,
  updateApiKeySchema,
  listApiKeysSchema,
  apiKeyParamsSchema,
} from "@/validators/apiKey.validator";

// mergeParams allows access to :projectId from parent router
const router = Router({ mergeParams: true });

// ============================================================================
// API Key CRUD (authentication inherited from parent router)
// ============================================================================
router.post("/", validate(createApiKeySchema), apiKeyController.createApiKey);

router.get("/", validate(listApiKeysSchema), apiKeyController.listApiKeys);

router.get("/:keyId", validate(apiKeyParamsSchema), apiKeyController.getApiKey);

router.patch(
  "/:keyId",
  validate(updateApiKeySchema),
  apiKeyController.updateApiKey,
);

router.delete(
  "/:keyId",
  validate(apiKeyParamsSchema),
  apiKeyController.revokeApiKey,
);

// ============================================================================
// Rotate API Key
// ============================================================================
router.post(
  "/:keyId/rotate",
  validate(apiKeyParamsSchema),
  apiKeyController.rotateApiKey,
);

export default router;
