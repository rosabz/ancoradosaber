const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const RegistroEstudo = sequelize.define(
  "RegistroEstudo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    metaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    dataEstudo: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    horasEstudadas: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
  },
  {
    tableName: "registro_estudo",
    timestamps: false,
  }
);

module.exports = RegistroEstudo;