import nodemailer, { Transporter } from "nodemailer";
import { env } from "@/config/env";

let transporter: Transporter;

export const getEmailTransporter = (): Transporter => {
  if (transporter) return transporter;

  // In development: use Ethereal (fake SMTP — emails are captured, not sent)
  // In production: use real SMTP credentials from env
  if (env.NODE_ENV === "development") {
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: env.ETHEREAL_EMAIL, // generate at ethereal.email
        pass: env.ETHEREAL_PASSWORD,
      },
    });
  } else {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT),
      secure: env.SMTP_PORT === "465", // true for 465, false for 587
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  }

  return transporter;
};
