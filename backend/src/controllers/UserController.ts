import { Response, Request } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../models/UserModel";
import { PrismaClient } from '@prisma/client';
import { Newuser } from "../interfaces/UserInterface";
import jwt from "jsonwebtoken";

export class UserController {

    async createUser(req: Request, res: Response) {

        const prisma = new PrismaClient();
        const model = new UserModel();

        try {

            const data: Newuser = req.body as Newuser;
            const necessaryProperties = ["name", "email", "password"];
            const properties = Object.keys(data);

            for (const property of necessaryProperties) {
                if (!properties.includes(property)) {
                    return res.status(400).json({ message: "Dados inválidos!" });
                }
            }

            const user = await model.findUserByEmail(data.email, prisma);
            if (user) {
                return res.status(400).json({ message: "Email já cadastrado na base de dados!" });
            }

            const salt = bcrypt.genSaltSync(Number(process.env.PASSWORD_SALTS));
            const hash = bcrypt.hashSync(data.password, salt);

            const userData: Newuser = {
                ...data,
                password: hash
            };

            const createdUser = await model.createUser(userData, prisma);

            res.status(200).json({
                message: {
                    userId: createdUser.id,
                    text: "Usuário criado com sucesso!",
                }
            });

        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Erro ao criar o usuário!" });
        } finally {
            prisma.$disconnect();
        }

    }

    async searchUserById(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const model = new UserModel();

        try {

            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "ID do usuário é inválido!" });
            }

            const user = await model.findUserById(Number(id), prisma);

            return res.status(200).json({
                user: {
                    id: user?.id,
                    email: user?.email,
                    name: user?.nome
                }
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erro interno no servidor!" });
        } finally {
            prisma.$disconnect();
        }

    }

    async login(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const model = new UserModel();

        try {

            const data = req.body;
            const necessaryProperties = ["email", "password"];
            const properties = Object.keys(data);

            for (const property of necessaryProperties) {
                if (!properties.includes(property)) {
                    return res.status(400).json({ message: "Envie os dados necessários para fazer o login!" });
                }
            }

            const user = await model.findUserByEmail(data.email, prisma);
            if (!user) {
                return res.status(400).json({ message: "Usuário não encontrado!" });
            }

            const checkPassword = bcrypt.compareSync(user.senha, data.password);
            console.log("user.senha", data.password);
            console.log("user.senha", user.senha);
            console.log("checkPassword", checkPassword);
            if (!checkPassword) {
                return res.status(400).json({ message: "Senha inválida!" });
            }

            const token = jwt.sign({
                id: user.id,
                name: user.nome,
                email: user.email
            }, process.env.SECRET_KEY as string, {
                expiresIn: "10d"
            });

            return res.status(200).json({
                token,
                message: "Login efetuado com sucesso!"
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erro interno no servidor!" });
        } finally {
            prisma.$disconnect();
        }

    }

}