import { FastifyPluginAsync, RouteOptions } from "fastify"
import handler from "../../../contexts/transfer/handler"
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
          receiver: { type: 'string', maxLength: 24, minLength: 24 },
        },
        required: ['amount', 'receiver'],
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
