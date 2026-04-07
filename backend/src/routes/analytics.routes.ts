import { Router } from "express";
import * as analyticsController from "@/controllers/analytics.controller";

const router = Router({ mergeParams: true });

// GET /api/projects/:projectId/analytics
router.get("/", analyticsController.getAnalytics);

// GET /api/projects/:projectId/analytics/endpoints/:endpointId
router.get("/endpoints/:endpointId", analyticsController.getEndpointStats);

export default router;
