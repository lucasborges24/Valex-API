import { Router, Request, Response } from "express";

import { cardController } from "../controllers/index";
import { validateParamsId } from "../middlewares/idMiddleware";
import {
  validateHeaderSchema,
  validateBodySchema,
} from "../middlewares/schemaMiddleware";
import {
  activeSchema,
  apiKeySchema,
  blockSchema,
  typeSchema,
} from "../schemas/cardSchema";

const cardRouter = Router();

cardRouter.post(
  "/card/:employeeId",
  validateHeaderSchema(apiKeySchema),
  validateBodySchema(typeSchema),
  validateParamsId("employeeId"),
  cardController.createCard
);

cardRouter.put(
  "/card/active/:cardId",
  validateBodySchema(activeSchema),
  validateParamsId("cardId"),
  cardController.activeCard
);

cardRouter.get(
  "/card/view/:cardId",
  validateParamsId("cardId"),
  cardController.getCardBalance
);

cardRouter.put(
  "/card/block/:cardId",
  validateBodySchema(blockSchema),
  validateParamsId("cardId"),
  cardController.blockCard
);

export { cardRouter };
