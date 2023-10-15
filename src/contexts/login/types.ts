import { PublicUser } from "../../models/user";
import { PublicWallet } from "../../models/wallet";

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResult {
  token: string;
  user: PublicUser;
  wallet: PublicWallet;
}
