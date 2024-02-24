import { PrismaClient, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Newuser } from '../interfaces/UserInterface';
import 'dotenv/config';

export class UserModel {

    async findUserById(id: number, database: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
        return database.usuarios.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                email: true,
                nome: true,
            }
        });
    }

    async findUserByEmail(email: string, database: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
        return database.usuarios.findUnique({
            where: {
                email: email,
            }
        });
    }

    async createUser(data: Newuser, database: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
        return database.usuarios.create({
            data: {
                email: data.email,
                senha: data.password,
                nome: data.name
            },
            select: {
                id: true,
            }
        })
    }

}