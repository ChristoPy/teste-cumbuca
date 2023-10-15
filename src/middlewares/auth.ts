import { FastifyReply, FastifyRequest, preHandlerHookHandler } from "fastify";
import { PublicUser } from "../models/user";
import { PublicWallet } from "../models/wallet";

interface TokenData {
  user: string
  wallet: string
}

export const validateToken: preHandlerHookHandler = async function validateToken(request: FastifyRequest, reply: FastifyReply, done: Function) {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) {
    reply.status(401).send({ error: 'Unauthorized' });
    return;
  }

  const parts = authorizationHeader.split(' ');
  if (parts.length !== 2) {
    reply.status(401).send({ error: 'Unauthorized' });
    return;
  }

  const token = parts[1];
  const tokenData = await this.redis.get(`token:${token}`)
  if (!tokenData) {
    reply.status(401).send({ error: 'Unauthorized' });
    return;
  }

  const tokenDataAsObject = JSON.parse(tokenData) as TokenData

  const user = await this.redis.get(`user:${tokenDataAsObject.user}`)
  if (!user) {
    reply.status(401).send({ error: 'Unauthorized' });
    return;
  }
  const wallet = await this.redis.get(`wallet:${tokenDataAsObject.wallet}`)
  if (!wallet) {
    reply.status(401).send({ error: 'Unauthorized' });
    return;
  }

  request.user = JSON.parse(user);
  request.wallet = JSON.parse(wallet);
  request.token = token;
};

declare module 'fastify' {
  interface FastifyRequest {
    user: PublicUser
    wallet: PublicWallet
    token: string
  }
}
