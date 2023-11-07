const { response } = require('express');
const { mysqlConnection, poolConnection } = require('../config/database.js');
const { ResultwithData, DataError, ResultOnly, ServerError, NewData } = require('../helpers/result.js');

const getAllUsers = async ( req, res = response ) => {
    try {
        poolConnection.query( `SELECT * FROM users`, (err, rows, fields) => {
            if(err) return DataError(res, err);
            ResultwithData(res, 'Lista de usuarios', rows );
        })
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const getUserForId = async ( req, res = response ) => {
    try {
        const { id } = req.params; 
        poolConnection.query( sqlRegisters + 'WHERE id = ?', [id], (err, rows, fields) => {
          if(err) return DataError(res, err);
          ResultwithData(res, `Registros de ${id}`, rows[0] );
        });
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const deleteUserForId = async ( req, res = response ) => {
    try {
        const { id } = req.params;
        poolConnection.query('DELETE FROM users WHERE id = ?', [id], (err, rows, fields) => {
            if(err) return DataError(res, err);
            ResultOnly( res, 'Registro eliminado');
        });
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const insertUser = async ( req, res = response ) => {
    try {
        console.log('Entra a insertUser');
        console.log(req.body);
        const { user, name, password } = req.body;
        const query = `INSERT INTO users 
        (
         id,
         user,
         name, 
         password,
         enabled,
         created_at,
         updated_at
        ) VALUES 
        (${null},
        "${user}",
        "${name}", 
        "${password}",
        1,
        "${ new Date().getDate() }",
        "${ new Date().getDate() }"
        );`;
        poolConnection.query(query, (err, rows, fields) => {
            if(err) return DataError(res, err);
            NewData( res, 'Registro guardado', rows);
        });
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const updateUsersForId = async ( req, res = response ) => {
    try {
        const { id } = req.params;
        const { name, user, password, enabled } = req.body;
        const query = `
          SET @id = ?;
          SET @user = ?;
          SET @name = ?;
          SET @password = ?;
          SET @enabled = ?;
          CALL userAddOrEdit(@id, @user, @name, @password, @enabled);
        `;
        poolConnection.query(query, [id, user, name, password, enabled], (err, rows, fields) => {
            if(err) return DataError(res, err);
            ResultOnly( res, 'Registro actualizado');
        } );
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

module.exports = { getAllUsers, getUserForId, deleteUserForId, insertUser, updateUsersForId };
