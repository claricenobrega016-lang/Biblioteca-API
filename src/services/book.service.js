import BookRepository from "../repositories/book.repository.js";
import BookResponseDTO from "../dtos/book.dto.js";

class BookService {

    static async getAllBooks() {
        const books = await BookRepository.findAll();
        return books.map(book => new BookResponseDTO(book));
    }

    static async getBookById(id) {
        const book = await BookRepository.findById(id);

        if (!book) {
            const error = new Error("Livro não encontrado.");
            error.statusCode = 404;
            throw error;
        }

        return new BookResponseDTO(book);
    }

    static async createBook(bookData) {
        if (!bookData.titulo || !bookData.autor) {
            const error = new Error("Os campos 'titulo' e 'autor' são obrigatórios.");
            error.statusCode = 400;
            throw error;
        }

        const total = Number(bookData.qtdTotal) || 0;

        const disponivel = bookData.qtdDisponivel !== undefined
            ? Number(bookData.qtdDisponivel)
            : total;

        if (disponivel > total) {
            const error = new Error(
                "A quantidade disponível não pode ser maior que a quantidade total."
            );
            error.statusCode = 400;
            throw error;
        }

        const formattedBook = {
            ...bookData,
            anoPub: bookData.anoPub
                ? Number(bookData.anoPub)
                : undefined,
            qtdTotal: total,
            qtdDisponivel: disponivel
        };

        const newBookFromDb = await BookRepository.create(formattedBook);

        return new BookResponseDTO(newBookFromDb);
    }

    static async updateBook(id, updateData) {
        const currentBook = await BookRepository.findById(id);

        if (!currentBook) {
            const error = new Error("Livro não encontrado para atualização.");
            error.statusCode = 404;
            throw error;
        }

        const total = updateData.qtdTotal !== undefined
            ? Number(updateData.qtdTotal)
            : currentBook.qtdTotal;


        const disponivel = updateData.qtdDisponivel !== undefined
            ? Number(updateData.qtdDisponivel)
            : currentBook.qtdDisponivel;


        if (disponivel > total) {
            const error = new Error(
                "A quantidade disponível não pode ser maior que a quantidade total."
            );
            error.statusCode = 400;
            throw error;
        }

        const formattedUpdate = {
            ...updateData,
            anoPub: updateData.anoPub !== undefined
                ? Number(updateData.anoPub)
                : undefined,
            qtdTotal: total,
            qtdDisponivel: disponivel
        };

        const updatedBook = await BookRepository.update(
            id,
            formattedUpdate
        );

        return new BookResponseDTO(updatedBook);
    }


    static async deleteBook(id) {
        const book = await BookRepository.findById(id);

        if (!book) {
            const error = new Error("Livro não encontrado para exclusão.");
            error.statusCode = 404;
            throw error;
        }

        return await BookRepository.delete(id);
    }
}

export default BookService;