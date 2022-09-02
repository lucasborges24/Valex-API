import joi from "joi";

export const apiKeySchema = joi
  .object({
    apikey: joi.string().required(),
  })
  .unknown(true);

export const typeSchema = joi.object({
  type: joi
    .string()
    .valid("groceries", "restaurant", "transport", "education", "health")
    .required(),
});

export const activeSchema = joi.object({
  password: joi
    .string()
    .pattern(/^[0-9]{4}$/)
    .required(),
  securityCode: joi
    .string()
    .pattern(/^[0-9]{3}$/)
    .required(),
});
