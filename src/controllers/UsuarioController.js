const UsuarioService = require("../services/UsuarioService");

class UsuarioController {
  constructor() {
    this.service = new UsuarioService();
  }

  async criar(req, res) {
    try {
      const usuario = await this.service.criar(req.body);

      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({
        erro: error.message,
      });
    }
  }

  async listarTodos(req, res) {
    try {
      const usuarios = await this.service.listarTodos();

      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({
        erro: error.message,
      });
    }
  }

  async buscarPorId(req, res) {
    try {
      const usuario = await this.service.buscarPorId(req.params.id);

      if (!usuario) {
        return res.status(404).json({
          erro: "Usuário não encontrado.",
        });
      }

      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({
        erro: error.message,
      });
    }
  }

  async atualizar(req, res) {
    try {
      const usuario = await this.service.atualizar(
        req.params.id,
        req.body
      );

      if (!usuario) {
        return res.status(404).json({
          erro: "Usuário não encontrado.",
        });
      }

      res.status(200).json(usuario);
    } catch (error) {
      res.status(400).json({
        erro: error.message,
      });
    }
  }

  async excluir(req, res) {
    try {
      const usuario = await this.service.excluir(req.params.id);

      if (!usuario) {
        return res.status(404).json({
          erro: "Usuário não encontrado.",
        });
      }

      res.status(200).json({
        mensagem: "Usuário excluído com sucesso.",
      });
    } catch (error) {
      res.status(500).json({
        erro: error.message,
      });
    }
  }
}

module.exports = UsuarioController;