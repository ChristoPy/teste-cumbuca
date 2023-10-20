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
    await transaction.save()

    throw new Error('Wallet not found for transaction ID: ' + transaction.wallet)
  }

  if (transaction.refund) {
    const receiverWallet = await WalletModel.findOne({ _id: transaction.receiver })
    if (!receiverWallet) {
      transaction.status = 'failed'
      transaction.updatedAt = Date.now()
      await transaction.save()

      throw new Error('Receiver wallet not found for transfer.')
    }

    wallet.balance += transaction.amount
    receiverWallet.balance -= transaction.amount
    
    transaction.status = 'refunded'

    wallet.updatedAt = Date.now()
    receiverWallet.updatedAt = Date.now()

    await receiverWallet.save()
  } else if (transaction.type === 'transfer') {
    if (wallet.balance < transaction.amount) {
      transaction.status = 'failed'
    } else {
      const receiverWallet = await WalletModel.findOne({ _id: transaction.receiver })
      if (!receiverWallet) {
        transaction.status = 'failed'
        transaction.updatedAt = Date.now()
        await transaction.save()

        throw new Error('Receiver wallet not found for transfer.')
      }

      wallet.balance -= transaction.amount
      receiverWallet.balance += transaction.amount

      transaction.status = 'done'

      receiverWallet.updatedAt = Date.now()
      await receiverWallet.save()
    }
  } else {
    if (transaction.type === 'deposit') {
      wallet.balance += transaction.amount
    }
    if (transaction.type === 'withdraw') {
      if (wallet.balance < transaction.amount) {
        transaction.status = 'failed'
      } else {
        wallet.balance -= transaction.amount
      }
    }
    transaction.status = 'done'
  }

  transaction.updatedAt = Date.now()
  wallet.updatedAt = Date.now()

  await wallet.save()
  await transaction.save()

  fastify.redis.set(`wallet:${wallet.id}`, JSON.stringify({ _id: wallet.id, balance: wallet.balance }));
}
