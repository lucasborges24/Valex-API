import { Request, Response } from "express";
import { Business } from "../repositories/businessRepository";
import { Card } from "../repositories/cardRepository";
import { cardService, purchaseService } from "../services";

export const purchaseCard = async (req: Request, res: Response) => {
  const { cardId } = res.locals;
  const card: Card = await cardService.getCardById(cardId);

  const { businessId } = res.locals;
  const business: Business = await purchaseService.getBusinessById(businessId);

  cardService.checkCardisNotActiveByPassword(card.password);
  cardService.checkTodayisGreaterDateInFormatMMYY(card.expirationDate);
  cardService.checkCardIsBlocked(card.isBlocked);
  const { password, amount }: {password: string, amount: number} = res.locals.body;
  await cardService.validatePassword(password, card.password!);
  purchaseService.checkTypeIsEqual(card.type, business.type);
  const balance: number = await purchaseService.getCardBalance(cardId);
  purchaseService.checkBalanceIsGreaterThanAmount(balance, amount);
  purchaseService.makeAPurchase({ cardId, businessId, amount });
  res
    .status(201)
    .send(`Compra de $${amount / 100} efetuada em ${business.name}.`);
};
