import { TransactionModel } from "../models/transaction"
import { WalletModel } from "../models/wallet"
import { ProcessorInjectedContext } from "../plugins/queues"

export interface TransactionsJob {
  _id: string
}

export default async function ({ job, fastify }: ProcessorInjectedContext<TransactionsJob>) {
  const transaction = await TransactionModel.findOne({ _id: job.data._id })
  if (!transaction) {
    throw new Error('Transaction not found for transaction ID: ' + job.data._id)
  }
  const wallet = await WalletModel.findOne({ _id: transaction.wallet })
  if (!wallet) {
    transaction.status = 'failed'
    transaction.save()

    throw new Error('Wallet not found for transaction ID: ' + transaction.wallet)
  }

  if (transaction.type === 'deposit') {
    wallet.amount += transaction.amount
  }
  if (transaction.type === 'withdraw') {
    wallet.amount -= transaction.amount
  }

  transaction.status = 'done'

  wallet.save()
  transaction.save()
}
