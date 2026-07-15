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
