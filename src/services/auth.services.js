const { response } = require('express');
const { poolConnection }  = require('../config/database.js');
const { ResultwithData, DataError, ServerError } = require('../helpers/result.js');

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
  login
}