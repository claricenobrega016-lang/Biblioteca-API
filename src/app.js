import 'dotenv/config';
import express from "express";
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';

import { globalErrorHandler } from "./middlewares/error.middleware.js";
import BookRoutes from "./routes/book.routes.js";
import UserRoutes from "./routes/user.routes.js";
import WebRoutes from "./routes/web.routes.js";
import AuthRoutes from "./routes/auth.routes.js";
import LoanRoutes from "./routes/loan.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middlewares Globais
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Middleware de Log
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Rotas da API
app.use('/api/books', BookRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/loans', LoanRoutes);

// Rotas Web (Frontend/Pug)
app.use('/', WebRoutes);

// Middleware de erro global
app.use(globalErrorHandler);

export default app;