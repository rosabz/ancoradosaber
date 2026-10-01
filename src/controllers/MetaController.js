const MetaService = require("../services/MetaService");

class MetaController {
  constructor() {
    this.service = new MetaService();
  }

  async criar(req, res) {
  try {
    const meta = await this.service.criar({
      ...req.body,
      usuarioId: req.usuario.id,
    });

    res.status(201).json(meta);
  } catch (error) {
    res.status(400).json({
      erro: error.message,
    });
  }
}

  async listarTodos(req, res) {
    try {
      const metas = await this.service.listarTodos();

      res.status(200).json(metas);
    } catch (error) {
      res.status(500).json({
        erro: error.message,
      });
    }
  }

  async buscarPorId(req, res) {
    try {
      const meta = await this.service.buscarPorId(req.params.id);

      if (!meta) {
        return res.status(404).json({
          erro: "Meta não encontrada.",
        });
      }

      res.status(200).json(meta);
    } catch (error) {
      res.status(500).json({
        erro: error.message,
      });
    }
  }

  async atualizar(req, res) {
    try {
      const meta = await this.service.atualizar(
        req.params.id,
        req.body
      );

      if (!meta) {
        return res.status(404).json({
          erro: "Meta não encontrada.",
        });
      }

      res.status(200).json(meta);
    } catch (error) {
      res.status(400).json({
        erro: error.message,
      });
    }
  }

  async excluir(req, res) {
    try {
      const meta = await this.service.excluir(req.params.id);

      if (!meta) {
        return res.status(404).json({
          erro: "Meta não encontrada.",
        });
      }

      res.status(200).json({
        mensagem: "Meta excluída com sucesso.",
      });
    } catch (error) {
      res.status(500).json({
        erro: error.message,
      });
    }
  }
}

module.exports = MetaController;