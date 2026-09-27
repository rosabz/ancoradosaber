const bcrypt = require("bcrypt");
const UsuarioRepository = require("../repositories/UsuarioRepository");

class UsuarioService {
  constructor() {
    this.repository = new UsuarioRepository();
  }

  // Remove a senha antes de enviar o usuário para a API
  removerSenha(usuario) {
    if (!usuario) {
      return null;
    }

    const dados = usuario.toJSON ? usuario.toJSON() : { ...usuario };

    delete dados.senha;

    return dados;
  }

  async criar(dados) {
    // Validação dos campos obrigatórios
    if (!dados.nome || !dados.email || !dados.senha) {
      throw new Error("Nome, email e senha são obrigatórios.");
    }

    // Validação do nome
    if (dados.nome.trim().length < 3) {
      throw new Error("O nome deve ter pelo menos 3 caracteres.");
    }

    // Validação do email
    if (!dados.email.includes("@")) {
      throw new Error("Informe um email válido.");
    }

    // Validação da senha
    if (dados.senha.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres.");
    }

    // Regra: não permitir email duplicado
    const usuarioExistente = await this.repository.buscarPorEmail(
      dados.email
    );

    if (usuarioExistente) {
      throw new Error("Email já cadastrado.");
    }

    // Criptografa a senha antes de salvar
    const senhaHash = await bcrypt.hash(dados.senha, 10);

    const usuario = await this.repository.criar({
      nome: dados.nome,
      email: dados.email,
      senha: senhaHash,
    });

    return this.removerSenha(usuario);
  }

  async listarTodos() {
    const usuarios = await this.repository.listarTodos();

    return usuarios.map((usuario) => this.removerSenha(usuario));
  }

  async buscarPorId(id) {
    const usuario = await this.repository.buscarPorId(id);

    return this.removerSenha(usuario);
  }

  async atualizar(id, dados) {
    const usuario = await this.repository.buscarPorId(id);

    if (!usuario) {
      return null;
    }

    if (dados.nome && dados.nome.trim().length < 3) {
      throw new Error("O nome deve ter pelo menos 3 caracteres.");
    }

    if (dados.email && !dados.email.includes("@")) {
      throw new Error("Informe um email válido.");
    }

    // Se estiver alterando a senha, criptografa antes de salvar
    if (dados.senha) {
      if (dados.senha.length < 6) {
        throw new Error("A senha deve ter pelo menos 6 caracteres.");
      }

      dados.senha = await bcrypt.hash(dados.senha, 10);
    }

    const usuarioAtualizado = await this.repository.atualizar(id, dados);

    return this.removerSenha(usuarioAtualizado);
  }

  async excluir(id) {
    return await this.repository.excluir(id);
  }
}

module.exports = UsuarioService;