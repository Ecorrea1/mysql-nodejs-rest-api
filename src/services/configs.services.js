const { response } = require('express');
const mysqlConnection  = require('../database.js');
const { ResultwithData, DataError, ResultOnly, ServerError } = require('../helpers/result.js');

const getAllConfigs = async ( req, res = response ) => {
    try {
        mysqlConnection.connect();
        mysqlConnection.query('SELECT * FROM configs', (err, rows, fields) => {
            if(err) return ServerError(res, err);
            ResultwithData(res, 'Lista de regitros', rows );
        })
        mysqlConnection.end();
    } catch (err) {
        console.log(err);
        return ServerError(res, err);
    }
}

const updateConfig = async ( req, res = response ) => {

try {
    mysqlConnection.connect( (error) => error ? DataError(res, error) : console.log('Conectado a la base de datos'));
    const { name, salary } = req.body;
    const { id } = req.params;
    const query = `
      SET @id = ?;
      SET @name = ?;
      SET @salary = ?;
      CALL registersAddOrEdit(@id, @name, @salary);
    `;
    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
        if(!err) {
          res.json({status: 'registers Updated'});
        } else {
            console.log(err);
        }
    });
    mysqlConnection.end();
    } catch (error) {
        console.log(err);
        return ServerError(res, err);
    }
}


module.exports = {
    getAllConfigs,
    updateConfig
}