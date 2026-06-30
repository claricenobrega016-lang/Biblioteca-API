export const globalErrorHandler = (error, req, res, next) => {
  console.error("ERRO DETECTADO:", error.message);
  console.error("Stack:", error.stack);
  
  const statusCode = error.statusCode || 500;
  
  const userMessage = error.statusCode ? error.message : 'Ocorreu um erro interno no servidor.';

  res.status(statusCode);

  res.render('error', {
    status: statusCode,
    message: userMessage,
    stack: process.env.NODE_ENV === 'development' ? error.stack : null
  });
};