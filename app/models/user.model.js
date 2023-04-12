const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {

  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { tableName: 'users' });

  User.sync({ force: true })
  return User;  
};