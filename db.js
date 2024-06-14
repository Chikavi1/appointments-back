const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Sonetasot', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;