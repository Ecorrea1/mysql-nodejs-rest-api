const { response } = require('express');
const { mysqlConnection, poolConnection } = require('../database.js');
const { ResultwithData, DataError, ResultOnly, ServerError } = require('../helpers/result.js');

const getAllRegisters = async ( req, res = response ) => {
    try {
        poolConnection.query('SELECT * FROM registers', (err, rows, fields) => {
            if(err) return ServerError(res, err);
            ResultwithData(res, 'Lista de regitros', rows );
        })
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const getAllRegistersWithWhere = async ( req, res = response ) => {
    try {
        poolConnection.query(
            `SELECT
            id,
            name, 
            age,
            phone,
            total,
            payment,
            balance,
            (SELECT name FROM cristals WHERE id = cristal) AS cristal,
            (SELECT name FROM treatment WHERE id = treatment) AS treatment,
            frame,
            observation,
            (SELECT name FROM professionals WHERE id = professional) as professional,
            date_attention,
            created_at,
            updated_at
            FROM 
            registers`,
            (err, rows, fields) => {
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
        poolConnection.query('SELECT * FROM registers WHERE id = ?', [id], (err, rows, fields) => {
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
        poolConnection.query('DELETE FROM registers WHERE id = ?', [id], (err, rows, fields) => {
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
        const { name, age, phone, total, payment, balance, cristal, treatment, frame, observation, professional, date_attention, created_at, updated_at} = req.body;
        console.log(id, name, salary);
        const query = ` INSERT INTO registers 
        (
         id,
         name, 
         age,
         phone,
         total,
         payment,
         balance,
         cristal,
         treatment,
         frame,
         observation,
         professional,
         date_atenttion,
         created_at,
         updated_at
        ) VALUES 
        (${null}, 
        "${name}", 
        ${age}, 
        ${phone}, 
        ${total}, 
        ${payment}, 
        ${balance}, 
        ${cristal},
        ${treatment},
        ${frame},
        "${observation}",
        ${professional},
        "${ date_attention}",
        "${ new Date() }",
        "${ new Date() }"
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
        poolConnection.query(query, [id, name, salary], (err, rows, fields) => {
            if(err) return ServerError(res, err);
            ResultOnly( res, 'Registro actualizado');
        } );
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

module.exports = { getAllRegisters, getAllRegistersWithWhere, getRegisterForId, deleteRegisterForId, insertRegister, updateRegisterForId };
