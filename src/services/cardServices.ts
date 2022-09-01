import dayjs from "dayjs";
import Cryptr from "cryptr";
import dotenv from "dotenv";
import { cardRepository, companyRepository, employeeRepository } from "../repositories/index";
import { CardInsertData, TransactionTypes } from "../repositories/cardRepository";

dotenv.config();


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


// export const encryptCvc = async (cvc: string) => {
//   const { CRYPTR_KEY } = process.env
//   const cryptr = new Cryptr(CRYPTR_KEY);
  

//   const ecryptedCvc = cryptr.encrypt(cvc)
//   return ecryptedCvc;
// };

export const encryptCvc = async (cvc: string) => {
  const cryptr = new Cryptr('senha_super_secreta');
  const ecryptedCvc = cryptr.encrypt(cvc)
  return ecryptedCvc;
};

export const createCard = async (card: CardInsertData) => {
    await cardRepository.insert(card)
    return true;
  }

export const checkTypeCardByEmployee = async (type: TransactionTypes, id: number) => {
  const typeAlreadyExists = await cardRepository.findByTypeAndEmployeeId(type, id)
  if (typeAlreadyExists) {
    const error: object = {
      type: "Conflit",
      message: "Cartão já cadastrado com este tipo",
    };
    throw error;
  }
  return;
}
