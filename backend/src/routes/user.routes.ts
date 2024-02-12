import { Router } from "express";
import 'dotenv/config';
import { UserController } from "../controllers/UserController";
import { validateUserRegistration } from "../middlewares/validationMiddleware";

const router = Router();
const controller = new UserController();

router.get("/:id", controller.searchUserById);

router.post("/", validateUserRegistration, controller.createUser);

export { router };