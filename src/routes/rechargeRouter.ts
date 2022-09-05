import { Router } from "express";
import { rechargeController } from "../controllers/index";
import { validateParamsId } from "../middlewares/idMiddleware";
import {
  validateBodySchema,
  validateHeaderSchema,
} from "../middlewares/schemaMiddleware";
import { apiKeySchema } from "../schemas/cardSchema";
import { amountSchema } from "../schemas/rechargeSchema";

const rechargeRouter = Router();

rechargeRouter.post(
  "/card/charge/:cardId",
  validateHeaderSchema(apiKeySchema),
  validateBodySchema(amountSchema),
  validateParamsId("cardId"),
  rechargeController.rechargeCard
);

export { rechargeRouter };
