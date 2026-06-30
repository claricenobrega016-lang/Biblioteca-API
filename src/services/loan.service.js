import LoanRepository from "../repositories/loan.repository.js";
import BookModel from "../models/book.model.js";

class LoanService {
    static async create(dto) {

        const book = await BookModel.findById(dto.bookId);

        if (!book) throw new Error("Livro não encontrado");

        if (book.qtdDisponivel <= 0) {
            throw new Error("Sem estoque");
        }

        book.qtdDisponivel -= 1;
        await book.save();

        const due = new Date(dto.dueDate);
        due.setUTCHours(12, 0, 0, 0);

        const loan = await LoanRepository.create({
            user: dto.userId,
            book: dto.bookId,
            dueDate: due
        });

        return loan;
    }

    static async getAllLoans() {
        return LoanRepository.findAll();
    }

    static async getActiveLoans(){
        return LoanRepository.findActiveLoans();
    }

    static async getActiveLoansByUserId(userId){
        return LoanRepository.findActiveByUserId(userId);
    }

    static async returnBook(id) {
        const loan = await LoanRepository.findById(id);

        if (!loan) {
            throw new Error("Empréstimo não encontrado");
        }

        if (loan.status === "DEVOLVIDO") {
            throw new Error("Livro já devolvido");
        }

        const book = await BookModel.findById(loan.book.id);

        if (book) {
            book.qtdDisponivel += 1;
            await book.save();
        }

        return LoanRepository.update(id, {
            returnDate: new Date(),
            status: "DEVOLVIDO"
        });
    }

    static async findByUser(userId) {
        return LoanRepository.findByUser(userId);
    }
}

export default LoanService;