// models/task.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Task = sequelize.define('todos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
  
});

module.exports = Task;
