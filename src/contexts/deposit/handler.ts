import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { deposit } from "./core";

async function handler(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  const { amount } = request.body as { amount: number }
  await deposit({
    amount,
    wallet: request.wallet._id,
    owner: request.user._id
  })

  const newAmount = request.wallet.amount + amount
  fastify.redis.set(`wallet:${request.wallet._id}`, JSON.stringify({ ...request.wallet, amount: newAmount }));

  return { amount: newAmount }
}

export default handler;
