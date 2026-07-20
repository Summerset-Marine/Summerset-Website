import crypto from "crypto";
import axios, { type AxiosRequestConfig } from "axios";

/**
 * NetSuite REST API client using Token-Based Authentication (OAuth 1.0a,
 * HMAC-SHA256). Reads credentials from environment variables and refuses to
 * run until they are configured.
 */

function getNetSuiteEnv() {
  return {
    accountId: process.env["NETSUITE_ACCOUNT_ID"],
    consumerKey: process.env["NETSUITE_CONSUMER_KEY"],
    consumerSecret: process.env["NETSUITE_CONSUMER_SECRET"],
    tokenId: process.env["NETSUITE_TOKEN_ID"],
    tokenSecret: process.env["NETSUITE_TOKEN_SECRET"],
  };
}

export function isNetSuiteConfigured(): boolean {
  const { accountId, consumerKey, consumerSecret, tokenId, tokenSecret } = getNetSuiteEnv();
  return Boolean(accountId && consumerKey && consumerSecret && tokenId && tokenSecret);
}

function percentEncode(value: string): string {
  return encodeURIComponent(value).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

function buildOAuthHeader(method: string, url: string): string {
  const { accountId, consumerKey, consumerSecret, tokenId, tokenSecret } = getNetSuiteEnv();
  if (!accountId || !consumerKey || !consumerSecret || !tokenId || !tokenSecret) {
    throw new Error(
      "NetSuite is not configured. Set NETSUITE_ACCOUNT_ID, NETSUITE_CONSUMER_KEY, NETSUITE_CONSUMER_SECRET, NETSUITE_TOKEN_ID, and NETSUITE_TOKEN_SECRET.",
    );
  }

  const oauthParams: Record<string, string> = {
    oauth_consumer_key: consumerKey,
    oauth_nonce: crypto.randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA256",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: tokenId,
    oauth_version: "1.0",
  };

  const parsedUrl = new URL(url);
  const baseUrl = `${parsedUrl.origin}${parsedUrl.pathname}`;
  const allParams: Record<string, string> = { ...oauthParams };
  parsedUrl.searchParams.forEach((value, key) => {
    allParams[key] = value;
  });

  const paramString = Object.keys(allParams)
    .sort()
    .map((key) => `${percentEncode(key)}=${percentEncode(allParams[key] ?? "")}`)
    .join("&");

  const signatureBase = [
    method.toUpperCase(),
    percentEncode(baseUrl),
    percentEncode(paramString),
  ].join("&");

  const signingKey = `${percentEncode(consumerSecret)}&${percentEncode(tokenSecret)}`;
  const signature = crypto
    .createHmac("sha256", signingKey)
    .update(signatureBase)
    .digest("base64");

  const headerParams = {
    realm: accountId,
    ...oauthParams,
    oauth_signature: signature,
  };

  return `OAuth ${Object.entries(headerParams)
    .map(([key, value]) => `${key}="${percentEncode(value)}"`)
    .join(", ")}`;
}

export async function netsuiteRequest<T>(
  method: "GET" | "POST" | "PATCH" | "DELETE",
  path: string,
  body?: unknown,
): Promise<T> {
  const { accountId } = getNetSuiteEnv();
  if (!isNetSuiteConfigured() || !accountId) {
    throw new Error("NetSuite is not configured.");
  }

  const accountDomain = accountId.toLowerCase().replace(/_/g, "-");
  const url = `https://${accountDomain}.suitetalk.api.netsuite.com${path}`;

  const config: AxiosRequestConfig = {
    method,
    url,
    headers: {
      Authorization: buildOAuthHeader(method, url),
      "Content-Type": "application/json",
    },
  };
  if (body !== undefined) config.data = body;

  const response = await axios.request<T>(config);
  return response.data;
}

/**
 * Shape of an inventory item as stored in the cache and served to the
 * frontend inventory page. Field names match the frontend's InventoryItem
 * interface exactly.
 *
 * Visibility rule (two-field approach — see note below):
 *   An item is shown on the website only when BOTH of the following are true:
 *     1. listOnWebsite === true  (NetSuite field: custitem_smc_list_on_website)
 *     2. status === "Available"  (NetSuite field: custitem_smc_status)
 *   Items with status "Pending" or "Sold", OR with listOnWebsite false/unset,
 *   are treated the same as a remove event — they are never stored in the cache
 *   and never shown on the site.
 *
 * NOTE: This two-field approach was chosen because neither field was specified
 * explicitly in the requirements. If you decide later that a single field is
 * enough (e.g. only a status field, or only a "list on website" flag), the
 * `isSiteVisible` helper and the SuiteQL WHERE clause are the two places to
 * simplify.
 */
export interface InventoryItem {
  netsuiteItemId: string;
  name: string;
  type?: string;
  brand?: string;
  model?: string;
  year?: number | string | null;
  condition?: string | null;
  capacity?: string | null;
  price?: number | null;
  location?: string | null;
  description?: string | null;
}

/**
 * Raw row returned by SuiteQL before mapping. Includes the two visibility
 * fields that determine whether the item belongs in the cache.
 */
interface SuiteQLRow extends InventoryItem {
  listOnWebsite: boolean | string;
  status: string | null;
}

/**
 * Returns true when an item should appear on the website.
 * Both conditions must be met: listed flag AND "Available" status.
 */
export function isSiteVisible(item: {
  listOnWebsite?: boolean | string | null;
  status?: string | null;
}): boolean {
  const listed =
    item.listOnWebsite === true ||
    item.listOnWebsite === "T" ||
    item.listOnWebsite === "true";
  const available = (item.status ?? "").toLowerCase() === "available";
  return listed && available;
}

/**
 * Fetches lift inventory directly from NetSuite via SuiteQL and returns only
 * items that are visible on the site (listOnWebsite = T AND status = Available).
 * Used for the initial-load fallback and the nightly reconciliation job.
 *
 * TODO: The custom field IDs below are placeholders — replace with the actual
 * field IDs from the SMC NetSuite account:
 *   custitem_smc_list_on_website — boolean checkbox field ("list on website")
 *   custitem_smc_status          — text/select field ("Available"/"Pending"/"Sold")
 *   custitem_smc_brand           — text field
 *   custitem_smc_model           — text field
 *   custitem_smc_year            — number/text field
 *   custitem_smc_condition       — text/select field ("New"/"Used"/"Refurbished")
 *   custitem_smc_capacity        — text field (e.g. "6,000 lb")
 *   custitem_smc_location        — text field (e.g. "Lake Geneva showroom")
 *   custitem_smc_description     — text area field
 */
export async function fetchNetSuiteInventory(): Promise<InventoryItem[]> {
  const query = `
    SELECT
      CAST(item.id AS VARCHAR) AS netsuiteItemId,
      item.displayName        AS name,
      item.itemType           AS type,
      item.custitem_smc_brand       AS brand,
      item.custitem_smc_model       AS model,
      item.custitem_smc_year        AS year,
      item.custitem_smc_condition   AS condition,
      item.salesprice               AS price,
      item.custitem_smc_capacity    AS capacity,
      item.custitem_smc_location    AS location,
      item.custitem_smc_description AS description,
      item.custitem_smc_list_on_website AS listOnWebsite,
      item.custitem_smc_status          AS status
    FROM item
    WHERE item.isinactive = 'F'
      AND item.custitem_smc_list_on_website = 'T'
      AND item.custitem_smc_status = 'Available'
    ORDER BY item.id DESC
  `;

  const data = await netsuiteRequest<{ items?: SuiteQLRow[] }>(
    "POST",
    "/services/rest/query/v1/suiteql",
    { q: query },
  );

  const rows = data.items ?? [];

  // Belt-and-suspenders: filter again in application code in case the SQL
  // driver returns non-boolean values for the checkbox field.
  return rows
    .filter(isSiteVisible)
    .map(({ listOnWebsite: _lw, status: _s, ...item }) => item);
}
