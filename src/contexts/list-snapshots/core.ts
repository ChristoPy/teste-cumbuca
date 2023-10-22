import { ListSnapshotsInput, ListSnapshotsResult } from "./types";
import { SnapshotModel } from "../../models/snapshot";
import { Result } from "../../models/result";

export async function listSnapshots(data: ListSnapshotsInput): Promise<Result<ListSnapshotsResult>> {
  const snapshots = await SnapshotModel.find().sort({ createdAt: 1 });

  if (!snapshots) {
    return {
      error: 'Could not load snapshots'
    }
  }

  return {
    data: {
      snapshots: snapshots.map((snapshot) => ({
        _id: snapshot.id,
        wallets: snapshot.wallets.map((wallet) => ({
          _id: wallet.id,
          balance: wallet.balance
        }))
      })),
      total: snapshots.length,
    }
  }
}
