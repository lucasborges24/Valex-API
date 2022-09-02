import { Request, Response } from "express";
import { faker } from "@faker-js/faker";
import { cardService } from "../services/index";
import {
  Card,
  CardInsertData,
  TransactionTypes,
} from "../repositories/cardRepository";

export const createCard = async (req: Request, res: Response) => {
  const { apikey }: { apikey: string } = res.locals.headers;
  const { type }: { type: TransactionTypes } = res.locals.body;
  const employeeId: number = res.locals.id;

  await cardService.checkApiKeyBelongSomeCompany(apikey);
  const employer = await cardService.checkEmployeeIdBelongsSomeEmployer(
    employeeId
  );
  await cardService.checkTypeCardByEmployee(type, employeeId);

  const cardholderName: string = await cardService.obtainCardholderName(
    employer.fullName
  );
  const expirationDate: string = await cardService.generateValidateCardDate();
  const securityCode: string = await cardService.encryptCvc(
    faker.random.numeric(3)
  );
  const newCard: CardInsertData = {
    employeeId,
    number: faker.random.numeric(12),
    cardholderName,
    securityCode,
    expirationDate,
    password: undefined,
    isVirtual: false,
    originalCardId: undefined,
    isBlocked: false,
    type,
  };
  await cardService.createCard(newCard);
  res.status(201).send("Cartão criado!");
};

export const activeCard = async (req: Request, res: Response) => {
  const cardId: number = res.locals.id;
  const card: Card = await cardService.getCardById(cardId);
  cardService.checkTodayisGreaterDateInFormatMMYY(card.expirationDate);
  cardService.checkCardisActiveByPassword(card.password);

  const { securityCode, password } = res.locals.body;
  cardService.checkSecurityCodeisValid(card.securityCode, securityCode);
  const encryptedPassword = await cardService.encryptPasswordByBcrypt(password);
  await cardService.activeCard(cardId, { password: encryptedPassword });

  res.status(200).send("Cartão Ativado.");
};

export const getCardBalance = async (req: Request, res: Response) => {
  const cardId: number = res.locals.id;
  await cardService.getCardById(cardId);
  const transactions = await cardService.getCardTransactions(cardId);
  const recharges = await cardService.getCardRecharges(cardId);
  const response: object = {
    balance: cardService.evaluateBalance(transactions, recharges),
    transactions,
    recharges,
  };
  res.status(200).send(response);
};
