import { PublicUser, TaxId } from "../../models/user";
import { PublicWallet } from "../../models/wallet";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  taxId: TaxId;
}

export interface RegisterResult {
  user: PublicUser;
  wallet: PublicWallet;
}
