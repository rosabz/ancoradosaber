const LembreteService = require("../services/LembreteService");

class LembreteController {
  constructor() {
    this.service = new LembreteService();
  }

  async criar(req, res) {
    try {
      const lembrete = await this.service.criar(req.body);

      res.status(201).json(lembrete);
    } catch (error) {
      res.status(400).json({
        erro: error.message,
      });
    }
  }

  async listarTodos(req, res) {
    try {
      const lembretes = await this.service.listarTodos();

      res.status(200).json(lembretes);
    } catch (error) {
      res.status(500).json({
        erro: error.message,
      });
    }
  }

  async buscarPorId(req, res) {
    try {
      const lembrete = await this.service.buscarPorId(req.params.id);

      if (!lembrete) {
        return res.status(404).json({
          erro: "Lembrete não encontrado.",
        });
      }

      res.status(200).json(lembrete);
    } catch (error) {
      res.status(500).json({
        erro: error.message,
      });
    }
  }

  async atualizar(req, res) {
    try {
      const lembrete = await this.service.atualizar(
        req.params.id,
        req.body
      );

      if (!lembrete) {
        return res.status(404).json({
          erro: "Lembrete não encontrado.",
        });
      }

      res.status(200).json(lembrete);
    } catch (error) {
      res.status(400).json({
        erro: error.message,
      });
    }
  }

  async excluir(req, res) {
    try {
      const lembrete = await this.service.excluir(req.params.id);

      if (!lembrete) {
        return res.status(404).json({
          erro: "Lembrete não encontrado.",
        });
      }

      res.status(200).json({
        mensagem: "Lembrete excluído com sucesso.",
      });
    } catch (error) {
      res.status(500).json({
        erro: error.message,
      });
    }
  }
}

module.exports = LembreteController;