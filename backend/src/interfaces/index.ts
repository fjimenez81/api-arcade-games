import { FastifyRequest } from 'fastify';
import { Prisma, User } from '@prisma/client';

export interface IUserRequest extends FastifyRequest {
    body: Prisma.UserCreateInput
    authUser: User
    params: {
        id: string
    }
}

export interface IGameRequest extends FastifyRequest {
    body: Prisma.GameCreateInput
    title: string
    content: string
    params: {
        id: string
    }
}

export interface IUserAuthToken {
    id: number;
}

export interface IGetPresign {
    fileName: string;
}

export interface IPutPresign {
    userId: number;
    fileName: string;
}