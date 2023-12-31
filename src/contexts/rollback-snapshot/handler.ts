import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { rollback } from "./core";

async function handler(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  const { snapshot } = request.body as { snapshot: string }
  const result = await rollback({snapshot}, fastify)

  return result.error ? result : result.data
}

export default handler;
