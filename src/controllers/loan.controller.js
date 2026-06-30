import LoanService from "../services/loan.service.js";

class LoanController {

    async createLoan(req, res, next) {
        try {
            const { userId, bookId, dueDate, loanDate } = req.body;

            await LoanService.create({
                bookId,
                userId,
                dueDate,
                loanDate
            });

            return res.redirect('/dashboard');

        } catch (error) {
            next(error);
        }
    }

    async findActiveLoans(req, res, next) {
        try {const loans = await LoanService.getActiveLoans();
            const books = await BookService.getAllBooks(); 
            return res.render('dashboard', { 
                user: req.user,
                books: books, 
                loans: loans 
            });

        } catch (error) {
            next(error);
        }
    }

    async findAll(req, res) {
        try {
            const loans =
                await LoanService.getAllLoans();

            return res.json(loans);

        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }

    async returnBook(req, res) {
        try {
            const loan =
                await LoanService.returnBook(
                    req.params.id
                );

            return res.json(loan);

        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    async findMyLoans(req, res) {
        const loans = await LoanService.findByUser(req.user.id);
        return res.status(200).json(loans);
    }
}

export default new LoanController();