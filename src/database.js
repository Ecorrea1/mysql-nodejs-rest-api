const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'sql470.main-hosting.eu',
  user: 'u882038204_omc',
  password: 'Optica_1',
  database: 'u882038204_registros_omc',
  multipleStatements: true,
  // debug: true
});

connection.connect(function (err) {
  if (err) return console.error(err);
  console.log('database is connected');
});
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();
// mysqlConnection.connect(function (err) {
//   if (err) return console.error(err);
//   console.log('database is connected');
// });

module.exports = connection;
