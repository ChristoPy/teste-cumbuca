import { RollbackSnapshotInput, RollbackSnapshotResult } from "./types";
import { FastifyInstance } from "fastify";
import { Result } from "../../models/result";
import { SnapshotModel } from "../../models/snapshot";

export async function rollback(data: RollbackSnapshotInput, context: FastifyInstance): Promise<Result<RollbackSnapshotResult>> {
  const snapshot = await SnapshotModel.findOne({ _id: data.snapshot });

  if (!snapshot) {
    return {
      error: "Snapshot not found",
    };
  }

  await context.queues.transactions.pause()
  context.queues.snapshots.add(`${data.snapshot}:rollback-snapshot`, { _id: data.snapshot })

  return {
    data: {
      _id: data.snapshot
    }
  }
}
