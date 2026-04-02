import winston from "winston";
import { isDev } from "@/config/env";

const format = isDev
  ? winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}]: ${message}`;
      }),
    )
  : winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json(),
    );

export const logger = winston.createLogger({
  level: "info",
  format,
  transports: [new winston.transports.Console()],
});
