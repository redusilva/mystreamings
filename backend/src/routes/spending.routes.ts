import { Router } from "express";
import { SpendingController } from "../controllers/SpendingController";
import 'dotenv/config';

const router = Router();
const controller = new SpendingController();

// Gastos Fixos
router.post("/fixed", controller.CreateFixedExpenses);
router.get("/fixed/:id", controller.showUserFixedExpenses);
router.put("/fixed", controller.updateFixedExpenses);
router.delete("/fixed/:id", controller.deleteFixedExpenses);

export { router };