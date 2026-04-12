import * as Brevo from "@getbrevo/brevo";
import { env } from "@/config/env";
import { logger } from "@/utils/logger";

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  env.BREVO_API_KEY,
);

const FROM = { email: env.EMAIL_FROM, name: "MockAPI Gateway" };

export const sendVerificationEmail = async (
  email: string,
  name: string | null,
  otp: string,
): Promise<void> => {
  const displayName = name ?? email;

  const sendSmtpEmail = new Brevo.SendSmtpEmail();
  sendSmtpEmail.to = [{ email }];
  sendSmtpEmail.sender = FROM;
  sendSmtpEmail.subject = "Your verification code — MockAPI Gateway";
  sendSmtpEmail.htmlContent = `
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
  `;

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    logger.info(`Verification email sent to ${email}`);
  } catch (error) {
    logger.error(`Failed to send verification email: ${JSON.stringify(error)}`);
    throw new Error("Failed to send verification email");
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  name: string | null,
  otp: string,
): Promise<void> => {
  const displayName = name ?? email;

  const sendSmtpEmail = new Brevo.SendSmtpEmail();
  sendSmtpEmail.to = [{ email }];
  sendSmtpEmail.sender = FROM;
  sendSmtpEmail.subject = "Your password reset code — MockAPI Gateway";
  sendSmtpEmail.htmlContent = `
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
  `;

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    logger.info(`Password reset email sent to ${email}`);
  } catch (error) {
    logger.error(
      `Failed to send password reset email: ${JSON.stringify(error)}`,
    );
    throw new Error("Failed to send password reset email");
  }
};

export const sendPasswordChangedEmail = async (
  email: string,
  name: string | null,
): Promise<void> => {
  const displayName = name ?? email;

  const sendSmtpEmail = new Brevo.SendSmtpEmail();
  sendSmtpEmail.to = [{ email }];
  sendSmtpEmail.sender = FROM;
  sendSmtpEmail.subject = "Your password was changed — MockAPI Gateway";
  sendSmtpEmail.htmlContent = `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      <h2>Hi ${displayName},</h2>
      <p>Your password was successfully changed.</p>
      <p>If you did not make this change, please reset your password immediately 
         and contact support.</p>
    </div>
  `;

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    logger.info(`Password changed email sent to ${email}`);
  } catch (error) {
    logger.error(
      `Failed to send password changed email: ${JSON.stringify(error)}`,
    );
    throw new Error("Failed to send password changed email");
  }
};
