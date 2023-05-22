import { FastifyInstance } from 'fastify'
import { loginSchema, signupSchema } from '../schema'
import * as controllers from '../controllers'
import { isAdmin, isLogin, userAuth } from 'middleware'

async function userRouter(fastify: FastifyInstance) {
	fastify.decorateRequest('authUser', '')

	fastify.route({
		method: 'POST',
		url: '/login',
		schema: loginSchema,
		handler: controllers.login,
	})

	fastify.route({
		method: 'POST',
		url: '/signup',
		schema: signupSchema,
		handler: controllers.signUp,
	})

	fastify.route({
		method: 'PUT',
		url: '/updateuser',
		schema: signupSchema,
		handler: controllers.updateUser,
	})

	fastify.route({
		method: 'GET',
		url: '/getuser/:id',
		preHandler: [isAdmin],
		handler: controllers.getUser,
	})

	fastify.route({
		method: 'GET',
		url: '/getusers',
		preHandler: [isAdmin],
		handler: controllers.getAllUsers,
	})

	fastify.route({
		method: 'DELETE',
		url: '/deleteuser/:id',
		preHandler: [isAdmin],
		handler: controllers.deleteUser,
	})

	fastify.route({
		method: 'POST',
		url: '/logout',
		preHandler: [userAuth],
		handler: controllers.logOut,
	})

	fastify.route({
		method: 'GET',
		url: '/loginstatus',
		preHandler: [isLogin],
		handler: controllers.loginStatus,
	})

}

export default userRouter