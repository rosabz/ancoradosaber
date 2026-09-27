const TarefaRepository = require("../repositories/TarefaRepository");

class TarefaService {
  constructor() {
    this.repository = new TarefaRepository();
  }

  async criar(dados, usuarioId) {
    if (!dados.titulo || !dados.disciplinaId) {
      throw new Error(
        "Título e disciplina são obrigatórios."
      );
    }

    if (!usuarioId) {
      throw new Error("Usuário não identificado.");
    }

    if (dados.titulo.trim().length < 3) {
      throw new Error("O título deve ter pelo menos 3 caracteres.");
    }

    const statusPermitidos = ["pendente", "em andamento", "concluida"];

    if (dados.status && !statusPermitidos.includes(dados.status)) {
      throw new Error(
        "Status inválido. Use: pendente, em andamento ou concluida."
      );
    }

    return await this.repository.criar({
      titulo: dados.titulo.trim(),
      descricao: dados.descricao || null,
      status: dados.status || "pendente",
      dataEntrega: dados.dataEntrega || null,
      disciplinaId: dados.disciplinaId,
      usuarioId: usuarioId,
    });
  }

  async listarTodos(usuarioId) {
    if (!usuarioId) {
      throw new Error("Usuário não identificado.");
    }

    const tarefas = await this.repository.listarTodos();

    return tarefas.filter(
      (tarefa) => tarefa.usuarioId === usuarioId
    );
  }

  async buscarPorId(id, usuarioId) {
    if (!usuarioId) {
      throw new Error("Usuário não identificado.");
    }

    const tarefa = await this.repository.buscarPorId(id);

    if (!tarefa || tarefa.usuarioId !== usuarioId) {
      return null;
    }

    return tarefa;
  }

  async atualizar(id, dados, usuarioId) {
    if (!usuarioId) {
      throw new Error("Usuário não identificado.");
    }

    const tarefa = await this.repository.buscarPorId(id);

    if (!tarefa || tarefa.usuarioId !== usuarioId) {
      return null;
    }

    if (dados.titulo && dados.titulo.trim().length < 3) {
      throw new Error("O título deve ter pelo menos 3 caracteres.");
    }

    const statusPermitidos = ["pendente", "em andamento", "concluida"];

    if (dados.status && !statusPermitidos.includes(dados.status)) {
      throw new Error(
        "Status inválido. Use: pendente, em andamento ou concluida."
      );
    }

    // Impede que o usuário troque a tarefa para outro usuário
    delete dados.usuarioId;

    return await this.repository.atualizar(id, dados);
  }

  async excluir(id, usuarioId) {
    if (!usuarioId) {
      throw new Error("Usuário não identificado.");
    }

    const tarefa = await this.repository.buscarPorId(id);

    if (!tarefa || tarefa.usuarioId !== usuarioId) {
      return null;
    }

    return await this.repository.excluir(id);
  }
}

module.exports = TarefaService;