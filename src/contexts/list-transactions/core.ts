import { ListTransactionsInput, ListTransactionsResult } from "./types";
import { TransactionModel } from "../../models/transaction";
import { Result } from "../../models/result";
import { validatePeriod } from "../rules/core";

export async function listTransactions(data: ListTransactionsInput): Promise<Result<ListTransactionsResult>> {
  const period = validatePeriod(data)
  if (period.error) {
    return { error: period.error }
  }

  const { startDate, endDate } = period.data!

  const transactions = await TransactionModel.find({
    owner: data.owner,
    wallet: data.wallet,
    createdAt: { $gte: startDate, $lte: endDate }
  })
    .sort({ createdAt: 1 });

  if (!transactions) {
    return {
      error: 'Could not load transactions'
    }
  }

  return {
    data: {
      transactions: transactions.map((transaction) => ({
        _id: transaction.id,
        amount: transaction.amount,
        status: transaction.status,
        type: transaction.type,
        createdAt: transaction.createdAt
      })),
      total: transactions.length,
    }
  }
}
