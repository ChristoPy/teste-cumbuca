import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { deposit } from "./core";

async function handler(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  const { amount } = request.body as { amount: number }
  const result = await deposit({
    amount,
    wallet: request.wallet._id,
    owner: request.user._id
  }, fastify)

  return result.data!
}

export default handler;
