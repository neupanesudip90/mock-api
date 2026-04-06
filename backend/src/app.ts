import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { errorMiddleware } from "@/middlewares/error.middleware";
import { logger } from "@/utils/logger";
import healthRoutes from "@/routes/health.routes";
import mockRoutes from "@/routes/mock.routes";
import authRoutes from "@/routes/auth.routes";
import cookieParser from "cookie-parser";
import projectRoutes from "./routes/project.routes";

const app = express();

// Security & Parsing
app.use(helmet());
app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true,
  }),
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging
app.use(
  morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } }),
);

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/mock", mockRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);



// 404 Handler
app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, error: { message: "Route not found" } });
});

// Error Handler
app.use(errorMiddleware);

export default app;
