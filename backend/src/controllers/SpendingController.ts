import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { SpendingModel } from "../models/SpendingModel";
import { NewfixedExpenses, FixedExpenses } from "../interfaces/SpendingInterface";

export class SpendingController {

    async CreateFixedExpenses(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const model = new SpendingModel();

        try {

            const data: NewfixedExpenses = req.body;
            const necessaryProperties = ["name", "value", "userId"];
            const properties = Object.keys(data);

            for (const property of necessaryProperties) {
                if (!properties.includes(property)) {
                    return res.status(400).json({ message: "Dados inválidos!" });
                }
            }

            await model.createFixedExpenses(data, prisma);
            return res.status(201).json({ message: "Gasto recorrente criado com sucesso!" });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro interno no servidor!" });
        } finally {
            prisma.$disconnect();
        }

    }

    async showUserFixedExpenses(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const model = new SpendingModel();

        try {

            const userId = Number(req.params.id);
            const fixedExpenses = await model.findFixedExpenses(userId, prisma);
            return res.status(201).json({ fixedExpenses });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro interno no servidor!" });
        } finally {
            prisma.$disconnect();
        }

    }

    async updateFixedExpenses(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const model = new SpendingModel();

        try {

            const data: FixedExpenses = req.body;
            const necessaryProperties = ["name", "value", "id"];
            const properties = Object.keys(data);

            for (const property of necessaryProperties) {
                if (!properties.includes(property)) {
                    return res.status(400).json({ message: "Dados incompletos!" });
                }
            }

            await model.updateFixedExpenses(data, prisma);

            return res.status(200).json({ message: "Gasto recorrente atualizado com sucesso!" });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro interno no servidor!" });
        } finally {
            prisma.$disconnect();
        }
    }

    async deleteFixedExpenses(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const model = new SpendingModel();

        try {

            const id = Number(req.params.id);
            if (!id) {
                return res.status(400).json({ message: "ID de gasto fixo é inválido!" });
            }

            await model.deleteFixedExpenses(id, prisma);
            return res.status(200).json({ message: "Gasto fixo excluído com sucesso!" });

        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Não foi possível excluir o gasto fixo!" });
        } finally {
            prisma.$disconnect();
        }

    }


}