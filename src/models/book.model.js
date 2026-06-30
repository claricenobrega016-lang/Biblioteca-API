import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'O título é obrigatório.'],
        trim: true
    },

    autor: {
        type: String,
        required: [true, 'O autor é obrigatório.'],
        trim: true
    },

    anoPub: {
        type: Number,
        required: [true, 'O ano de publicação é obrigatório.'],
        min: [0, 'Ano inválido.']
    },

    categ: {
        type: String,
        required: [true, 'A categoria é obrigatória.']
    },

    qtdTotal: {
        type: Number,
        required: [true, 'A quantidade total é obrigatória.'],
        min: [0, 'A quantidade não pode ser negativa.']
    },

    qtdDisponivel: {
        type: Number,
        required: [true, 'A quantidade disponível é obrigatória.'],
        min: [0, 'A quantidade não pode ser negativa.']
    }

}, {
    timestamps: true
});

const BookModel = mongoose.model("Book", bookSchema);

export default BookModel;