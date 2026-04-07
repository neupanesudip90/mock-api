import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { env } from "@/config/env";
import { logger } from "@/utils/logger";

let transporter: Transporter | null = null;

export const getEmailTransporter = async (): Promise<Transporter> => {
  if (transporter) {
    return transporter;
  }

  if (env.NODE_ENV === "production") {
    // Production: Use configured SMTP
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT) || 587,
      secure: env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });

    logger.info("Email transporter configured for production");
  } else if (env.SMTP_HOST) {
    // Development with custom SMTP (e.g., Mailtrap)
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT) || 587,
      secure: env.SMTP_SECURE === "true",
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });

    logger.info("Email transporter configured with custom SMTP");
  } else if (env.ETHEREAL_EMAIL && env.ETHEREAL_PASSWORD) {
    // Development with Ethereal
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: env.ETHEREAL_EMAIL,
        pass: env.ETHEREAL_PASSWORD,
      },
    });

    logger.info("Email transporter configured with Ethereal");
  } else {
    // Auto-create Ethereal account for testing
    const testAccount = await nodemailer.createTestAccount();

    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    logger.info(
      "Email transporter configured with auto-generated Ethereal account",
    );
    logger.info(`Ethereal email: ${testAccount.user}`);
    logger.info(`Ethereal password: ${testAccount.pass}`);
  }

  // Verify connection
  try {
    await transporter.verify();
    logger.info("Email transporter verified successfully");
  } catch (error) {
    logger.error("Email transporter verification failed:", error);
    throw error;
  }

  return transporter;
};

export const closeEmailTransporter = (): void => {
  if (transporter) {
    transporter.close();
    transporter = null;
    logger.info("Email transporter closed");
  }
};