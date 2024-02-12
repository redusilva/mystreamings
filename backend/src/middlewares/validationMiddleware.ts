import { body, validationResult } from 'express-validator';
import { Response, Request, NextFunction } from "express";

// Middleware de validação para o formulário de registro de usuário
const validateUserRegistration = [

    body('firstName').notEmpty().isString(),
    body('secondName').notEmpty().isString(),
    body('email').isEmail(),
    body('password').isLength({ min: 8 }).notEmpty(),
    body('password').isStrongPassword(),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: {
                    message: 'Dados inválidos e/ou incompletos!'
                }
            });
        }
        next(); // Avança para a próxima função de middleware ou rota
    }
];

export {
    validateUserRegistration
}