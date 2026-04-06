import { Router } from "express";
import { handleMockRequest } from "@/controllers/mock.controller";
import { apiKeyAuth } from "@/middlewares/apiKeyAuth.middleware";

const router = Router();

// All mock requests require API key authentication
router.use(apiKeyAuth);

// Catch-all route for mock APIs
// Matches: /mock/:projectId/*
router.all("/:projectId/*path", handleMockRequest);

// Handle root path: /mock/:projectId
router.all("/:projectId", handleMockRequest);

export default router;
