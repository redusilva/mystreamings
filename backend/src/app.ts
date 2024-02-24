import express, { Application, Request, Response, NextFunction } from "express";

import { router as userRoutes } from "./routes/user.routes";
import { router as spendingRoutes } from "./routes/spending.routes";

const app: Application = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/spendings", spendingRoutes);

app.use("/", (req: Request, res: Response, next: NextFunction): void => {
    res.json({ message: "Allo! Catch-all route." });
});

export default app;