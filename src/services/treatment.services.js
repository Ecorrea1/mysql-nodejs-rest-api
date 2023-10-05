const { response } = require('express');
const { poolConnection } = require('../database.js');
const { ResultwithData, DataError, ResultOnly, ServerError } = require('../helpers/result.js');

const getAllTreatments = async ( req, res = response ) => {
    try {
        poolConnection.query('SELECT * FROM treatment', (err, rows, fields) => {
            if(err) return DataError(res, err);
            ResultwithData(res, 'Lista de regitros', rows );
        })
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const getTreatmentForId = async ( req, res = response ) => {
    try {
        const { id } = req.params; 
        poolConnection.query('SELECT * FROM treatment WHERE id = ?', [id], (err, rows, fields) => {
          if(err) return DataError(res, err);
          ResultwithData(res, `Registros de ${id}`, rows[0] );
        });
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const deleteTreatmentForId = async ( req, res = response ) => {
    try {
        const { id } = req.params;
        poolConnection.query('DELETE FROM treatment WHERE id = ?', [id], (err, rows, fields) => {
            if(err) return DataError(res, err);
            ResultOnly( res, 'Registro eliminado');
        });
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const insertTreatment = async ( req, res = response ) => {
    try {
        const { name, description, enabled } = req.body;
        console.log( name, description, enabled);
        const query = ` INSERT INTO treatment 
        (name, 
         description,
         enabled
        ) VALUES 
        ( "${name}", 
        "${description}",
        ${enabled}
        );`;
        poolConnection.query(query, (err, rows, fields) => {
            if(err) return DataError(res, err);
            ResultOnly( res, 'Registro guardado');
        });
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const updateTreatment = async ( req, res = response ) => {
    try {
        const { id } = req.params;
        const { name, description, enabled } = req.body;
        const query =` UPDATE treatment
        SET name = ?,
        description = ?,
        enabled = ?
        WHERE id = ${ id };`
        poolConnection.query(query, [ name, description, enabled], (err, rows, fields) => {
            if(err) return DataError(res, err);
            ResultOnly( res, 'Registro actualizado');
        } );
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

module.exports = { getAllTreatments, getTreatmentForId, deleteTreatmentForId, insertTreatment, updateTreatment };
