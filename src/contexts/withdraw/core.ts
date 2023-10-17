import { WithdrawInput, WithdrawResult } from "./types";
import { TransactionModel } from "../../models/transaction";
import { FastifyInstance } from "fastify";
import { Result } from "../../models/result";

export async function withdraw(data: WithdrawInput, context: FastifyInstance): Promise<Result<WithdrawResult>> {
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
