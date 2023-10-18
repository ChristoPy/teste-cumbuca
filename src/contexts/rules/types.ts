import { TransactionStatus, TransactionType } from "../../models/transaction";

export interface TransactionData {
  status: TransactionStatus;
  type: TransactionType;
}
