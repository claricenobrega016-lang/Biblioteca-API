import BookService from "../services/book.service.js";
import UserService from "../services/user.service.js";
import LoanService from "../services/loan.service.js";

class WebController {

  static async renderHome(req, res, next) {
    try {
      res.render('home', { title: 'Bem-vindo à Biblioteca API' });

    } catch (error) {
      next(error);
    }
  }

  static async renderLogin(req, res, next) {
    try {
      res.render('login', { title: 'Entrar - Biblioteca API' });

    } catch (error) {
      next(error);
    }
  }

  static async renderRegister(req, res, next) {
    try {
      res.render('register', { title: 'Criar Conta - Biblioteca API' });

    } catch (error) {
      next(error);
    }
  }

  static async renderAdminDashboard(req, res, next) {
    try {
      const books = await BookService.getAllBooks();
      const users = await UserService.findAll();
      const admin = req.user;
      const loans = await LoanService.getActiveLoans();

      res.render('admin', {
        title: 'Painel do Administrador',
        admin: admin,
        books: books,
        users: users,
        loans: loans
      });

    } catch (error) {
      next(error);
    }
  }

  static async renderUserDashboard(req, res, next) {
    try {
      const user = req.user;
      const books = await BookService.getAllBooks();
      const loans = await LoanService.getActiveLoansByUserId(user.id);

      res.render('user', {
        title: 'Painel do Usuário',
        user,
        books,
        loans
      });

    } catch (error) {
      next(error);
    }
  }

  static async renderLoansHistory(req, res, next) {
    try {
      const user = req.user;
      let loans;

      if (user && user.funcao === 'admin') {
        loans = await LoanService.getAllLoans();
      } else {
        loans = await LoanService.findByUser(user.id);
      }

      res.render("loans-history", {
        title: "Histórico de Empréstimos",
        user,
        loans
      });

    } catch (error) {
      next(error);
    }
  }

  static async renderAddBookPage(req, res, next) {
    try {
      res.render('add-book', { title: 'Cadastrar Novo Livro' });

    } catch (error) {
      next(error);
    }
  }

  static async renderEditBookPage(req, res, next) {
    try {
      const { id } = req.params;

      const book = await BookService.getBookById(id);

      return res.render('edit-book', { book });

    } catch (error) {
      next(error);
    }
  }

  static async renderEditProfilePage(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserService.findById(id);
      res.render('edit-profile', { user });

    } catch (error) {
      next(error);
    }
  }

  static async renderAdminEditUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserService.findById(id);
      res.render('admin-edit-user', { user });

    } catch (error) {
      next(error);
    }
  }

  static async redirecionarDashboard(req, res, next) {
    try {
      if (req.user && req.user.funcao === 'admin') {
        return res.redirect(`/admin`);
      }
      res.redirect(`/user`);

    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res) {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).send('Erro ao fazer logout');
        }
        res.redirect('/login');
      });
    } else {
      res.clearCookie('token');
      res.redirect('/login');
    }
  }

  static async renderLoanCreatePage(req, res, next) {
    try {
      const { id } = req.params;
      const book = await BookService.getBookById(id);
      const users = await UserService.findAll();

      if (!book) {
        return res.redirect('/dashboard');
      }

      const hoje = new Date();
      const ano = hoje.toLocaleDateString('en-US', { year: 'numeric', timeZone: 'America/Sao_Paulo' });
      const mes = hoje.toLocaleDateString('en-US', { month: '2-digit', timeZone: 'America/Sao_Paulo' });
      const dia = hoje.toLocaleDateString('en-US', { day: '2-digit', timeZone: 'America/Sao_Paulo' });

      return res.render('loan-book', {
        book,
        users,
        loanDate: `${ano}-${mes}-${dia}`
      });

    } catch (error) {
      next(error);
    }
  }
}

export default WebController;