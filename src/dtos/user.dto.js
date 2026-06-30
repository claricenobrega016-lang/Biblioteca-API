class UserResponseDTO {
    constructor(user) {
        this.id = user._id.toString();
        this.nome = user.nome;
        this.email = user.email;
        this.telefone = user.telefone;
        this.funcao = user.funcao;
    }
}

export default UserResponseDTO;