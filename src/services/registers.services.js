const { response } = require('express');
const { mysqlConnection } = require('../database.js');
const { ResultwithData, DataError, ResultOnly, ServerError } = require('../helpers/result.js');

const getAllRegisters = async ( req, res = response ) => {
    try {
        mysqlConnection.query('SELECT * FROM registers', (err, rows, fields) => {
            if(err) return ServerError(res, err);
            ResultwithData(res, 'Lista de regitros', rows );
        })
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const getRegisterForId = async ( req, res = response ) => {
    try {
        const { id } = req.params; 
        mysqlConnection.query('SELECT * FROM registers WHERE id = ?', [id], (err, rows, fields) => {
          if(err) return ServerError(res, err);
          ResultwithData(res, `Registros de ${id}`, rows[0] );
        });
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const deleteRegisterForId = async ( req, res = response ) => {
    try {
        const { id } = req.params;
        mysqlConnection.query('DELETE FROM registers WHERE id = ?', [id], (err, rows, fields) => {
            if(err) return ServerError(res, err);
            ResultOnly( res, 'Registro eliminado');
        });
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const insertRegister = async ( req, res = response ) => {
    try {
        const { name, salary} = req.body;
        console.log(id, name, salary);
        const query = ` INSERT INTO registers (id, name, salary) VALUES (${null}, "${name}", ${salary});`;
        mysqlConnection.query(query, (err, rows, fields) => {
            if(err) return ServerError(res, err);
            ResultOnly( res, 'Registro guardado');
        });
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const updateRegisterForId = async ( req, res = response ) => {
    try {
        const { id } = req.params;
        const { name, salary } = req.body;
        const query = `
          SET @id = ?;
          SET @name = ?;
          SET @salary = ?;
          CALL registersAddOrEdit(@id, @name, @salary);
        `;
        mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
            if(err) return ServerError(res, err);
            ResultOnly( res, 'Registro actualizado');
        } );
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

module.exports = { getAllRegisters, getRegisterForId, deleteRegisterForId, insertRegister, updateRegisterForId };
