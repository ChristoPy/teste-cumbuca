export interface RefundInput {
  owner: string;
  wallet: string;
  transaction: string;
}

export interface RefundResult {
  _id: string;
}
