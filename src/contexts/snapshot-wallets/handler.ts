import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { snapshotWallets } from "./core";

async function handler(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  const { error, data } = await snapshotWallets(fastify)

  if (error) {
    reply.status(401).send({ error });
    return;
  }

  reply.status(200).send(data);
}

export default handler;
