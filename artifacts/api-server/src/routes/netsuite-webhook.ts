import { Router, type IRouter } from "express";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

function secretsMatch(provided: string, expected: string): boolean {
  const a = crypto.createHash("sha256").update(provided).digest();
  const b = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(a, b);
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
 * inventory cache. Protected by the NETSUITE_WEBHOOK_SECRET shared secret
 * (sent as the `x-netsuite-webhook-secret` header).
 */
router.post("/netsuite-webhook", async (req, res) => {
  const secret = process.env["NETSUITE_WEBHOOK_SECRET"];
  if (!secret) {
    req.log.warn("NetSuite webhook called but NETSUITE_WEBHOOK_SECRET is not configured");
    res.status(503).json({ error: "Webhook is not configured" });
    return;
  }

  const provided = req.get("x-netsuite-webhook-secret");
  if (!provided || !secretsMatch(provided, secret)) {
    res.status(401).json({ error: "Invalid webhook secret" });
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
 * Serves the cached lift inventory for the website's inventory page.
 */
router.get("/inventory", async (req, res) => {
  try {
    const raw = await fs.readFile(CACHE_PATH, "utf8");
    res.json(JSON.parse(raw) as InventoryCache);
  } catch (err) {
    req.log.warn({ err }, "Inventory cache missing or unreadable; returning empty cache");
    res.json({ lastUpdated: null, items: [] } satisfies InventoryCache);
  }
});

export default router;
