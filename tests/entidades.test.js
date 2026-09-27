const request = require("supertest");
const app = require("../src/app");
const sequelize = require("../src/config/database");

describe("Testes das entidades da API", () => {
  let token;
  let usuarioId;
  let disciplinaId;
  let tarefaId;
  let metaId;
  let lembreteId;
  let registroId;

  beforeAll(async () => {
    const login = await request(app).post("/login").send({
      email: "teste.login@email.com",
      senha: "123456",
    });

    token = login.body.token;

    const usuarios = await request(app)
      .get("/usuarios")
      .set("Authorization", `Bearer ${token}`);

    usuarioId = usuarios.body.find(
      (usuario) => usuario.email === "teste.login@email.com"
    ).id;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  // =========================
  // DISCIPLINA
  // =========================

  test("Deve criar uma disciplina", async () => {
    const nomeDisciplina = `Matemática Jest ${Date.now()}`;

    const resposta = await request(app)
      .post("/disciplinas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: nomeDisciplina,
        usuarioId,
      });

    expect(resposta.statusCode).toBe(201);
    expect(resposta.body.nome).toBe(nomeDisciplina);

    disciplinaId = resposta.body.id;
  });

  test("Não deve criar disciplina duplicada para o mesmo usuário", async () => {
    const nomeDisciplina = `Disciplina Duplicada ${Date.now()}`;

    const primeiraResposta = await request(app)
      .post("/disciplinas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: nomeDisciplina,
        usuarioId,
      });

    expect(primeiraResposta.statusCode).toBe(201);

    const segundaResposta = await request(app)
      .post("/disciplinas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: nomeDisciplina,
        usuarioId,
      });

    expect(segundaResposta.statusCode).toBe(400);
  });

  // =========================
  // TAREFA
  // =========================

  test("Deve criar uma tarefa", async () => {
    const resposta = await request(app)
      .post("/tarefas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        titulo: "Tarefa criada pelo Jest",
        descricao: "Teste automatizado",
        status: "pendente",
        disciplinaId,
      });

    expect(resposta.statusCode).toBe(201);
    expect(resposta.body.usuarioId).toBe(usuarioId);

    tarefaId = resposta.body.id;
  });

  test("Não deve criar tarefa com status inválido", async () => {
    const resposta = await request(app)
      .post("/tarefas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        titulo: "Tarefa inválida",
        status: "status_invalido",
        disciplinaId,
      });

    expect(resposta.statusCode).toBe(400);
  });

  test("Não deve permitir acessar tarefa de outro usuário", async () => {
    const resposta = await request(app)
      .get("/tarefas/1")
      .set("Authorization", `Bearer ${token}`);

    expect(resposta.statusCode).toBe(404);
  });

  // =========================
  // META
  // =========================

  test("Deve criar uma meta", async () => {
    const resposta = await request(app)
      .post("/metas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: "Meta criada pelo Jest",
        percentual: 50,
        usuarioId,
      });

    expect(resposta.statusCode).toBe(201);

    metaId = resposta.body.id;
  });

  test("Não deve criar meta com percentual inválido", async () => {
    const resposta = await request(app)
      .post("/metas")
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: "Meta inválida",
        percentual: 150,
        usuarioId,
      });

    expect(resposta.statusCode).toBe(400);
  });

  // =========================
  // LEMBRETE
  // =========================

  test("Deve criar um lembrete", async () => {
    const resposta = await request(app)
      .post("/lembretes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: "Lembrete criado pelo Jest",
        dataHora: "2026-10-01T10:00:00",
        usuarioId,
      });

    expect(resposta.statusCode).toBe(201);

    lembreteId = resposta.body.id;
  });

  test("Não deve criar lembrete com data inválida", async () => {
    const resposta = await request(app)
      .post("/lembretes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: "Lembrete inválido",
        dataHora: "data-invalida",
        usuarioId,
      });

    expect(resposta.statusCode).toBe(400);
  });

  // =========================
  // REGISTRO DE ESTUDO
  // =========================

  test("Deve criar um registro de estudo", async () => {
    const resposta = await request(app)
      .post("/registro-estudo")
      .set("Authorization", `Bearer ${token}`)
      .send({
        usuarioId,
        metaId,
        dataEstudo: "2026-09-26",
        horasEstudadas: 2,
      });

    expect(resposta.statusCode).toBe(201);

    registroId = resposta.body.id;
  });

  test("Não deve criar registro com horas negativas", async () => {
    const resposta = await request(app)
      .post("/registro-estudo")
      .set("Authorization", `Bearer ${token}`)
      .send({
        usuarioId,
        metaId,
        dataEstudo: "2026-09-26",
        horasEstudadas: -2,
      });

    expect(resposta.statusCode).toBe(400);
  });

  // =========================
  // BUSCAS
  // =========================

  test("Deve buscar a tarefa criada", async () => {
    const resposta = await request(app)
      .get(`/tarefas/${tarefaId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(resposta.statusCode).toBe(200);
    expect(resposta.body.id).toBe(tarefaId);
  });

  test("Deve buscar a meta criada", async () => {
    const resposta = await request(app)
      .get(`/metas/${metaId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(resposta.statusCode).toBe(200);
    expect(resposta.body.id).toBe(metaId);
  });

  test("Deve buscar o lembrete criado", async () => {
    const resposta = await request(app)
      .get(`/lembretes/${lembreteId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(resposta.statusCode).toBe(200);
    expect(resposta.body.id).toBe(lembreteId);
  });

  test("Deve buscar o registro de estudo criado", async () => {
    const resposta = await request(app)
      .get(`/registro-estudo/${registroId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(resposta.statusCode).toBe(200);
    expect(resposta.body.id).toBe(registroId);
  });
});