// backend/src/utils/sendEmail.ts
import nodemailer from "nodemailer";

interface ContactEmailParams {
  name: string;
  email: string;
  message: string;
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;
  if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS) {
    return null; // email not configured - caller should handle gracefully
  }

  transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT) || 587,
    secure: Number(EMAIL_PORT) === 465,
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });

  return transporter;
}

export async function sendContactEmail({ name, email, message }: ContactEmailParams) {
  const t = getTransporter();
  const receiver = process.env.CONTACT_RECEIVER || process.env.EMAIL_USER;

  if (!t || !receiver) {
    throw new Error(
      "Email is not configured. Set EMAIL_HOST, EMAIL_USER, EMAIL_PASS, and CONTACT_RECEIVER in .env"
    );
  }

  await t.sendMail({
    from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
    to: receiver,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
}
