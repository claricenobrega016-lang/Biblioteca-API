import UserService from '../services/user.service.js';
import UserResponseDTO from '../dtos/user.dto.js';

class UserController {
    
    static async listUsers(req, res, next) {
        try {
            const users = await UserService.findAll();
            const usersDto = users.map(user => new UserResponseDTO(user));
            res.status(200).json(usersDto);

        } catch (error) {
            next(error);
        }
    }

    static async addUser(req, res, next) {
        try {
            const newUserDto = await UserService.create(req.body);
            res.status(201).json(newUserDto);

        } catch (error) {
            next(error);
        }
    }

    static async viewUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await UserService.findById(id);
            res.status(200).json(new UserResponseDTO(user));

        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req, res, next) {
        try {
            const { id } =  req.params;

            if (!id) {
                return res.status(401).json({ message: "Usuário não identificado pelo token." });
            }

            const updatedUser = await UserService.update(id, req.body);
            res.status(200).json(updatedUser);

        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            await UserService.delete(id, req.user);
            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }

    static async loginUser(email, senha) {
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

        return user;
    }
}

export default UserController;