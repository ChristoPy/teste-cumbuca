import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

async function handler(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  return { amount: request.wallet.amount }
}

export default handler;
