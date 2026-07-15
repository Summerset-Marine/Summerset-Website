import nodemailer from "nodemailer";
import { google } from "googleapis";

function getGmailEnv() {
  return {
    clientId: process.env["GMAIL_CLIENT_ID"],
    clientSecret: process.env["GMAIL_CLIENT_SECRET"],
    refreshToken: process.env["GMAIL_REFRESH_TOKEN"],
    sender: process.env["GMAIL_SENDER_ADDRESS"],
    recipient: process.env["FORM_RECIPIENT_EMAIL"],
  };
}

export function isGmailConfigured(): boolean {
  const { clientId, clientSecret, refreshToken, sender, recipient } = getGmailEnv();
  return Boolean(clientId && clientSecret && refreshToken && sender && recipient);
}

export interface FormEmail {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

export async function sendFormEmail(email: FormEmail): Promise<void> {
  const { clientId, clientSecret, refreshToken, sender, recipient } = getGmailEnv();
  if (!clientId || !clientSecret || !refreshToken || !sender || !recipient) {
    throw new Error(
      "Gmail OAuth2 is not configured. Set GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN, GMAIL_SENDER_ADDRESS, and FORM_RECIPIENT_EMAIL.",
    );
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  const accessTokenResponse = await oauth2Client.getAccessToken();
  const accessToken = accessTokenResponse.token;
  if (!accessToken) {
    throw new Error("Failed to obtain Gmail access token from refresh token.");
  }

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: sender,
      clientId,
      clientSecret,
      refreshToken,
      accessToken,
    },
  });

  const mail: nodemailer.SendMailOptions = {
    from: `Summerset Marine Website <${sender}>`,
    to: recipient,
    subject: email.subject,
    text: email.text,
  };
  if (email.html) mail.html = email.html;
  if (email.replyTo) mail.replyTo = email.replyTo;

  await transport.sendMail(mail);
}
