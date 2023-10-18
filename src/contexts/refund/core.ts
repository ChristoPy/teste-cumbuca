import { RefundInput, RefundResult } from "./types";
import { FastifyInstance } from "fastify";
import { Result } from "../../models/result";
import { TransactionModel } from "../../models/transaction";
import { validateRefund } from "../rules/core";

export async function refund(data: RefundInput, context: FastifyInstance): Promise<Result<RefundResult>> {
  const transaction = await TransactionModel.findOne(
    { _id: data.transaction, wallet: data.wallet, owner: data.owner },
  );

  if (!transaction) {
    return {
      error: "Transaction not found",
    };
  }

  const validation = validateRefund(data, { status: transaction.status, type: transaction.type })
  if (validation.error) {
    return { error: validation.error }
  }

  context.queues.transactions.add(`${data.transaction}:refund`, { _id: data.transaction })

  return {
    data: {
      _id: data.transaction
    }
  }
}
