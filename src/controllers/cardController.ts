import { Request, Response } from "express";
import { cardService } from "../services/index.js";

export const createCard = async (req: Request, res: Response) => {
  const { apikey }: { apikey: string } = res.locals.headers;
  const { type }: { type: string } = res.locals.body;
  const employeeId: number = res.locals.id;

  const company: object = await cardService.checkApiKeyBelongSomeCompany(
    apikey
  );
  const employer: object = await cardService.checkEmployeeIdBelongsSomeEmployer(
    employeeId
  );

  res.send(employer);
};
