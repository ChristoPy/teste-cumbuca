import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { transfer } from "./core";

async function handler(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  const { amount, receiver } = request.body as { amount: number, receiver: string }
  const result = await transfer({
    amount,
    receiver,
    wallet: request.wallet._id,
    owner: request.user._id
  }, fastify)

  return result.data!
}

export default handler;
