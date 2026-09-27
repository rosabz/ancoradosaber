const { RegistroEstudo } = require("../models");

class RegistroEstudoRepository {
  async criar(dados) {
    return await RegistroEstudo.create(dados);
  }

  async listarTodos() {
    return await RegistroEstudo.findAll();
  }

  async buscarPorId(id) {
    return await RegistroEstudo.findByPk(id);
  }

  async atualizar(id, dados) {
    const registro = await RegistroEstudo.findByPk(id);

    if (!registro) {
      return null;
    }

    await registro.update(dados);

    return registro;
  }

  async excluir(id) {
    const registro = await RegistroEstudo.findByPk(id);

    if (!registro) {
      return null;
    }

    await registro.destroy();

    return registro;
  }
}

module.exports = RegistroEstudoRepository;