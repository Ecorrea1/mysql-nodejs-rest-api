const { response } = require('express');
const { mysqlConnection, poolConnection } = require('../database.js');
const { ResultwithData, DataError, ResultOnly, ServerError } = require('../helpers/result.js');

const sqlRegisters  = 
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
FROM registers `;

const getAllRegisters = async ( req, res = response ) => {
    try {
        poolConnection.query( sqlRegisters + `ORDER BY created_at DESC`, (err, rows, fields) => {
            if(err) return ServerError(res, err);
            ResultwithData(res, 'Lista de regitros', rows );
        })
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const getAllRegistersWithWhere = async ( req, res = response ) => {
    let sqlComplete = '';
    if(req.query){
        const { name, age, phone, total, payment, balance, cristal, treatment, frame, observation, professional, date_attention, order } = req.query;
        const query = sqlRegisters + 
        `WHERE OR name = "${name}", 
        OR age = ${age}, 
        OR phone = ${phone}, 
        OR total = ${total}, 
        OR payment = ${payment}, 
        OR balance = ${balance}, 
        OR cristal = ${cristal}, 
        OR treatment = ${treatment}, 
        OR frame = ${frame},
        OR observation = "${observation}",
        OR professional = ${professional}, 
        OR date_attention = "${date_attention}" `;
 
        if(order){
            sqlComplete = query + `ORDER BY ${order} DESC;`;
        } else {
            sqlComplete = query + `ORDER BY created_at DESC;`;
        }

    }else {
        sqlComplete = sqlRegisters + `ORDER BY created_at DESC`;
    }

    try {
        poolConnection.query( sqlComplete, (err, rows, fields) => {
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
        console.log('Entra a insertRegister');
        const { name, age, phone, total, payment, balance, cristal, treatment, frame, observation, professional, date_attention } = req.body;
        const query = `INSERT INTO registers 
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
         date_attention,
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
        "${ date_attention }",
        "${ new Date().getDate() }",
        "${ new Date().getDate() }"
        );`;
        poolConnection.query(query, (err, rows, fields) => {
            if(err) return ServerError(res, err);
            NewData( res, 'Registro guardado', rows[0]);
        });
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const updateRegisterForId = async ( req, res = response ) => {
    try {
        const { id } = req.params;
        const { name, total, payment, balance } = req.body;
        const query = `
          SET @id = ?;
          SET @name = ?;
          SET @total = ?;
          SET @payment = ?;
          SET @balance = ?;
          SET @updated_at = ?;
          CALL updateRegister(@id, @name, @payment, @updated_at);
        `;
        poolConnection.query(query, [id, name, total, payment,  balance, new Date().getDate()], (err, rows, fields) => {
            if(err) return ServerError(res, err);
            ResultOnly( res, 'Registro actualizado');
        } );
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const getOptionsForSelect = async ( req, res = response ) => {
    try {
        const { table } = req.params;
        poolConnection.query(`SELECT * FROM ${table}`, (err, rows, fields) => {
            if(err) return ServerError(res, err);
            ResultwithData(res, `Lista de ${table}`, rows );
        } );
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

module.exports = { getAllRegisters, getAllRegistersWithWhere, getRegisterForId, deleteRegisterForId, insertRegister, updateRegisterForId, getOptionsForSelect };
