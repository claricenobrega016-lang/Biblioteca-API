import { body } from "express-validator"
import validate from "../middlewares/validator.middleware.js"

export const bookValidationRules = [
    body('titulo').trim().notEmpty().withMessage('O título é obrigatório!').isLength({ min: 2 }).withMessage('O título deve ter no mínimo 2 caracteres.'),
    body('autor').trim().notEmpty().withMessage('O nome do autor é obrigatório!'),
    body('anoPub').isInt({ max: 2026 }).withMessage('O ano de publicação do livro não pode ser maior que o ano atual.'),
    body('qtdTotal').isInt({ min: 0 }).withMessage('A quantidade total não pode ser negativa.'),
    body('categ').notEmpty().withMessage('A categoria é obrigatória!'),
    body('qtdDisponivel').isInt({ min: 0}).withMessage('Quantidade disponível inválida!'),

    validate
]