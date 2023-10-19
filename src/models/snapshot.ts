import { Schema, ObjectId } from "mongoose";
import db from "../database";

export interface Snapshot {
  _id: ObjectId;
  timestamp: number;
  wallets: SnapshotWallet;
}

export interface SnapshotWallet {
  wallet: ObjectId;
  balance: number;
}

export interface PublicSnapshot {
  _id: string;
  wallets: SnapshotWallet[];
}

const WalletBalanceSchema = new Schema({
  wallet: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
  balance: { type: Number, required: true },
});

export const SnapshotSchema = new Schema({
  timestamp: { type: Number, required: true },
  wallets: [WalletBalanceSchema],
});

export const SnapshotModel = db.model("Snapshot", SnapshotSchema);
