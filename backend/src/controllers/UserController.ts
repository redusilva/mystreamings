import { Response, Request } from "express";

export class UserController {

    async createUser(req: Request, res: Response) {
        res.json({ message: "Hello World!" });
    }

}