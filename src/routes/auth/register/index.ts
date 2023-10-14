import { FastifyPluginAsync, RouteOptions } from "fastify"
import handler from "../../../contexts/register/handler"

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const options: RouteOptions = {
    method: 'POST',
    url: '/',
    schema: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
          taxId: {
            type: 'object',
            properties: {
              type: { type: 'string', enum: ['CPF', 'CNPJ'] },
              number: { type: 'string' }
            },
            required: ['type', 'number']
          },
        },
        required: ['name', 'email', 'password', 'taxId'],
      },
    },
    handler: async function (request, reply) {
      return handler(fastify, request, reply)
    }
  }
  fastify.route(options)
}

export default example;
