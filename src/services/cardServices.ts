import dayjs from "dayjs";
import Cryptr from "cryptr";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import {
  cardRepository,
  companyRepository,
  employeeRepository,
} from "../repositories/index";
import {
  CardInsertData,
  CardUpdateData,
  TransactionTypes,
} from "../repositories/cardRepository";

dotenv.config();
const { CRYPTR_KEY } = process.env;
const cryptr = new Cryptr(CRYPTR_KEY!);
const SALT = 10;

export const checkApiKeyBelongSomeCompany = async (apikey: string) => {
  const company = await companyRepository.findByApiKey(apikey);
  if (!company || Object.keys(company).length === 0) {
    const error: object = {
      type: "Not_Found",
      message: "Empresa não encontrada.",
    };
    throw error;
  }
  return company;
};

export const checkEmployeeIdBelongsSomeEmployer = async (
  employeeId: number
) => {
  const employer = await employeeRepository.findById(employeeId);
  if (!employer || Object.keys(employer).length === 0) {
    const error: object = {
      type: "Not_Found",
      message: "Funcionário não encontrado.",
    };
    throw error;
  }
  return employer;
};

export const obtainCardholderName = async (name: string) => {
  const splitedName: string[] = name.split(" ");
  const cardholderName = splitedName
    .filter((item: string) => item.length >= 3)
    .map((item: string, i: number, arr: string[]) => {
      if (i === 0 || i === arr.length - 1) {
        return item;
      }
      return item[0];
    })
    .join(" ")
    .toUpperCase();
  if (!cardholderName) {
    const error: object = {
      type: "Unprocessable_Entity",
      message: "Erro ao criar cardholderName.",
    };
    throw error;
  }
  return cardholderName;
};

export const generateValidateCardDate = async () => {
  const validateDate: string = dayjs().add(5, "year").format("MM/YY");
  return validateDate;
};

export const encryptCvc = async (cvc: string) => {
  const ecryptedCvc = cryptr.encrypt(cvc);
  return ecryptedCvc;
};

export const createCard = async (card: CardInsertData) => {
  await cardRepository.insert(card);
  return true;
};

export const checkTypeCardByEmployee = async (
  type: TransactionTypes,
  id: number
) => {
  const typeAlreadyExists = await cardRepository.findByTypeAndEmployeeId(
    type,
    id
  );
  if (typeAlreadyExists) {
    const error: object = {
      type: "Conflit",
      message: "Cartão já cadastrado com este tipo",
    };
    throw error;
  }
  return;
};

export const getCardById = async (id: number) => {
  const card = await cardRepository.findById(id);
  if (!card) {
    const error: object = {
      type: "Not_Found",
      message: "Cartão não encontrado.",
    };
    throw error;
  }
  return card;
};

export const checkTodayisGreaterDateInFormatMMYY = (date: string) => {
  const todayYear = dayjs().format("YY");
  const todayMonth = dayjs().format("MM");
  const dateYear = date.split("/")[1];
  const dateMonth = date.split("/")[0];
  const error: object = {
    type: "Unauthorized",
    message: "Cartão expirado.",
  };
  if (dateYear < todayYear) {
    throw error;
  } else if (dateYear === todayYear) {
    if (dateMonth < todayMonth) {
      throw error;
    }
  }
  return;
};

export const checkCardisActiveByPassword = (password?: string) => {
  if (password) {
    const error: object = {
      type: "Conflit",
      message: "Cartão já foi ativado.",
    };
    throw error;
  }
  return;
};

export const checkSecurityCodeisValid = (
  encryptedCode: string,
  code: string
) => {
  const decryptedCode = cryptr.decrypt(encryptedCode);
  if (decryptedCode !== code) {
    const error: object = {
      type: "Unauthorized",
      message: "CVC invalido.",
    };
    throw error;
  }
  return decryptedCode;
};

export const encryptPasswordByBcrypt = async (password: string) => {
  try {
    const hash = bcrypt.hashSync(password, SALT);
    return hash;
  } catch (err) {
    throw err;
  }
};

export const activeCard = async (id: number, card: CardUpdateData) => {
  await cardRepository.update(id, card);
  return;
};

export const getCardTransactions = async (cardId: number) => {
  const transactions = await paymentRepository.findByCardId(cardId);
  return transactions;
};
