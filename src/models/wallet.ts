import { Schema, ObjectId } from "mongoose";
import db from "../database";

export interface Wallet {
  _id: ObjectId;
  owner: ObjectId;
  amount: number;
  createdAt: number;
  updatedAt: number;
}

export interface PublicWallet {
  _id: string;
  amount: number;
}

export const WalletSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, default: 0 },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number },
});

export const WalletModel = db.model("Wallet", WalletSchema);
