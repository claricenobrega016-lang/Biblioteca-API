import UserModel from "../models/user.model.js";

class UserRepository {

    static async findAll() {
        return await UserModel.find();
    }

    static async findById(id) {
        return await UserModel.findById(id);
    }

    static async findByEmail(email) {
        return await UserModel.findOne({ email });
    }

    static async create(userData) {
        return await UserModel.create(userData);
    }

    static async update(id, data) {
        const user = await UserModel.findByIdAndUpdate(
            id,
            data,
            {
                returnDocument: 'after'
            }
        );

        return user;
    }

    static async delete(id) {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        return !!deletedUser;
    }
}

export default UserRepository;