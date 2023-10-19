import { Schema, ObjectId } from "mongoose";
import db from "../database";

export interface Wallet {
  _id: ObjectId;
  owner: ObjectId;
  balance: number;
  createdAt: number;
  updatedAt: number;
}

export interface PublicWallet {
  _id: string;
  balance: number;
}

export const WalletSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, default: 0 },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number },
});

export const WalletModel = db.model("Wallet", WalletSchema);
