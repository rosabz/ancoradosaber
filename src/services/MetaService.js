const MetaRepository = require("../repositories/MetaRepository");

class MetaService {
  constructor() {
    this.repository = new MetaRepository();
  }

  async criar(dados) {
    if (!dados.descricao || !dados.usuarioId) {
      throw new Error("Descrição e usuário são obrigatórios.");
    }

    if (dados.descricao.trim().length < 3) {
      throw new Error("A descrição deve ter pelo menos 3 caracteres.");
    }

    const percentual = dados.percentual ?? 0;

    if (percentual < 0 || percentual > 100) {
      throw new Error("O percentual deve estar entre 0 e 100.");
    }

    return await this.repository.criar({
      descricao: dados.descricao.trim(),
      percentual: percentual,
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
    const meta = await this.repository.buscarPorId(id);

    if (!meta) {
      return null;
    }

    if (dados.descricao && dados.descricao.trim().length < 3) {
      throw new Error("A descrição deve ter pelo menos 3 caracteres.");
    }

    if (
      dados.percentual !== undefined &&
      (dados.percentual < 0 || dados.percentual > 100)
    ) {
      throw new Error("O percentual deve estar entre 0 e 100.");
    }

    return await this.repository.atualizar(id, dados);
  }

  async excluir(id) {
    return await this.repository.excluir(id);
  }
}

module.exports = MetaService;