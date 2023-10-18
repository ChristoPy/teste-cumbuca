import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { refund } from "./core";

async function handler(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  const { transaction } = request.body as { transaction: string }
  const result = await refund({
    transaction,
    wallet: request.wallet._id,
    owner: request.user._id
  }, fastify)

  return result.error ? result.error : result.data
}

export default handler;
