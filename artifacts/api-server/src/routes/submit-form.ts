import { Router, type IRouter } from "express";
import { isGmailConfigured, sendFormEmail } from "../lib/gmail";

const router: IRouter = Router();

/**
 * POST /api/submit-form
 * Receives website form submissions (consultation, contact, service request)
 * and relays them via Gmail OAuth2. Returns 503 until Gmail is configured.
 */
router.post("/submit-form", async (req, res) => {
  const body = (req.body ?? {}) as Record<string, unknown>;
  const formType = typeof body["formType"] === "string" ? body["formType"] : "contact";
  const name = typeof body["name"] === "string" ? body["name"].trim() : "";
  const email = typeof body["email"] === "string" ? body["email"].trim() : "";
  const phone = typeof body["phone"] === "string" ? body["phone"].trim() : "";
  const message = typeof body["message"] === "string" ? body["message"].trim() : "";

  if (!name || !email) {
    res.status(400).json({ error: "name and email are required" });
    return;
  }

  if (!isGmailConfigured()) {
    req.log.warn({ formType }, "Form submission received but Gmail OAuth2 is not configured");
    res.status(503).json({
      error: "Email delivery is not configured yet. Please call us directly.",
    });
    return;
  }

  try {
    await sendFormEmail({
      subject: `[summersetmarine.com] New ${formType} submission from ${name}`,
      text: [
        `Form type: ${formType}`,
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        "",
        message || "(no message)",
      ]
        .filter((line): line is string => line !== null)
        .join("\n"),
      replyTo: email,
    });
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send form email");
    res.status(500).json({ error: "Failed to submit form. Please try again." });
  }
});

export default router;
