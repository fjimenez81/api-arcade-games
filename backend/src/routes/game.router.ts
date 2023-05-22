import { FastifyInstance } from 'fastify'
import { loginSchema, signupSchema } from '../schema'
import * as controllers from '../controllers'
import { userAuth } from 'middleware'

async function gameRouter(fastify: FastifyInstance) {
  fastify.decorateRequest('games', '')

  fastify.route({
    method: 'POST',
    url: '/create',
    preHandler: [userAuth],
    handler: controllers.createGame,
  })

  fastify.route({
    method: 'PUT',
    url: '/update/:id',
    preHandler: [userAuth],
    handler: controllers.updateGame,
  })

  fastify.route({
    method: 'GET',
    url: '/showgame/:id',
    preHandler: [userAuth],
    handler: controllers.getGame,
  })

  fastify.route({
    method: 'GET',
    url: '/showgames',
    preHandler: [userAuth],
    handler: controllers.getAllGames,
  })

  fastify.route({
    method: 'DELETE',
    url: '/removegame/:id',
    preHandler: [userAuth],
    handler: controllers.deleteGame,
  })

  fastify.route({
    method: 'DELETE',
    url: '/removegames',
    preHandler: [userAuth],
    handler: controllers.deleteAllGames,
  })

  fastify.route({
    method: 'GET',
    url: '/publish-games',
    handler: controllers.getPublishGames,
  })
}

export default gameRouter