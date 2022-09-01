import { Router, Request, Response } from "express";

import { cardController } from "../controllers/index";
import { validateParamsId } from "../middlewares/idMiddleware";
import {
  validateHeaderSchema,
  validateBodySchema,
} from "../middlewares/schemaMiddleware";
import { apiKeySchema, typeSchema } from "../schemas/cardSchema";

const cardRouter = Router();

cardRouter.post(
  "/card/:employeeId",
  validateHeaderSchema(apiKeySchema),
  validateBodySchema(typeSchema),
  validateParamsId("employeeId"),
  cardController.createCard
);

export { cardRouter };
