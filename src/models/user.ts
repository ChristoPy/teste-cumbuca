import { Schema, ObjectId } from "mongoose";
import db from "../database";

export interface TaxId {
  type: 'CPF' | 'CNPJ'
  number: string
}

export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  taxId: string;
  password: string;
  createdAt: number;
  updatedAt: number;
}

export interface PublicUser {
  _id: string;
  name: string;
  email: string;
  taxId: TaxId;
}

export const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  taxId: { type: String, required: true },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
});

export const UserModel = db.model("User", UserSchema);
