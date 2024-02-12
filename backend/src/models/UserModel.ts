import 'dotenv/config';
import { Db, ObjectId } from 'mongodb';

interface NewUser {
    firstName: string;
    secondName: string;
    email: string;
    password: string;
}

export class UserModel {

    async findUserById(id: string, database: Db) {
        const table = database.collection("users");
        return table.findOne({ _id: new ObjectId(id) }, {
            projection: {
                password: 0
            }
        });
    }

    async findUserByEmail(email: string, database: Db) {
        const table = database.collection("users");
        return table.findOne({ email });
    }

    async createUser(data: NewUser, database: Db) {
        const table = database.collection("users");

        const createdUser = await table.insertOne({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
            active: true,
            admin: false
        });

        return createdUser.insertedId;
    }

}