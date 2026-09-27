const RegistroEstudoService = require("../services/RegistroEstudoService");

class RegistroEstudoController {
  constructor() {
    this.service = new RegistroEstudoService();
  }

  async criar(req, res) {
    try {
      const registro = await this.service.criar(req.body);

      res.status(201).json(registro);
    } catch (error) {
      res.status(400).json({
        erro: error.message,
      });
    }
  }

  async listarTodos(req, res) {
    try {
      const registros = await this.service.listarTodos();

      res.status(200).json(registros);
    } catch (error) {
      res.status(500).json({
        erro: error.message,
      });
    }
  }

  async buscarPorId(req, res) {
    try {
      const registro = await this.service.buscarPorId(req.params.id);

      if (!registro) {
        return res.status(404).json({
          erro: "Registro de estudo não encontrado.",
        });
      }

      res.status(200).json(registro);
    } catch (error) {
      res.status(500).json({
        erro: error.message,
      });
    }
  }

  async atualizar(req, res) {
    try {
      const registro = await this.service.atualizar(
        req.params.id,
        req.body
      );

      if (!registro) {
        return res.status(404).json({
          erro: "Registro de estudo não encontrado.",
        });
      }

      res.status(200).json(registro);
    } catch (error) {
      res.status(400).json({
        erro: error.message,
      });
    }
  }

  async excluir(req, res) {
    try {
      const registro = await this.service.excluir(req.params.id);

      if (!registro) {
        return res.status(404).json({
          erro: "Registro de estudo não encontrado.",
        });
      }

      res.status(200).json({
        mensagem: "Registro de estudo excluído com sucesso.",
      });
    } catch (error) {
      res.status(500).json({
        erro: error.message,
      });
    }
  }
}

module.exports = RegistroEstudoController;