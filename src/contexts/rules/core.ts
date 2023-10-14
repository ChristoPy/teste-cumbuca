import { Result } from "../../models/result";
import { UserModel } from "../../models/user";
import { RegisterInput } from "../register/types";

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
