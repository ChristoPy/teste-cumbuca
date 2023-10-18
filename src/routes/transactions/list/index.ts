import { FastifyPluginAsync, RouteOptions } from "fastify"
import handler from "../../../contexts/list-transactions/handler"
import { validateToken } from "../../../middlewares/auth"

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const options: RouteOptions = {
    method: 'GET',
    url: '/',
    schema: {
      querystring: {
        type: 'object',
        properties: {
          startDate: { type: 'string', pattern: '^[0-9]{2}/[0-9]{2}/[0-9]{4}$' },
          endDate: { type: 'string', pattern: '^[0-9]{2}/[0-9]{2}/[0-9]{4}$' },
        },
        required: ['startDate', 'endDate']
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
