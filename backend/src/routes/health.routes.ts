import { Router } from "express";
import { catchAsync } from "@/utils/catchAsync";
import { prisma } from "@/config/database";

const router = Router();

router.get(
  "/",
  catchAsync(async (req, res) => {
    await prisma.$queryRaw`SELECT 1`; // Test DB connection
    res.status(200).json({
      success: true,
      data: {
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      },
    });
  }),
);

export default router;
