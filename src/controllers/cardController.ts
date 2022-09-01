import { Request, Response } from "express";
import { faker } from "@faker-js/faker";
import { cardService } from "../services/index";
import {
  CardInsertData,
  TransactionTypes,
} from "../repositories/cardRepository";

export const createCard = async (req: Request, res: Response) => {
  const { apikey }: { apikey: string } = res.locals.headers;
  const { type }: { type: TransactionTypes } = res.locals.body;
  const employeeId: number = res.locals.id;

  const company = await cardService.checkApiKeyBelongSomeCompany(apikey);
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
  res.status(201).send('Cartão criado!');
};
