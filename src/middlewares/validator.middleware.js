import { validationResult } from "express-validator";

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        if (req.xhr || req.headers.accept?.includes('json') || req.originalUrl.startsWith('/api')) {
            return res.status(400).json({
                sucesso: false,
                errors: errors.array()
            });
        }

        const listaDeErros = errors.array().map(err => err.msg).join(', ');
        const mensagemCustomizada = `Dados inválidos: ${listaDeErros}`;

        const validationError = new Error(mensagemCustomizada);
        validationError.statusCode = 400; 
        return next(validationError);
    }
    
    next();
};

export default validate;