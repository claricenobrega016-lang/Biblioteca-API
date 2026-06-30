import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },
    loanDate: {
      type: Date,
      default: Date.now
    },
    dueDate: {
      type: Date,
      required: true
    },
    returnDate: {
      type: Date,
      default: null
    },
    status: {
      type: String,
      enum: ["ATIVO", "DEVOLVIDO", "ATRASADO"],
      default: "ATIVO"
    }
  },
  {
    timestamps: true
  }
);

const LoanModel = mongoose.model("Loan", loanSchema);

export default LoanModel;