const { Tarefa } = require("../models");

class TarefaRepository {
  async criar(dados) {
    return await Tarefa.create(dados);
  }

  async listarTodos() {
    return await Tarefa.findAll();
  }

  async buscarPorId(id) {
    return await Tarefa.findByPk(id);
  }

  async atualizar(id, dados) {
    const tarefa = await Tarefa.findByPk(id);

    if (!tarefa) {
      return null;
    }

    await tarefa.update(dados);

    return tarefa;
  }

  async excluir(id) {
    const tarefa = await Tarefa.findByPk(id);

    if (!tarefa) {
      return null;
    }

    await tarefa.destroy();

    return tarefa;
  }
}

module.exports = TarefaRepository;