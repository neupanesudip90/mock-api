import { env } from "@/config/env";
import { logger } from "@/utils/logger";

// ============================================================================
// Base Brevo API call
// ============================================================================
console.log("Using Brevo API Key:", env.BREVO_API_KEY)
const sendEmail = async (data: any): Promise<void> => {
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": env.BREVO_API_KEY,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }
  } catch (error) {
    logger.error(`Brevo API Error: ${error}`);
    throw new Error("Failed to send email");
  }
};

const FROM = {
  email: env.EMAIL_FROM,
  name: "MockAPI Gateway",
};

// ============================================================================
// Send Verification Email
// ============================================================================
export const sendVerificationEmail = async (
  email: string,
  name: string | null,
  otp: string,
): Promise<void> => {
  const displayName = name ?? email;

  await sendEmail({
    sender: FROM,
    to: [{ email }],
    subject: "Your verification code — MockAPI Gateway",
    htmlContent: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
        <h2>Hi ${displayName},</h2>
        <p>Your email verification code is:</p>
        <div style="background:#f4f4f4;padding:24px;border-radius:8px;
                    font-size:36px;font-weight:bold;letter-spacing:8px;
                    text-align:center;margin:24px 0;">
          ${otp}
        </div>
        <p style="color:#888;font-size:13px;">
          This code expires in 10 minutes. 
          If you didn't create an account, ignore this email.
        </p>
      </div>
    `,
  });

  logger.info(`Verification email sent to ${email}`);
};

// ============================================================================
// Send Password Reset Email
// ============================================================================
export const sendPasswordResetEmail = async (
  email: string,
  name: string | null,
  otp: string,
): Promise<void> => {
  const displayName = name ?? email;

  await sendEmail({
    sender: FROM,
    to: [{ email }],
    subject: "Your password reset code — MockAPI Gateway",
    htmlContent: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
        <h2>Hi ${displayName},</h2>
        <p>Your password reset code is:</p>
        <div style="background:#f4f4f4;padding:24px;border-radius:8px;
                    font-size:36px;font-weight:bold;letter-spacing:8px;
                    text-align:center;margin:24px 0;">
          ${otp}
        </div>
        <p style="color:#888;font-size:13px;">
          This code expires in 10 minutes.
          If you didn't request this, secure your account immediately.
        </p>
      </div>
    `,
  });

  logger.info(`Password reset email sent to ${email}`);
};

// ============================================================================
// Send Password Changed Email
// ============================================================================
export const sendPasswordChangedEmail = async (
  email: string,
  name: string | null,
): Promise<void> => {
  const displayName = name ?? email;

  await sendEmail({
    sender: FROM,
    to: [{ email }],
    subject: "Your password was changed — MockAPI Gateway",
    htmlContent: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
        <h2>Hi ${displayName},</h2>
        <p>Your password was successfully changed.</p>
        <p>If you did not make this change, please reset your password immediately 
           and contact support.</p>
      </div>
    `,
  });

  logger.info(`Password changed email sent to ${email}`);
};
