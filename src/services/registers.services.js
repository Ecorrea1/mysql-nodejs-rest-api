const { response } = require('express');
const {conectado, query, desconectado} = require('../database.js');
const { ResultwithData, DataError, ResultOnly, ServerError } = require('../helpers/result.js');

const getAllRegisters = async ( req, res = response ) => {
    try {
        // conectado();
        const result = query('SELECT * FROM registers');
        if (!result) return DataError(res, 'No se encontraron registros');
        if (result.lenght === 0) return ResultOnly(res, 'No hay registros');
        ResultwithData(res, 'Lista de regitros', result);
        // desconectado();
    } catch (err) {
        console.log(err);
        return ServerError(res, err);
    }
}

// const getRegisterForId = async ( req, res = response ) => {
//     try {
//         mysqlConnection.connect( (error) => error ? DataError(res, error) : console.log('Conectado a la base de datos'));
//         const { id } = req.params; 
//         mysqlConnection.query('SELECT * FROM registers WHERE id = ?', [id], (err, rows, fields) => {
//           if(err) return ServerError(res, err);
//           ResultwithData(res, `Registros de ${id}`, rows[0] );
//         });
//         mysqlConnection.end();
//     } catch (error) {
//         console.log(err);
//         return ServerError(res, err);
//     }
// }

// const deleteRegisterForId = async ( req, res = response ) => {
//     try {
//         const { id } = req.params;
//         mysqlConnection.connect( (error) => error ? DataError(res, error) : console.log('Conectado a la base de datos'));
//         mysqlConnection.query('DELETE FROM registers WHERE id = ?', [id], (err, rows, fields) => {
//             if(err) return ServerError(res, err);
//             ResultOnly( res, 'Registro eliminado');
//         });
//         mysqlConnection.end();
//     } catch (error) {
//         console.log(err);
//         return ServerError(res, err);
//     }
// }

// const insertRegister = async ( req, res = response ) => {
//     try {
//         const {id, name, salary} = req.body;
//         console.log(id, name, salary);
//         mysqlConnection.connect( (error) => error ? DataError(res, error) : console.log('Conectado a la base de datos'));d
//         const query = `
//           SET @id = ?;
//           SET @name = ?;
//           SET @salary = ?;
//           CALL registersAddOrEdit(@id, @name, @salary);
//         `;
//         mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
//             if(err) return ServerError(res, err);
//             ResultOnly( res, 'Registro guardado');
//         });
//         mysqlConnection.end();
//     } catch (error) {
//         console.log(err);
//         return ServerError(res, err);
//     }
// }

module.exports = { getAllRegisters };
// module.exports = { getAllRegisters, getRegisterForId, deleteRegisterForId, insertRegister };
