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

export interface NetSuiteInventoryItem {
  itemId: string | number;
  productName: string;
  productType: string;
  model: string | null;
  year: string | number | null;
  condition: string | null;
  price: string | number | null;
  status: string | null;
}

/**
 * Fetches lift inventory directly from NetSuite via SuiteQL. Used for manual
 * refresh or initial load when the webhook-written cache is empty.
 *
 * TODO: The field names custitem_smc_model, custitem_smc_year,
 * custitem_smc_condition, custitem_smc_status, and custitem_smc_lift_inventory
 * are placeholders. Replace them with the actual NetSuite custom field IDs
 * from the SMC NetSuite account before this query will run.
 */
export async function fetchNetSuiteInventory(): Promise<NetSuiteInventoryItem[]> {
  const query = `
    SELECT
      item.id AS itemId,
      item.displayName AS productName,
      item.itemType AS productType,
      item.custitem_smc_model AS model,
      item.custitem_smc_year AS year,
      item.custitem_smc_condition AS condition,
      item.salesprice AS price,
      item.custitem_smc_status AS status
    FROM item
    WHERE item.isinactive = 'F'
      AND item.custitem_smc_lift_inventory = 'T'
    ORDER BY item.id DESC
  `;

  const data = await netsuiteRequest<{ items?: NetSuiteInventoryItem[] }>(
    "POST",
    "/services/rest/query/v1/suiteql",
    { q: query },
  );
  return data.items ?? [];
}
