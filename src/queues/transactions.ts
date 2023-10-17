import { TransactionStatus, TransactionType } from "../models/transaction"
import { ProcessorInjectedContext } from "../plugins/queues"

export interface TransactionsJob {
  _id: string
  amount: number
  owner: string
  wallet: string
  type: TransactionType
  status: TransactionStatus
}

export default async function ({ job, fastify }: ProcessorInjectedContext<TransactionsJob>) {
  console.log(job.data)
}
