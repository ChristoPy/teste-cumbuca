import { PublicSnapshot } from "../../models/snapshot";

export interface ListSnapshotsInput {
  wallet: string;
  owner: string;
}

export interface ListSnapshotsResult {
  snapshots: PublicSnapshot[];
  total: number;
}
