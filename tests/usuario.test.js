const request = require("supertest");
const app = require("../src/app");
const sequelize = require("../src/config/database");

describe("Testes da API de Usuários", () => {
  let token;
  let usuarioId;

  beforeAll(async () => {
    // Cria o usuário que será usado nos testes
    await request(app).post("/usuarios").send({
      nome: "Usuario Login Teste",
      email: "teste.login@email.com",
      senha: "123456",
    });

    // Faz login para obter o token
    const resposta = await request(app).post("/login").send({
      email: "teste.login@email.com",
      senha: "123456",
    });

    token = resposta.body.token;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("Deve acessar a API com token válido", async () => {
    const resposta = await request(app)
      .get("/usuarios")
      .set("Authorization", `Bearer ${token}`);

    expect(resposta.statusCode).toBe(200);
    expect(Array.isArray(resposta.body)).toBe(true);
  });

  test("Não deve acessar usuários sem token", async () => {
    const resposta = await request(app).get("/usuarios");

    expect(resposta.statusCode).toBe(401);
  });

  test("Deve criar um usuário", async () => {
    const resposta = await request(app)
      .post("/usuarios")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Usuario Jest",
        email: `jest${Date.now()}@email.com`,
        senha: "123456",
      });

    expect(resposta.statusCode).toBe(201);
    expect(resposta.body.nome).toBe("Usuario Jest");

    usuarioId = resposta.body.id;
  });

  test("Não deve criar usuário sem campos obrigatórios", async () => {
    const resposta = await request(app)
      .post("/usuarios")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Usuario Incompleto",
      });

    expect(resposta.statusCode).toBe(400);
  });

  test("Deve buscar usuário pelo ID", async () => {
    const resposta = await request(app)
      .get(`/usuarios/${usuarioId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(resposta.statusCode).toBe(200);
    expect(resposta.body.id).toBe(usuarioId);
  });

  test("Deve retornar 404 para usuário inexistente", async () => {
    const resposta = await request(app)
      .get("/usuarios/999999")
      .set("Authorization", `Bearer ${token}`);

    expect(resposta.statusCode).toBe(404);
  });
});