import { compareSync } from 'bcrypt';
import { nanoid } from "nanoid";
import { TaxId, UserModel } from "../../models/user";
import { LoginInput, LoginResult } from "./types";
import { Result } from '../../models/result';
import { WalletModel } from '../../models/wallet';

export async function login(data: LoginInput): Promise<Result<LoginResult>> {
  const user = await UserModel.findOne({ email: data.email });
  if (!user) {
    return { error: 'E-mail or password is incorrect' }
  }

  const match = compareSync(data.password, user.password);
  if (!match) {
    return { error: 'E-mail or password is incorrect' }
  }

  const wallet = await WalletModel.findOne({ owner: user._id })
  if (!wallet) {
    return { error: 'Could not load user wallet' }
  }

  const token = nanoid(32)

  const parts = user.taxId.split(':')
  const taxId: TaxId = {
    type: parts[0] as TaxId['type'],
    number: parts[1]
  }

  return {
    data: {
      token,
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
        taxId,
      },
      wallet: {
        _id: wallet.id,
        amount: wallet.amount
      }
    },
  }
}
