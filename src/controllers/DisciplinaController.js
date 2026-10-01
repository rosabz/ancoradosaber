const DisciplinaService = require("../services/DisciplinaService");

class DisciplinaController {
  constructor() {
    this.service = new DisciplinaService();
  }

  async criar(req, res) {
  try {
    const disciplina = await this.service.criar({
      ...req.body,
      usuarioId: req.usuario.id,
    });

    res.status(201).json(disciplina);
  } catch (error) {
    res.status(400).json({
      erro: error.message,
    });
  }
}
  async listarTodos(req, res) {
    try {
      const disciplinas = await this.service.listarTodos();

      res.status(200).json(disciplinas);
    } catch (error) {
      res.status(500).json({
        erro: error.message,
      });
    }
  }

  async buscarPorId(req, res) {
    try {
      const disciplina = await this.service.buscarPorId(req.params.id);

      if (!disciplina) {
        return res.status(404).json({
          erro: "Disciplina não encontrada.",
        });
      }

      res.status(200).json(disciplina);
    } catch (error) {
      res.status(500).json({
        erro: error.message,
      });
    }
  }

  async atualizar(req, res) {
    try {
      const disciplina = await this.service.atualizar(
        req.params.id,
        req.body
      );

      if (!disciplina) {
        return res.status(404).json({
          erro: "Disciplina não encontrada.",
        });
      }

      res.status(200).json(disciplina);
    } catch (error) {
      res.status(400).json({
        erro: error.message,
      });
    }
  }

  async excluir(req, res) {
    try {
      const disciplina = await this.service.excluir(req.params.id);

      if (!disciplina) {
        return res.status(404).json({
          erro: "Disciplina não encontrada.",
        });
      }

      res.status(200).json({
        mensagem: "Disciplina excluída com sucesso.",
      });
    } catch (error) {
      res.status(500).json({
        erro: error.message,
      });
    }
  }
}

module.exports = DisciplinaController;