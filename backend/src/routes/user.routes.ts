import { Router } from "express";
import { UserController } from "../controllers/UserController";
import 'dotenv/config';

const router = Router();
const controller = new UserController();

router.get("/:id", controller.searchUserById);

router.post("/", controller.createUser);
router.post("/login", controller.login);

export { router };