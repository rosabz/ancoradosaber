const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Lembrete = sequelize.define(
  "Lembrete",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    descricao: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    dataHora: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "lembretes",
    timestamps: false,
  }
);

module.exports = Lembrete;