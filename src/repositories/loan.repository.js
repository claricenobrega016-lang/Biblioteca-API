import LoanModel from "../models/loan.model.js";

class LoanRepository {

    static async create(data) {
        return await LoanModel.create(data);
    }

    static async findAll() {
        return await LoanModel.find()
            .populate("user")
            .populate("book");
    }

    static async findById(id) {
        return await LoanModel.findById(id);
    }

    static async findActiveLoans() {
        return await LoanModel.find({ status: "ATIVO" })
            .populate("user")
            .populate("book");
    }

    static async findActiveByUserId(userId) {
        return await LoanModel.find({ user: userId, status: "ATIVO" })
            .populate("user")
            .populate("book");
    }

    static async update(id, data) {
        return await LoanModel.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );
    }

    static async findByUser(userId) {
        return await LoanModel.find({ user: userId })
            .populate("user")
            .populate("book");
    }
}

export default LoanRepository;