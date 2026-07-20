import express, { type Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";
import { startNightlyReconciliation } from "./routes/netsuite-webhook";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(
  express.json({
    verify: (req, _res, buf) => {
      // Preserve the raw body bytes for webhook HMAC signature verification.
      (req as express.Request & { rawBody?: Buffer }).rawBody = buf;
    },
  }),
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// Start nightly inventory reconciliation (full SuiteQL pull every 24 h).
// Runs only when NetSuite env vars are present; safe to call unconditionally.
startNightlyReconciliation();

export default app;
