import { TransactionStatus, TransactionType } from "../../models/transaction";

export interface TransactionData {
  status: TransactionStatus;
  type: TransactionType;
}

export interface PeriodData {
  startDate: string;
  endDate: string;
}

export interface PeriodResult {
  startDate: Date;
  endDate: Date;
}
