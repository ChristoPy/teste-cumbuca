import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

async function handler(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  return { balance: request.wallet.balance }
}

export default handler;
