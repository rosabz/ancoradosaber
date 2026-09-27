# Âncora do Saber

Sistema web desenvolvido para auxiliar estudantes na organização e no planejamento dos estudos, permitindo o gerenciamento de disciplinas, tarefas, metas, lembretes e registros de estudo.

## Integrantes

* Rosa
* Raianny
* Michelly
* Thamyres

## Tecnologias utilizadas

* HTML
* JavaScript
* Node.js
* Express
* MySQL
* Sequelize
* JWT (JSON Web Token)
* bcrypt
* dotenv
* Jest
* Supertest
* Swagger/OpenAPI
* ESLint
* Prettier

## Funcionalidades

O sistema possui funcionalidades para:

* Cadastro e gerenciamento de usuários;
* Login e autenticação de usuários;
* Cadastro e gerenciamento de disciplinas;
* Cadastro e gerenciamento de tarefas;
* Cadastro e gerenciamento de metas;
* Cadastro e gerenciamento de lembretes;
* Registro de horas de estudo;
* Validação de dados;
* Controle de acesso às tarefas por usuário;
* Testes automatizados;
* Documentação da API com Swagger/OpenAPI.

## Estrutura do projeto

```text
ancora-do-saber/
│
├── documents/
│
├── img/
│
├── node_modules/
│
├── src/
│   │
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── DisciplinaController.js
│   │   ├── LembreteController.js
│   │   ├── LoginController.js
│   │   ├── MetaController.js
│   │   ├── RegistroEstudoController.js
│   │   ├── TarefaController.js
│   │   └── UsuarioController.js
│   │
│   ├── middlewares/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Disciplina.js
│   │   ├── Lembrete.js
│   │   ├── Meta.js
│   │   ├── RegistroEstudo.js
│   │   ├── Tarefa.js
│   │   ├── Usuario.js
│   │   └── index.js
│   │
│   ├── repositories/
│   │   ├── DisciplinaRepository.js
│   │   ├── LembreteRepository.js
│   │   ├── MetaRepository.js
│   │   ├── RegistroEstudoRepository.js
│   │   ├── TarefaRepository.js
│   │   └── UsuarioRepository.js
│   │
│   ├── routes/
│   │   ├── DisciplinaRoutes.js
│   │   ├── LembreteRoutes.js
│   │   ├── LoginRoutes.js
│   │   ├── MetaRoutes.js
│   │   ├── RegistroEstudoRoutes.js
│   │   ├── TarefaRoutes.js
│   │   └── usuarioRoutes.js
│   │
│   ├── services/
│   │   ├── DisciplinaService.js
│   │   ├── LembreteService.js
│   │   ├── LoginService.js
│   │   ├── MetaService.js
│   │   ├── RegistroEstudoService.js
│   │   ├── TarefaService.js
│   │   └── UsuarioService.js
│   │
│   ├── app.js
│   └── swagger.js
│
├── tests/
│   ├── entidades.test.js
│   └── usuario.test.js
│
├── .env
├── .env.example
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── index.html
├── index.js
├── login.html
├── package-lock.json
├── package.json
└── README.md
```

> A pasta `node_modules` é criada automaticamente pelo npm após a instalação das dependências e não deve ser enviada para o GitHub.

## Arquitetura do sistema

O projeto utiliza uma arquitetura organizada em camadas:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Model
    ↓
MySQL
```

### Controller

Responsável por receber as requisições HTTP, chamar os serviços correspondentes e retornar as respostas para o cliente.

### Service

Responsável pelas regras de negócio, validações e processamento das informações recebidas.

### Repository

Responsável pelo acesso aos dados do banco de dados utilizando o Sequelize.

### Model

Representa as entidades do sistema e sua estrutura no banco de dados.

## Banco de dados

O sistema utiliza o **MySQL** como banco de dados e o **Sequelize** como ORM.

O banco utilizado pelo projeto é:

```text
ancora_saber
```

### Entidades

As principais entidades do sistema são:

* Usuário
* Disciplina
* Tarefa
* Meta
* Lembrete
* Registro de Estudo

### Relacionamentos

* Um usuário pode possuir várias disciplinas;
* Um usuário pode possuir várias tarefas;
* Uma disciplina pode possuir várias tarefas;
* Um usuário pode possuir várias metas;
* Um usuário pode possuir vários lembretes;
* Um usuário pode possuir vários registros de estudo;
* Uma meta pode possuir vários registros de estudo.

## Configuração do projeto

### 1. Instalar as dependências

Após clonar ou baixar o projeto, execute:

```bash
npm install
```

### 2. Configurar o banco de dados

É necessário possuir o MySQL instalado e em execução.

Crie o banco de dados:

```sql
CREATE DATABASE ancora_saber;
```

### 3. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes informações:

```env
DB_NAME=ancora_saber
DB_USER=root
DB_PASSWORD=SUA_SENHA
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=chave_secreta_ancora_saber
```

O arquivo `.env.example` apresenta um modelo de configuração sem expor informações sensíveis.

## Executando o projeto

Para iniciar a aplicação em modo de desenvolvimento, execute:

```bash
npm run dev
```

O servidor será iniciado em:

```text
http://localhost:3000
```

Ao iniciar, a aplicação realiza a conexão com o banco de dados e sincroniza as tabelas utilizando o Sequelize.

Também é possível iniciar a aplicação utilizando:

```bash
npm start
```

## Autenticação

A API utiliza **JWT (JSON Web Token)** para realizar a autenticação dos usuários.

Para realizar o login, utilize:

```http
POST /login
```

Exemplo de dados enviados:

```json
{
  "email": "teste.login@email.com",
  "senha": "123456"
}
```

Após o login, a API retorna um token de autenticação.

Nas rotas protegidas, o token deve ser enviado no cabeçalho:

```text
Authorization: Bearer SEU_TOKEN
```

As senhas dos usuários são protegidas utilizando **bcrypt**, evitando o armazenamento da senha em texto puro.

## Regras de negócio

### RN001 — Usuários autenticados

As funcionalidades protegidas do sistema só podem ser acessadas por usuários autenticados.

### RN002 — Associação da tarefa

Toda tarefa deve estar associada a uma disciplina.

### RN003 — Disciplinas duplicadas

Não é permitido cadastrar duas disciplinas com o mesmo nome para o mesmo usuário.

### RN004 — Acesso às próprias tarefas

Um usuário só pode acessar e gerenciar suas próprias tarefas.

### RN005 — Progresso dos estudos

Tarefas concluídas podem ser utilizadas para o controle do progresso dos estudos.

## Endpoints da API

### Usuários

```text
POST   /usuarios
GET    /usuarios
GET    /usuarios/:id
PUT    /usuarios/:id
DELETE /usuarios/:id
```

### Login

```text
POST /login
```

### Disciplinas

```text
POST   /disciplinas
GET    /disciplinas
PUT    /disciplinas/:id
DELETE /disciplinas/:id
```

### Tarefas

```text
POST   /tarefas
GET    /tarefas
GET    /tarefas/:id
PUT    /tarefas/:id
DELETE /tarefas/:id
```

### Metas

```text
POST   /metas
GET    /metas
GET    /metas/:id
PUT    /metas/:id
DELETE /metas/:id
```

### Lembretes

```text
POST   /lembretes
GET    /lembretes
GET    /lembretes/:id
PUT    /lembretes/:id
DELETE /lembretes/:id
```

### Registro de estudo

```text
POST   /registro-estudo
GET    /registro-estudo
GET    /registro-estudo/:id
PUT    /registro-estudo/:id
DELETE /registro-estudo/:id
```

## Documentação da API

A API possui documentação utilizando **Swagger/OpenAPI**.

Com o servidor em execução, a documentação pode ser acessada em:

```text
http://localhost:3000/api-docs
```

O Swagger permite visualizar os endpoints, seus métodos HTTP, parâmetros, respostas e testar as requisições diretamente pela interface.

As rotas protegidas utilizam autenticação por JWT através da opção **Authorize** do Swagger.

## Testes automatizados

O projeto utiliza **Jest** e **Supertest** para realizar testes automatizados da API.

Para executar os testes:

```bash
npm test
```

Os testes verificam funcionalidades como:

* Autenticação;
* Acesso às rotas protegidas;
* Cadastro de usuários;
* Validação de campos obrigatórios;
* Cadastro de disciplinas;
* Impedimento de disciplinas duplicadas;
* Cadastro de tarefas;
* Validação do status das tarefas;
* Controle de acesso às tarefas;
* Cadastro de metas;
* Validação do percentual das metas;
* Cadastro de lembretes;
* Validação de datas;
* Cadastro de registros de estudo;
* Validação das horas estudadas.

## Segurança

O projeto possui mecanismos de segurança, incluindo:

* Autenticação por JWT;
* Senhas protegidas com bcrypt;
* Variáveis sensíveis armazenadas no arquivo `.env`;
* Arquivo `.env` incluído no `.gitignore`;
* Controle de acesso às tarefas de acordo com o usuário autenticado;
* Validação dos dados recebidos pela API;
* Não exposição das senhas dos usuários nas respostas da API.

## Qualidade e padronização

O projeto utiliza ferramentas para auxiliar na qualidade e padronização do código:

* **ESLint** para análise do código;
* **Prettier** para padronização da formatação;
* **Jest** para testes automatizados;
* **Supertest** para testes das requisições HTTP.

## Front-end

O projeto possui páginas HTML para a interface inicial do sistema:

* `index.html`
* `login.html`

As imagens e recursos visuais utilizados pelo sistema estão organizados na pasta:

```text
img/
```

## Documentação do projeto

Os documentos relacionados ao desenvolvimento do projeto estão organizados na pasta:

```text
documents/
```

## Objetivo

O **Âncora do Saber** tem como objetivo auxiliar estudantes na organização de sua rotina de estudos, oferecendo recursos para o acompanhamento de tarefas, disciplinas, metas, lembretes e registros de estudo por meio de uma aplicação web integrada a uma API REST e banco de dados MySQL.

