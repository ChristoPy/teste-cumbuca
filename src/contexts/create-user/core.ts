import { hashSync } from 'bcrypt';
import { Result } from "../../models/result";
import { PublicUser, UserModel } from '../../models/user';
import { RegisterInput } from "../register/types";

export async function createUser(data: RegisterInput): Promise<Result<PublicUser>> {
  const hash = hashSync(data.password, 10);
  const newUser = await UserModel.create({
    name: data.name,
    email: data.email,
    password: hash,
    taxId: `${data.taxId.type}:${data.taxId.number}`
  });
  await newUser.save();

  return {
    data: {
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      taxId: data.taxId,
    },
  }
}
