import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { listSnapshots } from "./core";

async function handler(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  const { error, data } = await listSnapshots({
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
