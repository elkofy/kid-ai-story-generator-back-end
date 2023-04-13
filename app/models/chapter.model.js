const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Chapter = sequelize.define(
    "chapter",
    {
      paragraph: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(750),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
    { tableName: "chapter" }
  );

  return Chapter;
};
