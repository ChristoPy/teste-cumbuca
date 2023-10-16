import { Schema, ObjectId } from "mongoose";
import db from "../database";

export type TransactionType = 'deposit' | 'transfer' | 'withdraw';
export type TransactionStatus = 'pending' | 'done' | 'failed';

export interface Transaction {
  _id: ObjectId;
  owner: ObjectId;
  wallet: ObjectId;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
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
  amount: { type: Number, required: true },
  type: { type: String, enum: ['deposit', 'transfer', 'withdraw'], required: true },
  status: { type: String, enum: ['pending', 'done', 'failed'], default: 'pending' },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number },
});

export const TransactionModel = db.model("Transaction", TransactionSchema);
