const Usuario = require("./Usuario");
const Disciplina = require("./Disciplina");
const Tarefa = require("./Tarefa");
const Meta = require("./Meta");
const Lembrete = require("./Lembrete");
const RegistroEstudo = require("./RegistroEstudo");


Usuario.hasMany(Disciplina, {
  foreignKey: "usuarioId",
});
Disciplina.belongsTo(Usuario, {
  foreignKey: "usuarioId",
});


Usuario.hasMany(Tarefa, {
  foreignKey: "usuarioId",
});
Tarefa.belongsTo(Usuario, {
  foreignKey: "usuarioId",
});


Disciplina.hasMany(Tarefa, {
  foreignKey: "disciplinaId",
});
Tarefa.belongsTo(Disciplina, {
  foreignKey: "disciplinaId",
});


Usuario.hasMany(Meta, {
  foreignKey: "usuarioId",
});
Meta.belongsTo(Usuario, {
  foreignKey: "usuarioId",
});


Usuario.hasMany(Lembrete, {
  foreignKey: "usuarioId",
});
Lembrete.belongsTo(Usuario, {
  foreignKey: "usuarioId",
});


Usuario.hasMany(RegistroEstudo, {
  foreignKey: "usuarioId",
});
RegistroEstudo.belongsTo(Usuario, {
  foreignKey: "usuarioId",
});


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