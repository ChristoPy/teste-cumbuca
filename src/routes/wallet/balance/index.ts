import { FastifyPluginAsync, RouteOptions } from "fastify"
import handler from "../../../contexts/get-wallet-balance/handler"
import { validateToken } from "../../../middlewares/auth"

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const options: RouteOptions = {
    method: 'GET',
    url: '/',
    preHandler: validateToken,
    handler: async function (request, reply) {
      return handler(fastify, request, reply)
    }
  }
  fastify.route(options)
}

export default example;
