import { PublicTransaction } from "../../models/transaction";

export interface ListTransactionsInput {
  wallet: string;
  owner: string;
  startDate: string;
  endDate: string;
}

export interface ListTransactionsResult {
  transactions: PublicTransaction[];
  total: number;
}
