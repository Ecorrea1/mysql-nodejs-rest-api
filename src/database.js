const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'sql470.main-hosting.eu',
  user: 'u882038204_omc',
  password: 'Optica_1',
  database: 'u882038204_registros_omc',
  // multipleStatements: true,
  // debug: true
});

const poolConnection = mysql.createPool({ 
  connectionLimit : 10,
  acquireTimeout : 10000,
  host: 'sql470.main-hosting.eu',
  user: 'u882038204_omc',
  password: 'Optica_1',
  database: 'u882038204_registros_omc',
}); 

const conectado = () => {
  mysqlConnection.connect((error) => {
    if (error) throw error;
    console.log('Conectado a la base de datos');
  });
}

const query = (sql) => {
  mysqlConnection.query(sql, (err, rows) => {
    if (err) throw error;
    console.log('Consulta ejecutada');
    console.log(rows);
    return rows;
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
  desconectado
};


