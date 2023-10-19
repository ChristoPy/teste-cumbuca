import { Schema, ObjectId } from "mongoose";
import db from "../database";

export interface Snapshot {
  _id: ObjectId;
  createdAt: number;
  wallets: WalletSnapshot;
}

export interface WalletSnapshot {
  _id: ObjectId;
  balance: number;
}

export interface PublicSnapshot {
  _id: string;
  wallets: WalletSnapshot[];
}

const WalletSnapshotSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
  balance: { type: Number, required: true },
});

export const SnapshotSchema = new Schema({
  createdAt: { type: Number, required: true },
  wallets: [WalletSnapshotSchema],
});

export const SnapshotModel = db.model("Snapshot", SnapshotSchema);
