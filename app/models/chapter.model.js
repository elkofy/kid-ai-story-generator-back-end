const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Chapter = sequelize.define(
    "Chapter",
    {
      paragraphe: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      storyId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { tableName: "chapter" }
  );

  return Chapter;
};
