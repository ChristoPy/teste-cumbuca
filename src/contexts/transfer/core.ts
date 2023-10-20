import { TransferInput, TransferResult } from "./types";
import { TransactionModel } from "../../models/transaction";
import { FastifyInstance } from "fastify";
import { Result } from "../../models/result";
import { WalletModel } from "../../models/wallet";

export async function transfer(data: TransferInput, context: FastifyInstance): Promise<Result<TransferResult>> {
  const wallet = await WalletModel.findOne({ _id: data.wallet })
  if (!wallet) {
    return {
      error: 'Could not find wallet'
    }
  }
  const receiver = await WalletModel.findOne({ _id: data.receiver })
  if (!receiver) {
    return {
      error: "Could not find receiver Wallet"
    }
  }

  if (data.amount > wallet.balance) {
    return {
      error: 'Insufficient funds'
    }
  }

  const transaction = await TransactionModel.create({
    amount: data.amount,
    owner: data.owner,
    wallet: data.wallet,
    receiver: data.receiver,
    type: 'transfer',
    status: 'pending'
  })

  await transaction.save()

  context.queues.transactions.add(`${transaction.id}:transfer`, { _id: transaction.id })

  return {
    data: {
      _id: transaction.id
    }
  }
}
