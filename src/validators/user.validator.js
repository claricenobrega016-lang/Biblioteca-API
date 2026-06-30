import { body } from "express-validator";
import validate from "../middlewares/validator.middleware.js";

export const userValidationRules = [
    body('nome').trim().notEmpty().withMessage('O nome é obrigatório!'),
    body('email').trim().isEmail().withMessage('Insira um email válido!').normalizeEmail(),
    body('telefone').trim().notEmpty().withMessage('O telefone é obrigatório!'),
    body('senha').isLength({ min: 5 }).withMessage('A senha deve conter pelo menos 5 caracteres!'),
    body('funcao').optional().isIn(['admin', 'comum']).withMessage('A função deve ser admin ou comum.'),
    
    validate
]
