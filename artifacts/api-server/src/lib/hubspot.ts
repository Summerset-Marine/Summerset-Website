import { Client } from "@hubspot/api-client";
import { FilterOperatorEnum } from "@hubspot/api-client/lib/codegen/crm/contacts";
import { AssociationSpecAssociationCategoryEnum } from "@hubspot/api-client/lib/codegen/crm/associations/v4";
import { logger } from "./logger";

/**
 * HubSpot Forms API integration.
 *
 * Form submissions go through the Forms API v3 endpoint (portal ID + form
 * GUID, no auth required). Consultation requests additionally create a Deal
 * in the HubSpot CRM via the authenticated API client.
 */

function getEnv() {
  return {
    accessToken: process.env["HUBSPOT_ACCESS_TOKEN"],
    portalId: process.env["HUBSPOT_PORTAL_ID"],
    formIdConsultation: process.env["HUBSPOT_FORM_ID_CONSULTATION"],
    formIdContact: process.env["HUBSPOT_FORM_ID_CONTACT"],
    formIdServiceRequest: process.env["HUBSPOT_FORM_ID_SERVICE_REQUEST"],
  };
}

export function isHubSpotConfigured(formType: "consultation" | "contact" | "service-request"): boolean {
  const env = getEnv();
  if (!env.portalId) return false;
  switch (formType) {
    case "consultation":
      // Consultations also create a CRM Deal, which requires the access token.
      return Boolean(env.formIdConsultation && env.accessToken);
    case "contact":
      return Boolean(env.formIdContact);
    case "service-request":
      return Boolean(env.formIdServiceRequest);
  }
}

function getClient(): Client {
  return new Client({ accessToken: getEnv().accessToken });
}

export interface HubSpotContext {
  pageUri?: string;
  pageName?: string;
  ipAddress?: string;
  hutk?: string;
}

export interface FormData {
  name: string;
  email: string;
  phone?: string;
  lake?: string;
  market?: string;
  message?: string;
  projectDescription?: string;
  timeframe?: string;
  hearAbout?: string;
  serviceType?: string;
  equipmentDescription?: string;
  preferredTime?: string;
  propertyLocation?: string;
  issueDescription?: string;
}

function splitName(name: string): { firstname: string; lastname: string } {
  const parts = name.trim().split(/\s+/);
  return {
    firstname: parts[0] ?? name,
    lastname: parts.slice(1).join(" "),
  };
}

/* ── HubSpot Forms API submission ─────────────────────────────────── */

async function submitToHubSpotForm(
  formId: string,
  fields: Record<string, string>,
  context: HubSpotContext = {},
): Promise<unknown> {
  const { portalId } = getEnv();

  const { hutk, ...pageContext } = context;
  const body = {
    fields: Object.entries(fields).map(([name, value]) => ({
      objectTypeId: "0-1", // Contact object
      name,
      value: value ?? "",
    })),
    context: {
      pageUri: "https://summersetmarine.com",
      pageName: "Summerset Marine Construction",
      ...pageContext,
      ...(hutk ? { hutk } : {}),
    },
  };

  const response = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HubSpot Forms API error: ${response.status} — ${error}`);
  }

  return response.json();
}

/* ── Create a Deal in HubSpot CRM for consultation requests ───────── */

async function createDeal(contactEmail: string, data: FormData): Promise<void> {
  const { accessToken } = getEnv();
  if (!accessToken) {
    throw new Error("HUBSPOT_ACCESS_TOKEN is not set — cannot create consultation Deal");
  }

  const client = getClient();

  const dealResponse = await client.crm.deals.basicApi.create({
    properties: {
      dealname: `Consultation Request — ${data.name} — ${data.lake || data.market || "General"}`,
      pipeline: "default",
      // First stage — TODO: adjust to SMC's actual pipeline stage ID
      dealstage: "appointmentscheduled",
      description: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "Not provided"}`,
        `Lake / Location: ${data.lake || "Not provided"}`,
        `Market: ${data.market || "Not provided"}`,
        `Project Description: ${data.projectDescription || "Not provided"}`,
        `Timeframe: ${data.timeframe || "Not provided"}`,
        `How they heard about SMC: ${data.hearAbout || "Not provided"}`,
      ].join("\n"),
    },
    associations: [],
  });

  // Associate deal with the contact created by the form submission (by email).
  // Non-fatal — the deal exists even if association fails.
  try {
    const contacts = await client.crm.contacts.searchApi.doSearch({
      filterGroups: [
        {
          filters: [{ propertyName: "email", operator: FilterOperatorEnum.Eq, value: contactEmail }],
        },
      ],
      properties: ["email"],
      limit: 1,
    });

    const contactId = contacts.results[0]?.id;
    if (contactId) {
      await client.crm.associations.v4.basicApi.create(
        "deals",
        dealResponse.id,
        "contacts",
        contactId,
        [{ associationCategory: AssociationSpecAssociationCategoryEnum.HubspotDefined, associationTypeId: 3 }],
      );
    }
  } catch (assocErr) {
    logger.warn({ err: assocErr }, "HubSpot deal-contact association failed (non-fatal)");
  }
}

/* ── Public submission functions ──────────────────────────────────── */

export async function submitConsultationForm(data: FormData, context: HubSpotContext): Promise<void> {
  const formId = getEnv().formIdConsultation;
  if (!formId) throw new Error("HUBSPOT_FORM_ID_CONSULTATION is not set");

  // NOTE: field names must match the field internal names in the HubSpot form exactly.
  const fields: Record<string, string> = {
    ...splitName(data.name),
    email: data.email,
    phone: data.phone || "",
    city: data.lake || "", // maps to lake/location field
    state: data.market || "", // maps to market field
    message: data.projectDescription || "",
    hs_lead_status: "NEW",
    // Custom HubSpot properties — TODO: replace with actual HubSpot custom
    // property names once SMC configures them in their portal.
    smc_timeframe: data.timeframe || "",
    smc_hear_about: data.hearAbout || "",
  };

  await submitToHubSpotForm(formId, fields, context);

  // Create a Deal for consultation requests
  await createDeal(data.email, data);
}

export async function submitContactForm(data: FormData, context: HubSpotContext): Promise<void> {
  const formId = getEnv().formIdContact;
  if (!formId) throw new Error("HUBSPOT_FORM_ID_CONTACT is not set");

  const fields: Record<string, string> = {
    ...splitName(data.name),
    email: data.email,
    phone: data.phone || "",
    message: data.message || "",
  };

  await submitToHubSpotForm(formId, fields, context);
  // Contact only — no Deal created for general contact submissions
}

export async function submitServiceRequestForm(data: FormData, context: HubSpotContext): Promise<void> {
  const formId = getEnv().formIdServiceRequest;
  if (!formId) throw new Error("HUBSPOT_FORM_ID_SERVICE_REQUEST is not set");

  const fields: Record<string, string> = {
    ...splitName(data.name),
    email: data.email,
    phone: data.phone || "",
    address: data.propertyLocation || "",
    message: data.issueDescription || "",
    // Custom HubSpot properties — TODO: replace with actual custom property names
    smc_service_type: data.serviceType || "",
    smc_equipment: data.equipmentDescription || "",
    smc_preferred_time: data.preferredTime || "",
  };

  await submitToHubSpotForm(formId, fields, context);
  // Contact only — no Deal created for service requests
}
