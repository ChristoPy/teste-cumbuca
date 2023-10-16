import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { deposit } from "./core";

async function handler(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  const { amount } = request.body as { amount: number }
  await deposit({
    amount,
    wallet: request.wallet._id,
    owner: request.user._id
  })

  return { amount: request.wallet.amount }
}

export default handler;
