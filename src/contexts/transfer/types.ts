export interface TransferInput {
  owner: string;
  wallet: string;
  receiver: string;
  amount: number;
}

export interface TransferResult {
  _id: string;
}
