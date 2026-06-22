console.log("Projeto iniciado");

const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "API Âncora do Saber funcionando!" });
});



app.post("/login", (req, res) => {
  res.json({ mensagem: "Autenticar usuário" });
});



app.post("/usuarios", (req, res) => {
  res.json({ mensagem: "Cadastrar usuário" });
});

app.get("/usuarios", (req, res) => {
  res.json({ mensagem: "Listar usuários" });
});

app.get("/usuarios/:id", (req, res) => {
  res.json({ mensagem: `Buscar usuário ${req.params.id}` });
});

app.put("/usuarios/:id", (req, res) => {
  res.json({ mensagem: `Atualizar usuário ${req.params.id}` });
});

app.delete("/usuarios/:id", (req, res) => {
  res.json({ mensagem: `Excluir usuário ${req.params.id}` });
});



app.post("/disciplinas", (req, res) => {
  res.json({ mensagem: "Cadastrar disciplina" });
});

app.get("/disciplinas", (req, res) => {
  res.json({ mensagem: "Listar disciplinas" });
});

app.put("/disciplinas/:id", (req, res) => {
  res.json({ mensagem: `Atualizar disciplina ${req.params.id}` });
});

app.delete("/disciplinas/:id", (req, res) => {
  res.json({ mensagem: `Excluir disciplina ${req.params.id}` });
});



app.post("/tarefas", (req, res) => {
  res.json({ mensagem: "Criar tarefa" });
});

app.get("/tarefas", (req, res) => {
  res.json({ mensagem: "Listar tarefas" });
});

app.get("/tarefas/:id", (req, res) => {
  res.json({ mensagem: `Buscar tarefa ${req.params.id}` });
});

app.put("/tarefas/:id", (req, res) => {
  res.json({ mensagem: `Atualizar tarefa ${req.params.id}` });
});

app.delete("/tarefas/:id", (req, res) => {
  res.json({ mensagem: `Excluir tarefa ${req.params.id}` });
});



app.post("/metas", (req, res) => {
  res.json({ mensagem: "Criar meta" });
});

app.get("/metas", (req, res) => {
  res.json({ mensagem: "Listar metas" });
});

app.put("/metas/:id", (req, res) => {
  res.json({ mensagem: `Atualizar meta ${req.params.id}` });
});

app.delete("/metas/:id", (req, res) => {
  res.json({ mensagem: `Excluir meta ${req.params.id}` });
});



app.post("/lembretes", (req, res) => {
  res.json({ mensagem: "Criar lembrete" });
});

app.get("/lembretes", (req, res) => {
  res.json({ mensagem: "Listar lembretes" });
});

app.put("/lembretes/:id", (req, res) => {
  res.json({ mensagem: `Atualizar lembrete ${req.params.id}` });
});

app.delete("/lembretes/:id", (req, res) => {
  res.json({ mensagem: `Excluir lembrete ${req.params.id}` });
});



app.post("/registro-estudo", (req, res) => {
  res.json({ mensagem: "Criar registro de estudo" });
});

app.get("/registro-estudo", (req, res) => {
  res.json({ mensagem: "Listar registros de estudo" });
});

app.get("/registro-estudo/:id", (req, res) => {
  res.json({ mensagem: `Buscar registro ${req.params.id}` });
});

app.put("/registro-estudo/:id", (req, res) => {
  res.json({ mensagem: `Atualizar registro ${req.params.id}` });
});

app.delete("/registro-estudo/:id", (req, res) => {
  res.json({ mensagem: `Excluir registro ${req.params.id}` });
});



const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});