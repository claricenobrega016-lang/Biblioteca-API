import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    if (req.xhr || req.headers.accept?.includes('json') || req.baseUrl.includes('/api')) {
      return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    const error = new Error('Acesso negado. Você precisa estar autenticado para ver esta página.');
    error.statusCode = 401;
    return next(error);
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
    
  } catch (error) {
    res.clearCookie('token');

    if (req.xhr || req.headers.accept?.includes('json') || req.baseUrl.includes('/api')) {
      return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }

    const authError = new Error('Sua sessão expirou ou o token é inválido. Por favor, faça login novamente.');
    authError.statusCode = 403;
    return next(authError);
  }
};

export default authMiddleware;