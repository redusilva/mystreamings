import { Router, Request, Response } from "express";
import { MongoClient } from "mongodb";
import 'dotenv/config';
import { UserController } from "../controllers/UserController";

const router = Router();
const controller = new UserController();

router.post("/", controller.createUser);

export { router };