const Usuario = require("./Usuario");
const Disciplina = require("./Disciplina");
const Tarefa = require("./Tarefa");
const Meta = require("./Meta");
const Lembrete = require("./Lembrete");
const RegistroEstudo = require("./RegistroEstudo");

// Usuário → Disciplinas
Usuario.hasMany(Disciplina, {
  foreignKey: "usuarioId",
});
Disciplina.belongsTo(Usuario, {
  foreignKey: "usuarioId",
});

// Usuário → Tarefas
Usuario.hasMany(Tarefa, {
  foreignKey: "usuarioId",
});
Tarefa.belongsTo(Usuario, {
  foreignKey: "usuarioId",
});

// Disciplina → Tarefas
Disciplina.hasMany(Tarefa, {
  foreignKey: "disciplinaId",
});
Tarefa.belongsTo(Disciplina, {
  foreignKey: "disciplinaId",
});

// Usuário → Metas
Usuario.hasMany(Meta, {
  foreignKey: "usuarioId",
});
Meta.belongsTo(Usuario, {
  foreignKey: "usuarioId",
});

// Usuário → Lembretes
Usuario.hasMany(Lembrete, {
  foreignKey: "usuarioId",
});
Lembrete.belongsTo(Usuario, {
  foreignKey: "usuarioId",
});

// Usuário → Registros de estudo
Usuario.hasMany(RegistroEstudo, {
  foreignKey: "usuarioId",
});
RegistroEstudo.belongsTo(Usuario, {
  foreignKey: "usuarioId",
});

// Meta → Registros de estudo
Meta.hasMany(RegistroEstudo, {
  foreignKey: "metaId",
});
RegistroEstudo.belongsTo(Meta, {
  foreignKey: "metaId",
});

module.exports = {
  Usuario,
  Disciplina,
  Tarefa,
  Meta,
  Lembrete,
  RegistroEstudo,
};