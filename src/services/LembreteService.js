const LembreteRepository = require("../repositories/LembreteRepository");

class LembreteService {
  constructor() {
    this.repository = new LembreteRepository();
  }

  async criar(dados) {
    if (!dados.descricao || !dados.dataHora || !dados.usuarioId) {
      throw new Error(
        "Descrição, data e usuário são obrigatórios."
      );
    }

    if (dados.descricao.trim().length < 3) {
      throw new Error("A descrição deve ter pelo menos 3 caracteres.");
    }

    const data = new Date(dados.dataHora);

    if (isNaN(data.getTime())) {
      throw new Error("Informe uma data e hora válidas.");
    }

    return await this.repository.criar({
      descricao: dados.descricao.trim(),
      dataHora: dados.dataHora,
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
    const lembrete = await this.repository.buscarPorId(id);

    if (!lembrete) {
      return null;
    }

    if (dados.descricao && dados.descricao.trim().length < 3) {
      throw new Error("A descrição deve ter pelo menos 3 caracteres.");
    }

    if (dados.dataHora) {
      const data = new Date(dados.dataHora);

      if (isNaN(data.getTime())) {
        throw new Error("Informe uma data e hora válidas.");
      }
    }

    return await this.repository.atualizar(id, dados);
  }

  async excluir(id) {
    return await this.repository.excluir(id);
  }
}

module.exports = LembreteService;