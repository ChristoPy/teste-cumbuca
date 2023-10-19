import { FastifyPluginAsync, RouteOptions } from "fastify"
import handler from "../../../../contexts/snapshot-wallets/handler"

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const options: RouteOptions = {
    method: 'POST',
    url: '/',
    handler: async function (request, reply) {
      return handler(fastify, request, reply)
    }
  }
  fastify.route(options)
}

export default example;
