const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Meta = sequelize.define(
  "Meta",
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

    percentual: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0,
    },

    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "metas",
    timestamps: false,
  }
);

module.exports = Meta;