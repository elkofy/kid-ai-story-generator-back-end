const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Story = sequelize.define(
    "story",
    {
      storyId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
    },
    { tableName: "story" }
  );

  return Story;
};
