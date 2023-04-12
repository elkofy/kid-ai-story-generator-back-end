const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Chapter = sequelize.define(
    "Chapter",
    {
      paragraph: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
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
