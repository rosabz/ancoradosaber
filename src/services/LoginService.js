const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UsuarioRepository = require("../repositories/UsuarioRepository");

class LoginService {
  constructor() {
    this.repository = new UsuarioRepository();
  }

  async login(email, senha) {
    if (!email || !senha) {
      throw new Error("Email e senha são obrigatórios.");
    }

    const usuario = await this.repository.buscarPorEmail(email);

    if (!usuario) {
      throw new Error("Email ou senha incorretos.");
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      throw new Error("Email ou senha incorretos.");
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return {
      mensagem: "Login realizado com sucesso.",
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    };
  }
}

module.exports = LoginService;