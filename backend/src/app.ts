import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { errorMiddleware } from "@/middlewares/error.middleware";
import { logger } from "@/utils/logger";
import healthRoutes from "@/routes/health.routes";

const app = express();

// Security & Parsing
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(
  morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } }),
);

// Routes
app.use("/api/health", healthRoutes);

// 404 Handler
app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, error: { message: "Route not found" } });
});

// Error Handler
app.use(errorMiddleware);

export default app;
