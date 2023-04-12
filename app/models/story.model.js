const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Story = sequelize.define(
    "Story",
    {
      titleStory: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { tableName: "story" }
  );

  return Story;
};
