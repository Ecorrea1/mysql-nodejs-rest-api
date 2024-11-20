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

const serverUp = async (req, res = response) => {
  try {
    const {code} = req.params;
    const query = `SELECT id, description, type, enabled FROM configs WHERE code = "${code}"`;
    poolConnection.query(query, (err, rows, fields) => {
      if(err) return DataError(res, err);
      console.log(rows);
      
      return ResultwithData(res,'Solicitud exitosa', rows);
    });
  } catch (err) {
    console.log(err.message);
    return ServerError(res, err);
  }
}

const login = async ( req, res = response ) => {
  try {
    const { rut, pass } = req.body;
    const query = `SELECT * FROM users WHERE rut = ${ rut } AND pass = ${ pass }`;
    poolConnection.query(query, (err, rows, fields) => {
      if(err) return DataError(res, err);
      console.log(rows);
      
      return ResultwithData(res,'Usuario Correcto', rows);
    });

    // if(!userExist) return DataError(res, 'Usuario Incorrecto');
    // return ResultwithData(res,'Usuario Correcto', userExist);

  } catch (err) {
    console.log(err.message);
    return ServerError(res, err);
  }
}

module.exports = {
  getAllConfigs,
  updateConfig,
  serverUp
}