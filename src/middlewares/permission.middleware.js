export const checkRole = (requiredRole) => {
    return (req, res, next) => {
        const user = req.user;
        
        if (!user || user.funcao?.toLowerCase() !== requiredRole.toLowerCase()) {
            const message = 'Acesso negado. Você não tem permissões suficientes para acessar este recurso.';

            if (req.xhr || req.headers.accept?.includes('json') || req.baseUrl.includes('/api') || req.originalUrl.startsWith('/api')) {
                return res.status(403).json({ message });
            }

            const error = new Error(message);
            error.statusCode = 403; 
            return next(error);
        }
        
        next();
    };
};