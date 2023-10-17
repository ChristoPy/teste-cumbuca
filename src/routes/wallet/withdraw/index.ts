import { FastifyPluginAsync, RouteOptions } from "fastify"
import handler from "../../../contexts/withdraw/handler"
import { validateToken } from "../../../middlewares/auth"

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const options: RouteOptions = {
    method: 'POST',
    url: '/',
    schema: {
      body: {
        type: 'object',
        properties: {
          amount: { type: 'number', minimum: 1 },
        },
        required: ['amount'],
      },
    },
    preHandler: validateToken,
    handler: async function (request, reply) {
      return handler(fastify, request, reply)
    }
  }
  fastify.route(options)
}

export default example;
