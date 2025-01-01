const { Sequelize } = require('sequelize');
const  { config } = require('./config');
  
const sequelize = new Sequelize(
  config.dbName, // name database
  config.dbUser, // user database
  config.dbPassword, // password database
  {
    host: config.dbHost,
    dialect: 'mysql' 
  }
);

sequelize.sync();

module.exports = sequelize;