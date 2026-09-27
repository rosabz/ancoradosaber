const RegistroEstudoRepository = require("../repositories/RegistroEstudoRepository");

class RegistroEstudoService {
  constructor() {
    this.repository = new RegistroEstudoRepository();
  }

  async criar(dados) {
    if (
      !dados.usuarioId ||
      !dados.metaId ||
      !dados.dataEstudo ||
      dados.horasEstudadas === undefined
    ) {
      throw new Error(
        "Usuário, meta, data de estudo e horas estudadas são obrigatórios."
      );
    }

    const data = new Date(dados.dataEstudo);

    if (isNaN(data.getTime())) {
      throw new Error("Informe uma data de estudo válida.");
    }

    if (dados.horasEstudadas <= 0) {
      throw new Error("As horas estudadas devem ser maiores que zero.");
    }

    return await this.repository.criar({
      usuarioId: dados.usuarioId,
      metaId: dados.metaId,
      dataEstudo: dados.dataEstudo,
      horasEstudadas: dados.horasEstudadas,
    });
  }

  async listarTodos() {
    return await this.repository.listarTodos();
  }

  async buscarPorId(id) {
    return await this.repository.buscarPorId(id);
  }

  async atualizar(id, dados) {
    const registro = await this.repository.buscarPorId(id);

    if (!registro) {
      return null;
    }

    if (dados.horasEstudadas !== undefined && dados.horasEstudadas <= 0) {
      throw new Error("As horas estudadas devem ser maiores que zero.");
    }

    if (dados.dataEstudo) {
      const data = new Date(dados.dataEstudo);

      if (isNaN(data.getTime())) {
        throw new Error("Informe uma data de estudo válida.");
      }
    }

    return await this.repository.atualizar(id, dados);
  }

  async excluir(id) {
    return await this.repository.excluir(id);
  }
}

module.exports = RegistroEstudoService;