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
    transaction.updatedAt = Date.now()
    transaction.save()

    throw new Error('Wallet not found for transaction ID: ' + transaction.wallet)
  }

  if (transaction.refund) {
    wallet.balance -= transaction.amount
    transaction.status = 'refunded'
  } else {
    if (transaction.type === 'deposit') {
      wallet.balance += transaction.amount
    }
    if (transaction.type === 'withdraw') {
      wallet.balance -= transaction.amount
    }
  
    transaction.status = 'done'
  }

  transaction.updatedAt = Date.now()
  wallet.updatedAt = Date.now()

  await wallet.save()
  await transaction.save()

  fastify.redis.set(`wallet:${wallet.id}`, JSON.stringify({ _id: wallet.id, balance: wallet.balance }));
}
