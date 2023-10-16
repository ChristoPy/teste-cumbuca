import { DepositInput } from "./types";
import { TransactionModel } from "../../models/transaction";

export async function deposit(data: DepositInput) {
  const transaction = await TransactionModel.create({
    amount: data.amount,
    owner: data.owner,
    wallet: data.wallet,
    type: 'deposit'
  })

  await transaction.save()
}
