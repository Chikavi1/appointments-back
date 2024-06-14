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
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Appointments;