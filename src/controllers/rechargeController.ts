import { Request, Response } from "express";
import { Card } from "../repositories/cardRepository";
import { cardService, rechargeService } from "../services";

export const rechargeCard = async (req: Request, res: Response) => {
  const { cardId } = res.locals;
  const card: Card = await cardService.getCardById(cardId);

  const { apikey }: { apikey: string } = res.locals.headers;
  await cardService.checkApiKeyBelongSomeCompany(apikey);
  cardService.checkCardisNotActiveByPassword(card.password);
  cardService.checkTodayisGreaterDateInFormatMMYY(card.expirationDate);
  // cardService.checkCardIsBlocked(card.isBlocked);
  const { amount } = res.locals.body;
  await rechargeService.rechargeCard({ cardId, amount });

  res.status(201).send(`Cartão recarregado com $${amount / 100}.`);
};
