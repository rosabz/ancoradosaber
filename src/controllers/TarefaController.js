const TarefaService = require("../services/TarefaService");

class TarefaController {
  constructor() {
    this.service = new TarefaService();
  }

  async criar(req, res) {
    try {
      const tarefa = await this.service.criar(
        req.body,
        req.usuario.id
      );

      res.status(201).json(tarefa);
    } catch (error) {
      res.status(400).json({
        erro: error.message,
      });
    }
  }

  async listarTodos(req, res) {
    try {
      const tarefas = await this.service.listarTodos(
        req.usuario.id
      );

      res.status(200).json(tarefas);
    } catch (error) {
      res.status(500).json({
        erro: error.message,
      });
    }
  }

  async buscarPorId(req, res) {
    try {
      const tarefa = await this.service.buscarPorId(
        req.params.id,
        req.usuario.id
      );

      if (!tarefa) {
        return res.status(404).json({
          erro: "Tarefa não encontrada.",
        });
      }

      res.status(200).json(tarefa);
    } catch (error) {
      res.status(500).json({
        erro: error.message,
      });
    }
  }

  async atualizar(req, res) {
    try {
      const tarefa = await this.service.atualizar(
        req.params.id,
        req.body,
        req.usuario.id
      );

      if (!tarefa) {
        return res.status(404).json({
          erro: "Tarefa não encontrada.",
        });
      }

      res.status(200).json(tarefa);
    } catch (error) {
      res.status(400).json({
        erro: error.message,
      });
    }
  }

  async excluir(req, res) {
    try {
      const tarefa = await this.service.excluir(
        req.params.id,
        req.usuario.id
      );

      if (!tarefa) {
        return res.status(404).json({
          erro: "Tarefa não encontrada.",
        });
      }

      res.status(200).json({
        mensagem: "Tarefa excluída com sucesso.",
      });
    } catch (error) {
      res.status(500).json({
        erro: error.message,
      });
    }
  }
}

module.exports = TarefaController;