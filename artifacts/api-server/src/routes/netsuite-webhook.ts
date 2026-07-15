import { Router, type IRouter } from "express";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import {
  fetchNetSuiteInventory,
  isNetSuiteConfigured,
} from "../lib/netsuite.js";

/** Constant-time comparison of two strings of possibly different lengths. */
function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

const router: IRouter = Router();

const CACHE_PATH = path.join(process.cwd(), "data", "inventory-cache.json");

interface InventoryCache {
  lastUpdated: string | null;
  items: unknown[];
}

/**
 * POST /api/netsuite-webhook
 * Receives inventory pushes from NetSuite and persists them to the local
 * inventory cache. Protected by an HMAC-SHA256 signature of the JSON body,
 * keyed with NETSUITE_WEBHOOK_SECRET and sent in the `x-netsuite-signature`
 * header (hex encoded).
 */
router.post("/netsuite-webhook", async (req, res) => {
  const secret = process.env["NETSUITE_WEBHOOK_SECRET"];
  if (!secret) {
    req.log.warn("NetSuite webhook called but NETSUITE_WEBHOOK_SECRET is not configured");
    res.status(503).json({ error: "Webhook is not configured" });
    return;
  }

  // Sign the raw request body bytes (not a re-serialized object) so key
  // ordering/whitespace differences can never break signature validation.
  const rawBody = (req as typeof req & { rawBody?: Buffer }).rawBody;
  if (!rawBody) {
    res.status(400).json({ error: "Missing request body" });
    return;
  }

  const signature = req.get("x-netsuite-signature");
  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  if (!signature || !safeEqual(signature, expected)) {
    res.status(401).json({ error: "Invalid webhook signature" });
    return;
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const items = Array.isArray(body["items"]) ? body["items"] : [];

  const cache: InventoryCache = {
    lastUpdated: new Date().toISOString(),
    items,
  };

  try {
    await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
    await fs.writeFile(CACHE_PATH, JSON.stringify(cache, null, 2), "utf8");
    req.log.info({ itemCount: items.length }, "Inventory cache updated from NetSuite webhook");
    res.json({ success: true, itemCount: items.length });
  } catch (err) {
    req.log.error({ err }, "Failed to write inventory cache");
    res.status(500).json({ error: "Failed to update inventory cache" });
  }
});

/**
 * GET /api/inventory
 * Serves the cached lift inventory for the website's inventory page. If the
 * cache is empty and NetSuite is configured, falls back to a direct SuiteQL
 * fetch (initial load / manual refresh path) and repopulates the cache.
 */
router.get("/inventory", async (req, res) => {
  let cache: InventoryCache = { lastUpdated: null, items: [] };
  try {
    cache = JSON.parse(await fs.readFile(CACHE_PATH, "utf8")) as InventoryCache;
  } catch {
    req.log.warn("Inventory cache missing or unreadable");
  }

  if (cache.items.length === 0 && isNetSuiteConfigured()) {
    try {
      const items = await fetchNetSuiteInventory();
      cache = { lastUpdated: new Date().toISOString(), items };
      await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
      await fs.writeFile(CACHE_PATH, JSON.stringify(cache, null, 2), "utf8");
      req.log.info({ itemCount: items.length }, "Inventory cache refreshed from NetSuite");
    } catch (err) {
      req.log.error({ err }, "Direct NetSuite inventory fetch failed; serving cached data");
    }
  }

  res.json(cache);
});

export default router;
