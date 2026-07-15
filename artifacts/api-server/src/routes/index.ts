import { Router, type IRouter } from "express";
import healthRouter from "./health";
import submitFormRouter from "./submit-form";
import netsuiteWebhookRouter from "./netsuite-webhook";

const router: IRouter = Router();

router.use(healthRouter);
router.use(submitFormRouter);
router.use(netsuiteWebhookRouter);

export default router;
