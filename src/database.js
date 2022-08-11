const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'sql470.main-hosting.eu',
  user: 'u882038204_omc',
  password: 'Optica_1',
  database: 'u882038204_registros_omc',
  // multipleStatements: true,
  // debug: true
});

module.exports = mysqlConnection;


