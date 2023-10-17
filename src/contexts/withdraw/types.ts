export interface WithdrawInput {
  owner: string;
  wallet: string;
  amount: number;
}

export interface WithdrawResult {
  _id: string;
}
