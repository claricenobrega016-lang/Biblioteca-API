import UserRepository from '../repositories/user.repository.js';
import UserResponseDTO from '../dtos/user.dto.js';
import LoanRepository from '../repositories/loan.repository.js';
import bcrypt from "bcrypt";

class UserService {

    static async create(userData) {
        const { nome, email, senha, telefone } = userData;

        const existingUser = await UserRepository.findByEmail(email);

        if (existingUser) {
            const error = new Error('Este e-mail já está em uso.');
            error.statusCode = 409;
            throw error;
        }

        const senhaHash = await bcrypt.hash(senha, 10);
        const telefoneFormatado = telefone?.replace(/\D/g, '');

        const newUserFromDb = await UserRepository.create({
            nome,
            email,
            senha: senhaHash,
            telefone: telefoneFormatado
        });

        return new UserResponseDTO(newUserFromDb);
    }

    static async findAll() {
        return await UserRepository.findAll();
    }

    static async findById(id) {
        const user = await UserRepository.findById(id);
        if (!user) {
            const error = new Error('Usuário não encontrado.');
            error.statusCode = 404;
            throw error;
        }
        return user;
    }

    static async update(id, updateData) {
        await this.findById(id);

        const { senha, telefone } = updateData;

        if (senha) {
            updateData.senha = await bcrypt.hash(senha, 10);
        }

        if (telefone) {
            updateData.telefone = telefone.replace(/\D/g, '');
        }

        const updatedUser = await UserRepository.update(id, updateData);
        return new UserResponseDTO(updatedUser);
    }

    static async delete(id, requestingUser) {
        const isSelfDelete = String(id) === String(requestingUser.id);
        const isAdmin = requestingUser.funcao === "admin";

        if (!isSelfDelete && !isAdmin) {
            const error = new Error("Usuário sem permissão para excluir esta conta.");
            error.statusCode = 403;
            throw error;
        }

        const user = await this.findById(id);
        if (!user) {
            const error = new Error("Usuário não encontrado.");
            error.statusCode = 404;
            throw error;
        }

        const activeLoans = await LoanRepository.findActiveByUserId(id);

        if (activeLoans && activeLoans.length > 0) {
            const error = new Error(`Não é possível excluir o usuário. Ele possui ${activeLoans.length} empréstimo(s) ativo(s) pendente(s) de devolução.`);
            error.statusCode = 400;
            throw error;
        }

        return UserRepository.delete(id);
    }

    static async login(email, senha) {
        const user = await UserRepository.findByEmail(email);

        if (!user) {
            const error = new Error('Credenciais inválidas.');
            error.statusCode = 401;
            throw error;
        }

        const validPassword = await bcrypt.compare(senha, user.senha);

        if (!validPassword) {
            const error = new Error('Credenciais inválidas.');
            error.statusCode = 401;
            throw error;
        }

        return new UserResponseDTO(user);
    }
}

export default UserService;