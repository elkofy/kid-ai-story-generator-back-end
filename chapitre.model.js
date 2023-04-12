const { DataTypes } = require('sequelize');
const sequelize = require('./app');

const Chapitre = sequelize.define("Chapitre", {
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
  }, {tableName: 'chapitres'});
  
module.exports = {
  Chapitre
};