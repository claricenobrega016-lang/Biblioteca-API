class BookResponseDTO {
    constructor(book) {
        this.id = book._id.toString();
        this.titulo = book.titulo;
        this.autor = book.autor;
        this.anoPub = book.anoPub;
        this.categ = book.categ;
        this.qtdTotal = book.qtdTotal;
        this.qtdDisponivel = book.qtdDisponivel;
    }
}

export default BookResponseDTO;