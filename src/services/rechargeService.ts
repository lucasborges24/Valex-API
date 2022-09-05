import { rechargeRepository } from "../repositories";

export const rechargeCard = async (recharge: {
  cardId: number;
  amount: number;
}) => {
  await rechargeRepository.insert(recharge);
  return;
};
