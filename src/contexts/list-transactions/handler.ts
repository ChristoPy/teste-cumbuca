import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { listTransactions } from "./core";

async function handler(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  const { startDate, endDate } = request.query as { startDate: string, endDate: string }
  const { error, data } = await listTransactions({
    startDate,
    endDate,
    wallet: request.wallet._id,
    owner: request.user._id
  })

  if (error) {
    reply.status(400)
    return { error }
  }

  return data
}

export default handler;
