import { Request, Response } from "express";

export const createCard = async (req: Request, res: Response) => {
  const { apikey }: { apikey: string } = res.locals.headers;
  const { type }: { type: string } = res.locals.body;
  const { id }: { id: number } = res.locals.id;


  res.send("nada de erros");
};
