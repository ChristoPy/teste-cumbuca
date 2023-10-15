import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { LoginInput } from "./types";
import { login } from "./core";

async function handler(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  const { error, data } = await login(request.body as LoginInput)

  if (error) {
    reply.status(401).send({ message: error });
    return;
  }

  fastify.redis.set(`user:${data!.user._id}`, JSON.stringify(data!.user));
  fastify.redis.set(`wallet:${data!.wallet._id}`, JSON.stringify(data!.wallet));
  fastify.redis.set(`token:${data!.token}`, JSON.stringify({ user: data!.user._id, wallet: data!.wallet._id }), 'EX', 86400);
  reply.status(200).send(data);
}

export default handler;
