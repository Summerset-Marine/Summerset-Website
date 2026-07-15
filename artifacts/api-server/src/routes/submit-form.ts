// HubSpot submission handlers will be imported here in Prompt 4.
// This file will be fully replaced in Prompt 4.
import { Router, type IRouter } from "express";

const router: IRouter = Router();

/**
 * POST /api/submit-form
 * Temporary stub — the HubSpot Forms API handler arrives in Prompt 4.
 */
router.post("/submit-form", (_req, res) => {
  res.status(503).json({
    message: "Form handler not yet configured — Prompt 4 pending",
  });
});

export default router;
