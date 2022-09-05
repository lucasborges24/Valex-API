import { Router } from "express";
import { purchaseController } from "../controllers/index";
import { validateParamsId } from "../middlewares/idMiddleware";
import { validateBodySchema } from "../middlewares/schemaMiddleware";
import { purchaseSchema } from "../schemas/purchaseSchema";

const purchaseRouter = Router();

purchaseRouter.post(
  "/purchase/:cardId/:businessId",
  validateBodySchema(purchaseSchema),
  validateParamsId("cardId"),
  validateParamsId("businessId"),
  purchaseController.purchaseCard
);

export { purchaseRouter };
