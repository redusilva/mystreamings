import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NewfixedExpenses, FixedExpenses } from "../interfaces/SpendingInterface";

export class SpendingModel {

    async createFixedExpenses(data: NewfixedExpenses, database: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {

        await database.$transaction(async (trx) => {
            const fixedExpense = await trx.gastosrecorrentes.create({
                data: {
                    nome: data.name,
                    valor: data.value,
                },
                select: {
                    id: true
                }
            });

            await trx.usuariosgastosrecorrentes.create({
                data: {
                    idGastosRecorrentes: fixedExpense.id,
                    idUsuario: data.userId
                }
            });
        });

    }

    async findFixedExpenses(userId: number, database: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
        return database.$queryRaw`
            SELECT 
                gr.id AS id,
                gr.nome AS name,
                CONCAT('R$ ', FORMAT(gr.valor, 2)) AS value
            FROM
                usuariosgastosrecorrentes ugr
            INNER JOIN
                gastosrecorrentes gr
                ON ugr.idGastosRecorrentes = gr.id
            WHERE
                ugr.idUsuario = ${userId}
            ORDER BY
                gr.nome;
        `;
    }

    async updateFixedExpenses(data: FixedExpenses, database: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
        return database.gastosrecorrentes.update({
            where: {
                id: data.id,
            },
            data: {
                nome: data.name,
                valor: Number(data.value)
            }
        })
    }

    async deleteFixedExpenses(id: number, database: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
        return database.$transaction(async (trx) => {
            await trx.gastosrecorrentes.delete({
                where: {
                    id: id
                }
            });

            await trx.usuariosgastosrecorrentes.deleteMany({
                where: {
                    idGastosRecorrentes: id
                }
            });
        })
    }

}