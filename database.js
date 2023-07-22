// database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('laravel', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  "define": {
    "underscored": true
  }
});

module.exports = { sequelize, Sequelize };
