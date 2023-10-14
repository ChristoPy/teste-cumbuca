import { hashSync } from 'bcrypt';
import { PublicUser, UserModel } from "../../models/user";
import { RegisterInput } from "./types";
import { Result } from '../../models/result';
import { validateUserTaxId, verifyUserExists } from '../rules/core';

export async function register(data: RegisterInput): Promise<Result<PublicUser>> {
  const userExists = await verifyUserExists(data);
  if (userExists.error) {
    return { error: userExists.error }
  }
  const userTaxId = validateUserTaxId(data);
  if (userTaxId.error) {
    return { error: userTaxId.error }
  }

  const hash = hashSync(data.password, 30);
  const newUser = await UserModel.create({
    name: data.name,
    email: data.email,
    password: hash,
    taxId: `${data.taxId.type}:${data.taxId.number}`
  });
  await newUser.save();

  return {
    data: {
      _id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      taxId: data.taxId,
    },
  }
}
