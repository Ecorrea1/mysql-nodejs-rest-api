const mysql = require('mysql');
const  { config } = require('./config');
const mysqlConnection = mysql.createConnection({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  // multipleStatements: true,
  // debug: true
});

const poolConnection = mysql.createPool({ 
  connectionLimit : 10,
  acquireTimeout : 10000,
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
}); 

const conectado = () => {
  mysqlConnection.connect((error) => {
    if (error) throw error;
    console.log('Conectado a la base de datos');
  });
}

const query = (sql) => {
  poolConnection.query(sql, (err, rows) => {
    if (err) throw error;
    console.log('Consulta ejecutada');
    console.log(rows);
    return rows;
 })
};
const countSQlAsTotal = (sql) => {
  poolConnection.query(sql, (err, rows) => {
    if (err) throw error;
    return rows[0].total;
 })
};

const desconectado = () => {
  mysqlConnection.end((error) => {
    if (error) throw error;
    console.log('Desconectado de la base de datos');
  });
}

module.exports = {
  mysqlConnection,
  poolConnection,
  conectado,
  query,
  countSQlAsTotal,
  desconectado
};