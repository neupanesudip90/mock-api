import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { logger } from "@/utils/logger";
import { errorMiddleware } from "@/middlewares/error.middleware";

import healthRoutes from "@/routes/health.routes";
import authRoutes from "@/routes/auth.routes";
import projectRoutes from "@/routes/project.routes";
import mockRoutes from "@/routes/mock.routes";

const app = express();


// Security
app.use(helmet());

app.use(
  cors({
    origin: process.env.APP_URL || true,
    credentials: true,
  }),
);


// Body Parsers
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());


// Logging
app.use(
  morgan("combined", {
    stream: {
      write: (msg) => logger.info(msg.trim()),
    },
  }),
);


// Routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/mock", mockRoutes);


// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: "Route not found",
    },
  });
});


// Global Error Handler
app.use(errorMiddleware);

export default app;
