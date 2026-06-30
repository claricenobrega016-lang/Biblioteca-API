import BookModel from "../models/book.model.js";

class BookRepository {

    static async findAll() {
        return await BookModel.find();
    }

    static async findById(id) {
        return await BookModel.findById(id);
    }

    static async create(bookData) {
        return await BookModel.create(bookData);
    }

    static async update(id, updateBook) {
        return await BookModel.findByIdAndUpdate(
            id,
            updateBook,
            {
                new: true,
                runValidators: true
            }
        );
    }

    static async delete(id) {
        const deletedBook = await BookModel.findByIdAndDelete(id);
        return !!deletedBook;
    }
}

export default BookRepository;