import { ERROR401,  STANDARD } from '../helpers/constants'
import * as JWT from 'jsonwebtoken'
import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../helpers/utils'
import { IUserAuthToken } from 'interfaces'

export const userAuth = (request: FastifyRequest, reply: FastifyReply, next: any) => {
    try {
        let token = request.headers.cookie.split("=")[1] ?? null
        if (!token && request.headers.authorization.split(" ")[1]) {
            token = request.headers.authorization.split(" ")[1]
        }
        JWT.verify(token, process.env.APP_JWT_SECRET)
        next()
	} catch (err) {
		reply.code(ERROR401.statusCode).send({message: ERROR401.message})
	}
    
}

export const isAdmin = async (request: FastifyRequest, reply: FastifyReply, next: any) => {
    try {
        
        let token = request.headers.cookie.split("=")[1] ?? null
        if (!token && request.headers.authorization.split(" ")[1]) {
            token = request.headers.authorization.split(" ")[1]
        }
        const decode_token: IUserAuthToken = JWT.verify(token, process.env.APP_JWT_SECRET) as IUserAuthToken
        const user = await prisma.user.findUnique({ where: { id: decode_token.id } })
        if (user.role === "USER") {
            reply.code(ERROR401.statusCode).send({message: ERROR401.message})
        }
        next()
	} catch (err) {
		reply.code(ERROR401.statusCode).send({message: ERROR401.message})
	}
    
}

export const isLogin = async (request: FastifyRequest, reply: FastifyReply, next: any) => {
    try {
        
        let token = request.headers.cookie.split("=")[1] ?? null
        if (!token && request.headers.authorization.split(" ")[1]) {
            token = request.headers.authorization.split(" ")[1]
        }
        const decode_token: IUserAuthToken = JWT.verify(token, process.env.APP_JWT_SECRET) as IUserAuthToken
        //const user = await prisma.user.findUnique({ where: { id: decode_token.id } })
        reply.code(STANDARD.SUCCESS).send({  id: decode_token.id })
        next()
	} catch (err) {
		reply.code(ERROR401.statusCode).send({message: ERROR401.message})
	}
    
}