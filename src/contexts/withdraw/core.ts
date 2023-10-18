import { WithdrawInput, WithdrawResult } from "./types";
import { TransactionModel } from "../../models/transaction";
import { FastifyInstance } from "fastify";
import { Result } from "../../models/result";
import { WalletModel } from "../../models/wallet";

export async function withdraw(data: WithdrawInput, context: FastifyInstance): Promise<Result<WithdrawResult>> {
  const wallet = await WalletModel.findOne({ _id: data.wallet })
  if (!wallet) {
    return {
      error: 'Could not find wallet'
    }
  }

  console.log(data.amount, wallet.amount, data.amount > wallet.amount)

  if (data.amount > wallet.amount) {
    return {
      error: 'Insuficient funds'
    }
  }

  const transaction = await TransactionModel.create({
    amount: data.amount,
    owner: data.owner,
    wallet: data.wallet,
    type: 'withdraw',
    status: 'pending'
  })

  await transaction.save()

  context.queues.transactions.add(`${transaction.id}:withdraw`, { _id: transaction.id })

  return {
    data: {
      _id: transaction.id
    }
  }
}
