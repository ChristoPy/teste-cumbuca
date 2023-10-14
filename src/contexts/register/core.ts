import { RegisterInput, RegisterResult } from "./types";
import { Result } from '../../models/result';
import { validateUserTaxId, verifyUserExists } from '../rules/core';
import { createUser } from "../create-user/core";
import { createWallet } from "../create-wallet/core";

export async function register(data: RegisterInput): Promise<Result<RegisterResult>> {
  const userExists = await verifyUserExists(data);
  if (userExists.error) {
    return { error: userExists.error }
  }
  const userTaxId = validateUserTaxId(data);
  if (userTaxId.error) {
    return { error: userTaxId.error }
  }

  const userResult = await createUser(data)
  const walletResult = await createWallet(userResult.data!._id)

  return {
    data: {
      user: userResult.data!,
      wallet: walletResult.data!,
    }
  }
}
