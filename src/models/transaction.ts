import { Schema, ObjectId } from "mongoose";
import db from "../database";

export type TransactionType = 'deposit' | 'transfer' | 'withdraw';
export type TransactionStatus = 'pending' | 'done' | 'failed' | 'refunded';

export interface Transaction {
  _id: ObjectId;
  owner: ObjectId;
  wallet: ObjectId;
  receiver?: ObjectId;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  refund: boolean;
  createdAt: number;
  updatedAt: number | undefined;
}

export interface PublicTransaction {
  _id: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  createdAt: number;
}

export const TransactionSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  wallet: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'Wallet', required: false },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['deposit', 'transfer', 'withdraw'], required: true },
  status: { type: String, enum: ['pending', 'done', 'failed', 'refunded'], required: true },
  refund: { type: Boolean, required: false, default: false },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number },
});

export const TransactionModel = db.model("Transaction", TransactionSchema);
