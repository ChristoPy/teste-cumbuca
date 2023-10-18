import { RefundInput, RefundResult } from "./types";
import { FastifyInstance } from "fastify";
import { Result } from "../../models/result";
import { TransactionModel } from "../../models/transaction";

export async function refund(data: RefundInput, context: FastifyInstance): Promise<Result<RefundResult>> {
  const transaction = await TransactionModel.findOne(
    { _id: data.transaction, wallet: data.wallet, owner: data.owner },
  );

  if (!transaction) {
    return {
      error: "Transaction not found",
    };
  }

  if (transaction.status === 'refunded' || transaction.status === 'failed') {
    return {
      error: "Transaction cannot be refunded",
    };
  }

  context.queues.transactions.add(`${data.transaction}:refund`, { _id: data.transaction })

  return {
    data: {
      _id: data.transaction
    }
  }
}
