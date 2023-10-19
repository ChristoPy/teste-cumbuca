import { FastifyInstance } from "fastify";
import { WalletModel } from "../../models/wallet";
import { SnapshotModel } from "../../models/snapshot";

export async function snapshotWallets(context: FastifyInstance) {
  await context.queues.transactions.pause()

  const wallets = await WalletModel.find()
  if (!wallets) {
    return {
      error: "Could not find Wallets"
    }
  }

  const timestamp = Date.now()
  const snapshot = await SnapshotModel.create({
    createdAt: timestamp,
    wallets
  })
  snapshot.save()

  await context.queues.transactions.resume()

  return {
    data: {
      _id: snapshot.id
    }
  }
}
