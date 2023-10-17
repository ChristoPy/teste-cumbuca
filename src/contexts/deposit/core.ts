import { DepositInput, DepositResult } from "./types";
import { TransactionModel } from "../../models/transaction";
import { FastifyInstance } from "fastify";
import { Result } from "../../models/result";

export async function deposit(data: DepositInput, context: FastifyInstance): Promise<Result<DepositResult>> {
  const transaction = await TransactionModel.create({
    amount: data.amount,
    owner: data.owner,
    wallet: data.wallet,
    type: 'deposit',
    status: 'pending'
  })

  await transaction.save()

  context.queues.transactions.add(`${transaction.id}:deposit`, {
    _id: transaction.id,
    amount: data.amount,
    owner: data.owner,
    wallet: data.wallet,
    type: 'deposit',
    status: 'pending'
  })

  return {
    data: {
      _id: transaction.id
    }
  }
}
