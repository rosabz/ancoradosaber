const { Usuario } = require("../models");

class UsuarioRepository {
  async criar(dados) {
    return await Usuario.create(dados);
  }

  async listarTodos() {
    return await Usuario.findAll();
  }

  async buscarPorId(id) {
    return await Usuario.findByPk(id);
  }
  async buscarPorEmail(email) {
    return await Usuario.findOne({
        where: { email },
    });
  }

  async atualizar(id, dados) {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return null;
    }

    await usuario.update(dados);

    return usuario;
  }

  async excluir(id) {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return null;
    }

    await usuario.destroy();

    return usuario;
  }
}

module.exports = UsuarioRepository;