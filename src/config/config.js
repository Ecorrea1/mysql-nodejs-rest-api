require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser:  process.env.BBDD_USER,
  dbPassword:  process.env.BBDD_PASSWORD,
  dbHost:  process.env.BBDD_HOST,
  dbName:  process.env.BBDD_NAME,
//   dbPort:  process.env.DB_PORT,
}

module.exports = { config };