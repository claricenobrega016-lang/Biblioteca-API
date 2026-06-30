import { Router } from 'express';
import WebController from '../controllers/web.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { checkRole } from "../middlewares/permission.middleware.js";

const router = Router();

// ROTAS PÚBLICAS 
router.get('/', WebController.renderHome);
router.get('/login', WebController.renderLogin);
router.get('/register', WebController.renderRegister);
router.get('/logout', WebController.logout)

// ===== ROTAS DAS PÁGINAS INICIAIS (PROTEGIDAS) ===== 

// 1. Rota centralizada: Quem acessar "/dashboard" será redirecionado com base na função (admin ou user)
router.get('/dashboard', authMiddleware, WebController.redirecionarDashboard);

// 2. Rota do painel do Admin (Renderiza o admin.pug)
router.get('/admin', authMiddleware, checkRole('admin'), WebController.renderAdminDashboard);

// 3. Rota do painel do Usuário Comum (Renderiza o user.pug)
router.get('/user', authMiddleware, checkRole('comum'), WebController.renderUserDashboard);

// 4. Rota do painel de edição de dados do usuário pelo Admin (Renderiza admin-edit-user.pug)
router.get('/admin/edit-user/:id', authMiddleware, WebController.renderAdminEditUser);

// 5. Rota do painel de histórico de emprestimos (Renderiza loan-history.pug)
router.get("/loans/history", authMiddleware,  WebController.renderLoansHistory);

// ===== ROTAS DE GERENCIAMENTO ===== 
router.get('/books/new', authMiddleware, checkRole('admin'), WebController.renderAddBookPage);
router.get('/edit-profile/:id', authMiddleware, WebController.renderEditProfilePage);
router.get('/edit-book/:id', authMiddleware, checkRole('admin'), WebController.renderEditBookPage);
router.get('/loan-create/:id', authMiddleware, checkRole('admin'), WebController.renderLoanCreatePage);

export default router;