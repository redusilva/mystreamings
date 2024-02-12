import { Response, Request } from "express";
import client from "../../config/database";
import { Db } from "mongodb";
import bcrypt from "bcrypt";
import { UserModel } from "../models/UserModel";

interface NewUser {
    firstName: string;
    secondName: string;
    email: string;
    password: string;
}

export class UserController {

    async searchUserById(req: Request, res: Response) {

        let database: Db;
        try {
            client.connect();

            database = client.db(process.env.DATABASE_NAME);
            const model = new UserModel();

            const { id } = req.params;
            const user = await model.findUserById(id, database);
            return res.status(200).json(user);

        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Erro ao buscar o usuário!" });
        } finally {
            client.close();
        }
    }

    async createUser(req: Request, res: Response) {

        let database: Db;

        try {
            client.connect();
            database = client.db(process.env.DATABASE_NAME);
            const model = new UserModel();

            const { firstName, secondName, email, password }: NewUser = req.body;

            const user = await model.findUserByEmail(email, database);
            if (user) {
                return res.status(400).json({ message: "Email já cadastrado na base de dados!" });
            }

            const salt = bcrypt.genSaltSync(Number(process.env.PASSWORD_SALTS));
            const hash = bcrypt.hashSync(password, salt);

            const data = {
                firstName,
                secondName,
                email,
                password: hash
            };

            const createdUser = await model.createUser(data, database);

            res.status(200).json({
                message: {
                    user_id: createdUser.toString(),
                    text: "Usuário criado com sucesso!",
                }
            });

        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Erro ao criar o usuário!" });
        } finally {
            client.close();
        }

    }

}