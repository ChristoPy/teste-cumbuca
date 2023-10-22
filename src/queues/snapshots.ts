import { SnapshotModel } from "../models/snapshot"
import { WalletModel } from "../models/wallet"
import { ProcessorInjectedContext } from "../plugins/queues"

export interface RollbackSnapshotJob {
  _id: string
}

export default async function ({ job, fastify }: ProcessorInjectedContext<RollbackSnapshotJob>) {
  const snapshot = await SnapshotModel.findOne({ _id: job.data._id })
  if (!snapshot) {
    throw new Error('Snapshot not found for ID: ' + job.data._id)
  }

  const timestamp = Date.now()

  for (const snapshottedWallet of snapshot.wallets) {
    const wallet = await WalletModel.findOne({ _id: snapshottedWallet._id })

    if (!wallet) {
      console.error(`Wallet for ID ${snapshottedWallet._id} was not found`)
      continue
    }

    wallet.balance = snapshottedWallet.balance
    wallet.updatedAt = timestamp

    await wallet.save()
    fastify.redis.set(`wallet:${wallet.id}`, JSON.stringify({ _id: wallet.id, balance: wallet.balance }));
  }

  await fastify.queues.transactions.resume()
}
