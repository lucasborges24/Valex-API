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
