# 📚 Biblioteca API

API de gerenciamento de uma biblioteca desenvolvida com Node.js, Express e MongoDB. O sistema possui autenticação, controle de permissões por papéis (admin e usuário comum) e um sistema completo de empréstimos de livros.

---

## 🚀 Tecnologias utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- JWT (autenticação)
- bcrypt (hash de senhas)
- Pug (views/templates)

---

## 🔐 Funcionalidades

### 👨‍💼 Administrador (Admin)

- Gerenciar usuários do sistema
  - Listar usuários cadastrados
  - Atualizar papel (role) do usuário
  - Excluir usuários
- Gerenciar livros
  - Criar livros
  - Atualizar livros
  - Excluir livros
- Gerenciar empréstimos
  - Criar empréstimos
- Visualizar histórico geral de empréstimos

---

### 👤 Usuário comum

- Listar todos os livros disponíveis
- Visualizar empréstimos ativos próprios
- Visualizar histórico de empréstimos próprios
- Editar informações do próprio perfil

---

## 🔑 Autenticação e Permissões

A API utiliza **JWT (JSON Web Token)** para autenticação.

- Senhas criptografadas com **bcrypt**
- Controle de acesso baseado em papéis:
  - `admin`
  - `user`

---

## 🧪 Usuários para teste

### 👨‍💼 Admin
- email: admin@gmail.com
- senha: 123456

### 👤 Usuário comum
- email: selm@gmail.com
- senha: 123456

## 🌐 Deploy

API disponível em produção:

https://biblioteca-api-u5im.onrender.com/
