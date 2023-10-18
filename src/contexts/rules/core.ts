import { cpf, cnpj } from 'cpf-cnpj-validator';
import { Result } from "../../models/result";
import { UserModel } from "../../models/user";
import { RegisterInput } from "../register/types";
import { RefundInput } from '../refund/types';
import { TransactionData } from './types';

export async function verifyUserExists(data: RegisterInput): Promise<Result<true>> {
  const existingUser = await UserModel.findOne({
    $or: [
      { email: data.email },
      { taxId: `${data.taxId.type}:${data.taxId.number}` }
    ]
  });

  if (!existingUser) return { data: true }

  if (existingUser.email === data.email) {
    return { error: 'E-mail already in use' };
  }
  return { error: 'User with the same TaxId already exists' };
}

export function validateUserTaxId(data: RegisterInput): Result<true> {
  if (data.taxId.type === 'CPF' && !cpf.isValid(data.taxId.number)) {
    return { error: 'Invalid CPF' }
  }

  if (data.taxId.type === 'CNPJ' && !cnpj.isValid(data.taxId.number)) {
    return { error: 'Invalid CNPJ' }
  }

  return { data: true }
}

export function validateRefund(transaction: TransactionData): Result<true> {
  const validations = [
    transaction.status === 'refunded',
    transaction.status === 'failed',
    transaction.type === 'withdraw'
  ]

  if (validations.some(validation => validation)) {
    return {
      error: "Transaction cannot be refunded",
    };
  }

  return { data: true }
}
