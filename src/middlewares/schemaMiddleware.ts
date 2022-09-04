import { NextFunction, Response, Request } from "express";

const validateHeaderSchema = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.headers, { abortEarly: false });
    if (validation.error) {
      const error: object = {
        type: "Unprocessable_Entity",
        message: validation.error.details.map(
          (details: any) => details.message
        ),
      };
      throw error;
    }
    res.locals.headers = validation.value;
    next();
  };
};

const validateBodySchema = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      const error: object = {
        type: "Unprocessable_Entity",
        message: validation.error.details.map(
          (details: any) => details.message
        ),
      };
      throw error;
    }
    res.locals.body = validation.value;
    next();
  };
};

export { validateHeaderSchema, validateBodySchema };
