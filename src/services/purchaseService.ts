import { cardService } from ".";
import { businessRepository, paymentRepository } from "../repositories";
import { Business } from "../repositories/businessRepository";
import {
  PaymentInsertData,
  PaymentWithBusinessName,
} from "../repositories/paymentRepository";
import { Recharge } from "../repositories/rechargeRepository";

export const getBusinessById = async (businessId: number) => {
  const business: Business = await businessRepository.findById(businessId);
  if (!business) {
    const error: object = {
      type: "Not_Found",
      message: "Cartão não encontrado.",
    };
    throw error;
  }
  return business;
};

export const checkTypeIsEqual = (typeOne: string, typeTwo: string) => {
  if (typeOne !== typeTwo) {
    const error: object = {
      type: "Bad_Request",
      message: "Tipos são diferentes.",
    };
    throw error;
  }
  return;
};

export const getCardBalance = async (cardId: number) => {
  const transactions: PaymentWithBusinessName[] =
    await cardService.getCardTransactions(cardId);
  const recharges: Recharge[] = await cardService.getCardRecharges(cardId);
  const balance = cardService.evaluateBalance(transactions, recharges);
  return balance;
};

export const checkBalanceIsGreaterThanAmount = (
  balance: number,
  amount: number
) => {    
  const result: number = balance - amount;  
  if (result < 0) {
    const error: object = {
      type: "Bad_Request",
      message: "Saldo Insuficiente.",
    };
    throw error;
  }
  return;
};

export const makeAPurchase = async (object: PaymentInsertData) => {
  await paymentRepository.insert(object);
  return;
};
