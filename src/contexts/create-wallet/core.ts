import { Result } from "../../models/result";
import { PublicWallet, WalletModel } from "../../models/wallet";

export async function createWallet(owner: string): Promise<Result<PublicWallet>> {
  const newWallet = await WalletModel.create({ owner });
  await newWallet.save();

  return {
    data: {
      _id: newWallet.id,
      balance: newWallet.balance
    }
  }
}
