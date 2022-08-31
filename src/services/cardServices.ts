import {
  companyRepository,
  employeeRepository,
} from "../repositories/index.js";

export const checkApiKeyBelongSomeCompany = async (apikey: string) => {
  const company: object = await companyRepository.findByApiKey(apikey);
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
  const employer: object = await employeeRepository.findById(employeeId);
  if (!employer || Object.keys(employer).length === 0) {
    const error: object = {
      type: "Not_Found",
      message: "Funcionário não encontrado.",
    };
    throw error;
  }
  return employer;
};
