import { FastifyReply } from 'fastify'
import { IUserRequest } from '../interfaces'
import { prisma } from '../helpers/utils'
import { ERRORS, handleServerError } from '../helpers/errors'
import * as JWT from 'jsonwebtoken'
import { utils } from '../helpers/utils'
import { ERROR500, ERROR400, STANDARD, ERROR401 } from '../helpers/constants'

export const login = async (request: IUserRequest, reply: FastifyReply) => {
	try {

		const { email, password } = request.body
		
		const user = await prisma.user.findUnique({ where: { email: email } })
		
		if (!user) {
			reply.code(ERROR400.statusCode).send(ERRORS.userNotExists)
		}
		const checkPass = await utils.compareHash(user.password, password)
		
		if (!checkPass) {
			reply.code(ERROR400.statusCode).send(ERRORS.userCredError)
		}
		
		const token = JWT.sign({ id: user.id }, process.env.APP_JWT_SECRET, { expiresIn: '8h' })
		reply.setCookie("x-access-token", token, {
            httpOnly: true,
            secure: false,
			path: "/",
            expires: new Date(Date.now() + 1 * 24 * 60 * 1000)})
		reply.code(STANDARD.SUCCESS).send({ id: user.id, token })
	} catch (err) {
		handleServerError(reply, err)
	}
}

export const signUp = async (request: IUserRequest, reply: FastifyReply) => {
	try {
		const { email, password, name } = request.body

		const user = await prisma.user.findUnique({ where: { email: email } })
		if (user) {
			reply.code(409).send(ERRORS.userExists)
		}
		const hashPass = await utils.genSalt(10, password)
		const role = email === process.env.INIT_ADMIN ? "ADMIN" : "USER"
		const createUser = await prisma.user.create({
			data: {
				email,
				name: email.split("@")[0],
				password: String(hashPass),
				role
			},
		})
		const token = JWT.sign({ id: createUser.id }, process.env.APP_JWT_SECRET, { expiresIn: '8h' })
		
		reply
			.code(STANDARD.SUCCESS)
			.send({ message: "User created!" })
		
	} catch (err) {
		handleServerError(reply, err)
	}
}

export const updateUser = async (request: IUserRequest, reply: FastifyReply) => {
	try {
		const { email, password, name } = request.body

		const user = await prisma.user.findUnique({ where: { email: email } })
		if (!user) {
			reply.code(409).send(ERRORS.userNotExists)
		}
		
		const updateUser = await prisma.user.update({ where: { email: email },
			data: {
				email,
				name,
			}
		})
		
		reply
			.code(STANDARD.SUCCESS)
			.send({ message: "User updated!" })
		
	} catch (err) {
		handleServerError(reply, err)
	}
}

export const logOut = (request: IUserRequest, reply: FastifyReply) => {
	try {
		
		reply.clearCookie("x-access-token", { path: "/" })
		reply.code(STANDARD.SUCCESS).send({ message: "LogOut!"})
	} catch (err) {
		handleServerError(reply, err)
	}
}

export const loginStatus = (request: IUserRequest, reply: FastifyReply) => {
	try {
		
		reply.code(STANDARD.SUCCESS).send({ message: true })
	} catch (err) {
		handleServerError(reply, err)
	}
}

export const getUser = async (request: IUserRequest, reply: FastifyReply) => {
	try {
		const iduser = parseInt(request.params.id)
		
		const user = await prisma.user.findUnique({ where: { id: iduser } })
		if (!user) {
			reply.code(409).send(ERRORS.userNotExists)
		}
		
		reply
			.code(STANDARD.SUCCESS)
			.send({ user })
		
	} catch (err) {
		handleServerError(reply, err)
	}
}

export const getAllUsers = async (request: IUserRequest, reply: FastifyReply) => {
	try {
		

		const users = await prisma.user.findMany()
		
		reply
			.code(STANDARD.SUCCESS)
			.send({ users })
		
	} catch (err) {
		handleServerError(reply, err)
	}
}

export const deleteUser = async (request: IUserRequest, reply: FastifyReply) => {
	try {
		
		const iduser = parseInt(request.params.id)
		const user = await prisma.user.delete({ where: { id: iduser } })
		if (!user) {
			reply.code(409).send(ERRORS.userNotExists)
		}
		reply
			.code(STANDARD.SUCCESS)
			.send({ user })
		
	} catch (err) {
		handleServerError(reply, err)
	}
}