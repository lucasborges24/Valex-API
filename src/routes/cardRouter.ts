import { Router, Request, Response } from "express";

import { cardController } from "../controllers/index.js";
import { validateParamsId } from "../middlewares/idMiddleware.js";
import {
  validateHeaderSchema,
  validateBodySchema,
} from "../middlewares/schemaMiddleware.js";
import { apiKeySchema, typeSchema } from "../schemas/cardSchema.js";

const cardRouter = Router();

cardRouter.post(
  "/card/:employeeId",
  validateHeaderSchema(apiKeySchema),
  validateBodySchema(typeSchema),
  validateParamsId("employeeId"),
  cardController.createCard
);

export { cardRouter };
