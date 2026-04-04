import { Router } from "express";
import { handleMockRequest } from "@/controllers/mock.controller";

const router = Router();

// Catch-all route for mock APIs
// Matches: /mock/:projectId/*
router.all("/:projectId/*path", handleMockRequest);

// Handle root path: /mock/:projectId
router.all("/:projectId", handleMockRequest);

export default router;
