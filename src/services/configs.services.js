const { response } = require('express');
const { poolConnection }  = require('../config/database.js');
const { ResultwithData, DataError, ServerError } = require('../helpers/result.js');

const getAllConfigs = async ( req, res = response ) => {
    try {
        poolConnection.query('SELECT * FROM configs', (err, rows, fields) => {
            if(err) return ServerError(res, err);
            ResultwithData(res, 'Lista de regitros', rows );
        })
    } catch (err) {
        console.log(err);
        return ServerError(res, err);
    }
}

const updateConfig = async ( req, res = response ) => {

try {
    poolConnection.connect( (error) => error ? DataError(res, error) : console.log('Conectado a la base de datos'));
    const { name, salary } = req.body;
    const { id } = req.params;
    const query = `
      SET @id = ?;
      SET @name = ?;
      SET @salary = ?;
      CALL registersAddOrEdit(@id, @name, @salary);
    `;
    poolConnection.query(query, [id, name, salary], (err, rows, fields) => {
        if(!err) {
          res.json({status: 'registers Updated'});
        } else {
            console.log(err);
        }
    });
    poolConnection.end();
    } catch (error) {
        console.log(err);
        return ServerError(res, err);
    }
}


module.exports = {
    getAllConfigs,
    updateConfig
}