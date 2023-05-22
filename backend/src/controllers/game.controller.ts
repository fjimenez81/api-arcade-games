import { FastifyReply } from 'fastify'
import { IGameRequest, IUserRequest } from '../interfaces'
import { prisma } from '../helpers/utils'
import { ERRORS, handleServerError } from '../helpers/errors'
import * as JWT from 'jsonwebtoken'
import { utils } from '../helpers/utils'
import { ERROR500, ERROR400, STANDARD, ERROR401 } from '../helpers/constants'

export const createGame = async (request: IGameRequest, reply: FastifyReply) => {

	try {
        
        const {title, content, year, front, back, manufacturer, publish, region} = request.body
        let token = request.headers.cookie.split("=")[1] ?? null
        if (!token && request.headers.authorization.split(" ")[1]) {
            token = request.headers.authorization.split(" ")[1]
        }
        const user_id: IUserRequest = JWT.decode(token) as IUserRequest
        //const user = await prisma.user.findUnique({ where: { id: user_id } })
        const newGame = await prisma.game.create({
			data: {
                title,
                content,
                year,
                front,
                back,
                region,
                manufacturer,
                publish,
                userId: parseInt(user_id.id)
			},
		})
		reply.code(STANDARD.SUCCESS).send({ mesage: "Game created!", newGame })
	} catch (err) {
		handleServerError(reply, err)
    } 
}

export const updateGame = async (request: IGameRequest, reply: FastifyReply) => {

	try {
        
        const {title, content, year, front, back, manufacturer, publish, region} = request.body
        
        const gameid: number = parseInt(request.params.id)
        const game = await prisma.game.findUnique({ where: { id: gameid } })
        const game_update = await prisma.game.update({
            where: { id: gameid },
            data: {
                title,
                content,
                year,
                front,
                back,
                region,
                manufacturer,
                publish
            }})
		reply.code(STANDARD.SUCCESS).send({ mesage: "Game updated!"})
	} catch (err) {
		handleServerError(reply, err)
	} 
}

export const getGame = async (request: IGameRequest, reply: FastifyReply) => {

	try {
        
        const gameid: number = parseInt(request.params.id)
        const game = await prisma.game.findUnique({ where: { id: gameid } })
        
		reply.code(STANDARD.SUCCESS).send({ mesage: "Show Game!", game})
	} catch (err) {
		handleServerError(reply, err)
	} 
}

export const getAllGames = async (request: IGameRequest, reply: FastifyReply) => {

	try {
        
        const games = await prisma.game.findMany()
        
		reply.code(STANDARD.SUCCESS).send({ mesage: "Show Games!", games})
	} catch (err) {
		handleServerError(reply, err)
	} 
}

export const deleteGame = async (request: IGameRequest, reply: FastifyReply) => {

	try {
        
        const gameid: number = parseInt(request.params.id)
        const game = await prisma.game.delete({ where: { id: gameid }})
        
		reply.code(STANDARD.SUCCESS).send({ mesage: "Game removed!", game})
	} catch (err) {
		handleServerError(reply, err)
	} 
}

export const deleteAllGames = async (request: IGameRequest, reply: FastifyReply) => {

	try {
        
        const games = await prisma.game.deleteMany()
        
		reply.code(STANDARD.SUCCESS).send({ mesage: "All game has been removed!", games})
	} catch (err) {
		handleServerError(reply, err)
	} 
}

export const getPublishGames = async (request: IGameRequest, reply: FastifyReply) => {

	try {
        
        const games = await prisma.game.findMany({ where: { publish: true }})
        
		reply.code(STANDARD.SUCCESS).send({ mesage: "Show publish Games!", games})
	} catch (err) {
		handleServerError(reply, err)
	} 
}
