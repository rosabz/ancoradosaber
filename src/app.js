const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const usuarioRoutes = require("./routes/usuarioRoutes");
const disciplinaRoutes = require("./routes/DisciplinaRoutes");
const tarefaRoutes = require("./routes/TarefaRoutes");
const metaRoutes = require("./routes/MetaRoutes");
const lembreteRoutes = require("./routes/LembreteRoutes");
const registroEstudoRoutes = require("./routes/RegistroEstudoRoutes");
const loginRoutes = require("./routes/LoginRoutes");
const autenticarToken = require("./middlewares/authMiddleware");

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({
    mensagem: "API Âncora do Saber funcionando!",
  });
});

app.use("/usuarios", autenticarToken, usuarioRoutes);
app.use("/disciplinas", autenticarToken, disciplinaRoutes);
app.use("/tarefas", autenticarToken, tarefaRoutes);
app.use("/metas", autenticarToken, metaRoutes);
app.use("/lembretes", autenticarToken, lembreteRoutes);
app.use("/registro-estudo", autenticarToken, registroEstudoRoutes);

app.use("/login", loginRoutes);

module.exports = app;