const { Disciplina } = require("../models");

class DisciplinaRepository {
  async criar(dados) {
    return await Disciplina.create(dados);
  }

  async listarTodos() {
    return await Disciplina.findAll();
  }

  async buscarPorId(id) {
    return await Disciplina.findByPk(id);
  }

  async atualizar(id, dados) {
    const disciplina = await Disciplina.findByPk(id);

    if (!disciplina) {
      return null;
    }

    await disciplina.update(dados);

    return disciplina;
  }

  async excluir(id) {
    const disciplina = await Disciplina.findByPk(id);

    if (!disciplina) {
      return null;
    }

    await disciplina.destroy();

    return disciplina;
  }
}

module.exports = DisciplinaRepository;