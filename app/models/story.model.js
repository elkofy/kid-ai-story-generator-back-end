const { DataTypes } = require('sequelize');
const sequelize = require('../../app');

const Story = sequelize.define("Story", {
    titleStory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {tableName: 'story'});
  
module.exports = {
  Story
};