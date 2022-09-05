import joi from "joi";

export const purchaseSchema = joi.object({
  password: joi
    .string()
    .pattern(/^[0-9]{4}$/)
    .required(),
  amount: joi.number().integer().min(1).required(),
});
