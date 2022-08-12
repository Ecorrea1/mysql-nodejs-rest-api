const { response } = require('express');
const { poolConnection } = require('../database.js');
const { ResultwithData, DataError, ResultOnly, ServerError } = require('../helpers/result.js');

const getAllProfessionals = async ( req, res = response ) => {
    try {
        poolConnection.query('SELECT * FROM professionals', (err, rows, fields) => {
            if(err) return ServerError(res, err);
            ResultwithData(res, 'Lista de regitros', rows );
        })
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const getProfessionalForId = async ( req, res = response ) => {
    try {
        const { id } = req.params; 
        poolConnection.query('SELECT * FROM professionals WHERE id = ?', [id], (err, rows, fields) => {
          if(err) return ServerError(res, err);
          ResultwithData(res, `Registros de ${id}`, rows[0] );
        });
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const deleteProfessionalForId = async ( req, res = response ) => {
    try {
        const { id } = req.params;
        poolConnection.query('DELETE FROM professionals WHERE id = ?', [id], (err, rows, fields) => {
            if(err) return ServerError(res, err);
            ResultOnly( res, 'Registro eliminado');
        });
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const insertProfessional = async ( req, res = response ) => {
    try {
        const { name, profesion } = req.body;
        console.log(id, name, salary);
        const query = ` INSERT INTO professionals 
        (
         id,
         name, 
         profesion,
         enabled
        ) VALUES 
        (${null}, 
        "${name}", 
        ${profesion},
        ${1}
        );`;
        poolConnection.query(query, (err, rows, fields) => {
            if(err) return ServerError(res, err);
            ResultOnly( res, 'Registro guardado');
        });
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const updateProfessional = async ( req, res = response ) => {
    try {
        const { id } = req.params;
        const { name, salary } = req.body;
        const query = `
          SET @id = ?;
          SET @name = ?;
          SET @salary = ?;
          CALL registersAddOrEdit(@id, @name, @salary);
        `;
        poolConnection.query(query, [id, name, salary], (err, rows, fields) => {
            if(err) return ServerError(res, err);
            ResultOnly( res, 'Registro actualizado');
        } );
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

module.exports = { getAllProfessionals, getProfessionalForId, deleteProfessionalForId, insertProfessional, updateProfessional };
