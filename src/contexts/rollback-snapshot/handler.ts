import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { refund } from "./core";

async function handler(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  const { snapshot } = request.body as { snapshot: string }
  const result = await refund({snapshot}, fastify)

  return result.error ? result : result.data
}

export default handler;
