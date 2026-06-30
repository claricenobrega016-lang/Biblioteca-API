import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "O nome é obrigatório."],
        trim: true
    },

    email: {
        type: String,
        required: [true, "O email é obrigatório."],
        unique: true,
        lowercase: true,
        trim: true
    },

    telefone: {
        type: String,
        required: [true, "O telefone é obrigatório."]
    },

    senha: {
        type: String,
        required: [true, "A senha é obrigatória."]
    },

    funcao: {
        type: String,
        required: [true, "A função é obrigatória."],
        enum: ["admin", "comum"],
        default: "comum"
    }

}, {
    timestamps: true
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;