const DisciplinaRepository = require("../repositories/DisciplinaRepository");

class DisciplinaService {
  constructor() {
    this.repository = new DisciplinaRepository();
  }

  async criar(dados) {
    if (!dados.nome || !dados.usuarioId) {
      throw new Error("Nome e usuário são obrigatórios.");
    }

    if (dados.nome.trim().length < 2) {
      throw new Error("O nome da disciplina deve ter pelo menos 2 caracteres.");
    }

  
    const disciplinas = await this.repository.listarTodos();

    const duplicada = disciplinas.find(
      (disciplina) =>
        disciplina.nome.toLowerCase() === dados.nome.trim().toLowerCase() &&
        disciplina.usuarioId == dados.usuarioId
    );

    if (duplicada) {
      throw new Error("Esse usuário já possui essa disciplina.");
    }

    return await this.repository.criar({
      nome: dados.nome.trim(),
      usuarioId: dados.usuarioId,
    });
  }

  async listarTodos() {
    return await this.repository.listarTodos();
  }

  async buscarPorId(id) {
    return await this.repository.buscarPorId(id);
  }

  async atualizar(id, dados) {
    const disciplina = await this.repository.buscarPorId(id);

    if (!disciplina) {
      return null;
    }

    if (dados.nome && dados.nome.trim().length < 2) {
      throw new Error("O nome da disciplina deve ter pelo menos 2 caracteres.");
    }

    return await this.repository.atualizar(id, dados);
  }

  async excluir(id) {
    return await this.repository.excluir(id);
  }
}

module.exports = DisciplinaService;