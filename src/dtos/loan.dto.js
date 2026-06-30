class LoanDto {
  constructor({ userId, bookId, dueDate }) {
    this.userId = userId;
    this.bookId = bookId;
    this.dueDate = dueDate;
  }
}

export default LoanDto;