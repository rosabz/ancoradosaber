const { Meta } = require("../models");

class MetaRepository {
  async criar(dados) {
    return await Meta.create(dados);
  }

  async listarTodos() {
    return await Meta.findAll();
  }

  async buscarPorId(id) {
    return await Meta.findByPk(id);
  }

  async atualizar(id, dados) {
    const meta = await Meta.findByPk(id);

    if (!meta) {
      return null;
    }

    await meta.update(dados);

    return meta;
  }

  async excluir(id) {
    const meta = await Meta.findByPk(id);

    if (!meta) {
      return null;
    }

    await meta.destroy();

    return meta;
  }
}

module.exports = MetaRepository;