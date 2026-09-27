const { Lembrete } = require("../models");

class LembreteRepository {
  async criar(dados) {
    return await Lembrete.create(dados);
  }

  async listarTodos() {
    return await Lembrete.findAll();
  }

  async buscarPorId(id) {
    return await Lembrete.findByPk(id);
  }

  async atualizar(id, dados) {
    const lembrete = await Lembrete.findByPk(id);

    if (!lembrete) {
      return null;
    }

    await lembrete.update(dados);

    return lembrete;
  }

  async excluir(id) {
    const lembrete = await Lembrete.findByPk(id);

    if (!lembrete) {
      return null;
    }

    await lembrete.destroy();

    return lembrete;
  }
}

module.exports = LembreteRepository;