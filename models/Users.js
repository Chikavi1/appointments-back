const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Users = sequelize.define('Users', {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  curp:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
});

module.exports = Users;