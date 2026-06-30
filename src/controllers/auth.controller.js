import jwt from "jsonwebtoken";
import UserService from "../services/user.service.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const authController = async (req, res, next) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).send("Email e senha são obrigatórios.");
        }

        const user = await UserService.login(email, senha);

        const payload = {
            id: user.id,
            email: user.email,
            funcao: user.funcao
        };

        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "1h"
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000
        });

        return res.redirect('/dashboard');

    } catch (error) {
        next(error);
    }
};