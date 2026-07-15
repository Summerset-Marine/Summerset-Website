import { Router, type IRouter } from "express";
import {
  isHubSpotConfigured,
  submitConsultationForm,
  submitContactForm,
  submitServiceRequestForm,
  type FormData,
  type HubSpotContext,
} from "../lib/hubspot";

const router: IRouter = Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormType = "consultation" | "contact" | "service-request";

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * POST /api/submit-form
 * Unified form handler — relays consultation, contact, and service-request
 * submissions to the HubSpot Forms API. Consultations also create a CRM Deal.
 */
router.post("/submit-form", async (req, res) => {
  const body = (req.body ?? {}) as Record<string, unknown>;
  const formType = str(body["formType"]) as FormType | "";

  const data: FormData = {
    name: str(body["name"]),
    email: str(body["email"]),
    phone: str(body["phone"]),
    lake: str(body["lake"]),
    market: str(body["market"]),
    message: str(body["message"]),
    projectDescription: str(body["projectDescription"]),
    timeframe: str(body["timeframe"]),
    hearAbout: str(body["hearAbout"]),
    serviceType: str(body["serviceType"]),
    equipmentDescription: str(body["equipmentDescription"]),
    preferredTime: str(body["preferredTime"]),
    propertyLocation: str(body["propertyLocation"]),
    issueDescription: str(body["issueDescription"]),
  };

  // Basic validation
  if (!data.name || !data.email) {
    res.status(400).json({ error: "Name and email are required" });
    return;
  }
  if (!EMAIL_REGEX.test(data.email)) {
    res.status(400).json({ error: "Invalid email address" });
    return;
  }
  if (formType !== "consultation" && formType !== "contact" && formType !== "service-request") {
    res.status(400).json({ error: "Invalid form type" });
    return;
  }
  if (formType === "consultation" && !data.projectDescription) {
    res.status(400).json({ error: "Project description is required" });
    return;
  }
  if (formType === "contact" && !data.message) {
    res.status(400).json({ error: "Message is required" });
    return;
  }
  if (formType === "service-request" && !data.issueDescription) {
    res.status(400).json({ error: "Issue description is required" });
    return;
  }

  if (!isHubSpotConfigured(formType)) {
    req.log.warn({ formType }, "Form submission received but HubSpot env vars are missing");
    res.status(503).json({ error: "Form service temporarily unavailable" });
    return;
  }

  // Build HubSpot page context from request headers
  let pagePath = "/";
  const referer = req.get("referer");
  if (referer) {
    try {
      pagePath = new URL(referer).pathname;
    } catch {
      /* keep default */
    }
  }
  const forwardedFor = req.get("x-forwarded-for");
  const cookies = (req as typeof req & { cookies?: Record<string, string> }).cookies;
  const context: HubSpotContext = {
    pageUri: `https://summersetmarine.com${pagePath}`,
    pageName: "Summerset Marine Construction",
    ipAddress: forwardedFor?.split(",")[0]?.trim() || req.socket.remoteAddress || "",
    hutk: cookies?.["hubspotutk"] || "",
  };

  try {
    if (formType === "consultation") {
      await submitConsultationForm(data, context);
    } else if (formType === "contact") {
      await submitContactForm(data, context);
    } else {
      await submitServiceRequestForm(data, context);
    }
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err, formType }, "HubSpot form submission failed");
    res.status(500).json({ error: "Form submission failed" });
  }
});

export default router;
