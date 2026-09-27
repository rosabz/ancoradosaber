const app = require("./src/app");
const sequelize = require("./src/config/database");
require("./src/models");

const PORT = 3000;

async function iniciarServidor() {
  try {
    await sequelize.authenticate();
    console.log(" Conexão com o banco realizada com sucesso!");

    await sequelize.sync();
    console.log(" Tabelas sincronizadas com sucesso!");

    app.listen(PORT, () => {
      console.log(` Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error(" Erro ao iniciar a aplicação:", error.message);
  }
}

iniciarServidor();