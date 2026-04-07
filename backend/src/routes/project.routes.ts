import { Router } from "express";
import * as projectController from "@/controllers/project.controller";
import { requireAuth } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validate.middleware";
import {
  createProjectSchema,
  updateProjectSchema,
  projectIdSchema,
  listProjectsSchema,
} from "@/validators/project.validator";
import apiKeyRoutes from "@/routes/apiKey.routes";
import endpointRoutes from "@/routes/endpoint.routes";
import analyticsRoutes from "@/routes/analytics.routes";


const router = Router();

// All routes require authentication
router.use(requireAuth);

// ============================================================================
// Project CRUD
// ============================================================================
router.post(
  "/",
  validate(createProjectSchema),
  projectController.createProject,
);

router.get("/", validate(listProjectsSchema), projectController.listProjects);

router.get(
  "/:projectId",
  validate(projectIdSchema),
  projectController.getProject,
);

router.patch(
  "/:projectId",
  validate(updateProjectSchema),
  projectController.updateProject,
);

router.delete(
  "/:projectId",
  validate(projectIdSchema),
  projectController.deleteProject,
);

// ============================================================================
// Mount API Key routes under /projects/:projectId/api-keys
// ============================================================================
router.use("/:projectId/api-keys", apiKeyRoutes);

router.use("/:projectId/endpoints", endpointRoutes);
router.use("/:projectId/analytics", analyticsRoutes);


export default router;
