const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Appointments = sequelize.define('Appointments', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  curp: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  date:{
    type: DataTypes.DATE,
    allowNull: false,
  }
});

module.exports = Appointments;