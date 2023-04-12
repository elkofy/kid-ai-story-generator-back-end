const { DataTypes } = require('sequelize');
const sequelize = require('./app');

const User = sequelize.define("User", {
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {tableName: 'users'});
  
  module.exports = {
    User
  };