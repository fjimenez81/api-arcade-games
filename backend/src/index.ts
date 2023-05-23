import fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import pino from 'pino';
import gameRouter from 'routes/game.router';
import userRouter from 'routes/user.router';
//import gameRouter from 'routes/index';
import type { FastifyCookieOptions } from '@fastify/cookie'
import cookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';

const port_listen = process.env.API_PORT || 5000;

const startServer = () => {
	try {
		const server = fastify({
			logger: pino({ level: 'info' }),
		})
		server.register(fastifyCors, {
			credentials: true,
			origin: "http://localhost:5173"
		})
		server.register(fastifyHelmet)
		server.register(cookie, {
			secret: process.env.APP_JWT_SECRET,
			parseOptions: {}
		  } as FastifyCookieOptions)
		server.register(userRouter, { prefix: '/api/user' })
		server.register(gameRouter, { prefix: '/api/games' })
		server.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply): void => {
			server.log.error(error);
		})
		server.get('/', (request: FastifyRequest, reply: FastifyReply): void => {
			reply.send({ message: 'Hello, welcome to arcade games!' })
		})
		server.listen({ port: 5000, host: '0.0.0.0' }, (err, address) => {
			if (err) {
				console.error(err)
				process.exit(1)
			}
			console.log(`Server listening at ${address}`)
		})
	} catch (e) {
		console.error(e)
	}
}

process.on('unhandledRejection', (e) => {
	console.error(e)
	process.exit(1)
})

startServer()