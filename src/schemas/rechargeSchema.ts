import joi from "joi";

export const amountSchema = joi.object({
  amount: joi.number().integer().min(1).required(),
});
