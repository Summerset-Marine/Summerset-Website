import { Router, type IRouter } from "express";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import {
  fetchNetSuiteInventory,
  isNetSuiteConfigured,
  isSiteVisible,
  type InventoryItem,
} from "../lib/netsuite.js";
import { logger } from "../lib/logger.js";

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
  items: InventoryItem[];
}

/* ── Cache helpers ────────────────────────────────────────────────── */

async function readCache(): Promise<InventoryCache> {
  try {
    return JSON.parse(await fs.readFile(CACHE_PATH, "utf8")) as InventoryCache;
  } catch {
    return { lastUpdated: null, items: [] };
  }
}

async function writeCache(cache: InventoryCache): Promise<void> {
  await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
  await fs.writeFile(CACHE_PATH, JSON.stringify(cache, null, 2), "utf8");
}

/* ── HMAC verification ────────────────────────────────────────────── */

function verifySignature(rawBody: Buffer, secret: string, signature: string | undefined): boolean {
  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");
  return Boolean(signature) && safeEqual(signature!, expected);
}

/**
 * POST /api/netsuite-webhook
 *
 * Accepts two event types:
 *
 *   { "event": "upsert", "item": { "netsuiteItemId": "...", ... } }
 *     Adds or replaces a single item in the cache by netsuiteItemId.
 *     If the item's listOnWebsite flag is false OR status is not "Available",
 *     it is treated as a remove (two-field visibility rule — see netsuite.ts).
 *
 *   { "event": "remove", "netsuiteItemId": "..." }
 *     Removes a single item from the cache by netsuiteItemId.
 *
 * Protected by HMAC-SHA256 of the raw JSON body, keyed with
 * NETSUITE_WEBHOOK_SECRET and sent in the `x-netsuite-signature` header
 * (hex-encoded). Signature logic is unchanged from the original implementation.
 */
router.post("/netsuite-webhook", async (req, res) => {
  const secret = process.env["NETSUITE_WEBHOOK_SECRET"];
  if (!secret) {
    req.log.warn("NetSuite webhook called but NETSUITE_WEBHOOK_SECRET is not configured");
    res.status(503).json({ error: "Webhook is not configured" });
    return;
  }

  const rawBody = (req as typeof req & { rawBody?: Buffer }).rawBody;
  if (!rawBody) {
    res.status(400).json({ error: "Missing request body" });
    return;
  }

  if (!verifySignature(rawBody, secret, req.get("x-netsuite-signature"))) {
    res.status(401).json({ error: "Invalid webhook signature" });
    return;
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const event = body["event"] as string | undefined;

  // ── upsert ──────────────────────────────────────────────────────────
  if (event === "upsert") {
    const item = body["item"] as (InventoryItem & {
      listOnWebsite?: boolean | string | null;
      status?: string | null;
    }) | undefined;

    if (!item || !item.netsuiteItemId) {
      res.status(400).json({ error: 'upsert event requires an "item" object with a "netsuiteItemId"' });
      return;
    }

    const cache = await readCache();
    const id = String(item.netsuiteItemId);

    if (!isSiteVisible(item)) {
      // Item is sold, pending, or unlisted — remove it if present.
      const before = cache.items.length;
      cache.items = cache.items.filter((i) => String(i.netsuiteItemId) !== id);
      cache.lastUpdated = new Date().toISOString();
      await writeCache(cache);
      const removed = cache.items.length < before;
      req.log.info({ netsuiteItemId: id, removed }, "Webhook upsert: item not site-visible — removed from cache");
      res.json({ success: true, action: removed ? "removed" : "noop", netsuiteItemId: id });
      return;
    }

    // Strip the visibility fields before storing — frontend doesn't need them.
    const { listOnWebsite: _lw, status: _s, ...itemToStore } = item as typeof item & {
      listOnWebsite?: unknown;
      status?: unknown;
    };
    const stored = itemToStore as InventoryItem;

    const idx = cache.items.findIndex((i) => String(i.netsuiteItemId) === id);
    if (idx >= 0) {
      cache.items[idx] = stored;
    } else {
      cache.items.push(stored);
    }
    cache.lastUpdated = new Date().toISOString();
    await writeCache(cache);

    const action = idx >= 0 ? "updated" : "added";
    req.log.info({ netsuiteItemId: id, action }, "Webhook upsert: cache updated");
    res.json({ success: true, action, netsuiteItemId: id });
    return;
  }

  // ── remove ──────────────────────────────────────────────────────────
  if (event === "remove") {
    const id = body["netsuiteItemId"] ? String(body["netsuiteItemId"]) : undefined;
    if (!id) {
      res.status(400).json({ error: 'remove event requires a "netsuiteItemId" field' });
      return;
    }

    const cache = await readCache();
    const before = cache.items.length;
    cache.items = cache.items.filter((i) => String(i.netsuiteItemId) !== id);
    cache.lastUpdated = new Date().toISOString();
    await writeCache(cache);

    const removed = cache.items.length < before;
    req.log.info({ netsuiteItemId: id, removed }, "Webhook remove processed");
    res.json({ success: true, action: removed ? "removed" : "noop", netsuiteItemId: id });
    return;
  }

  res.status(400).json({
    error: 'Unknown or missing "event" field. Expected "upsert" or "remove".',
  });
});

/**
 * GET /api/inventory
 * Serves the cached lift inventory for the website's inventory page. If the
 * cache is empty and NetSuite is configured, falls back to a direct SuiteQL
 * fetch (initial load / manual refresh path) and repopulates the cache.
 */
router.get("/inventory", async (req, res) => {
  let cache = await readCache();

  if (cache.items.length === 0 && isNetSuiteConfigured()) {
    try {
      const items = await fetchNetSuiteInventory();
      cache = { lastUpdated: new Date().toISOString(), items };
      await writeCache(cache);
      req.log.info({ itemCount: items.length }, "Inventory cache refreshed from NetSuite");
    } catch (err) {
      req.log.error({ err }, "Direct NetSuite inventory fetch failed; serving cached data");
    }
  }

  res.json(cache);
});

/* ── Nightly reconciliation job ───────────────────────────────────── */

const NIGHTLY_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Runs the full SuiteQL pull and overwrites the cache. Called by the nightly
 * scheduler and exported for use in the server startup. Skips silently when
 * NetSuite is not configured.
 */
export async function runInventoryReconciliation(): Promise<void> {
  if (!isNetSuiteConfigured()) return;
  try {
    const items = await fetchNetSuiteInventory();
    await writeCache({ lastUpdated: new Date().toISOString(), items });
    logger.info({ itemCount: items.length }, "Nightly inventory reconciliation complete");
  } catch (err) {
    logger.error({ err }, "Nightly inventory reconciliation failed");
  }
}

/**
 * Starts the nightly reconciliation timer. Call once at server startup.
 * The first run fires after 24 hours (not immediately), so the normal
 * webhook-driven cache is not overwritten on every restart.
 */
export function startNightlyReconciliation(): NodeJS.Timeout {
  logger.info(
    { intervalHours: 24 },
    "Nightly inventory reconciliation scheduled",
  );
  return setInterval(() => {
    void runInventoryReconciliation();
  }, NIGHTLY_INTERVAL_MS);
}

export default router;
