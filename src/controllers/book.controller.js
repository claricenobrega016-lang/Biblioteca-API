import BookService from "../services/book.service.js";

class BookController {

    static async getBooks(req, res, next) {
        try {
            const responseData = await BookService.getAllBooks();
            res.status(200).json(responseData);
            
        } catch (error) {
            next(error); 
        }
    }

    static async getBooksById(req, res, next) {
        try {
            const { id } = req.params;
            const book = await BookService.getBookById(id);
            res.status(200).json(book);

        } catch (error) {
            next(error);
        }
    }

    static async addBook(req, res, next) {
        try {
            const newBook = await BookService.createBook(req.body);
            res.status(201).json(newBook);

        } catch (error) {
            next(error);
        }
    }

    static async updateBook(req, res, next) {
        try {
            const { id } = req.params;
            const updatedBook = await BookService.updateBook(id, req.body);
            res.status(200).json(updatedBook);

        } catch (error) {
            next(error);
        }
    }

    static async deleteBook(req, res, next) {
        try {
            const { id } = req.params;
            await BookService.deleteBook(id);
            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }
}

export default BookController;