const { response } = require('express');
const { ServerError, DataError, ResultwithData } = require('../../helpers/result');

const mysqlConnection  = require('../database.js');

const getAllRegisters = async( req, res = response) => {
    try {
        mysqlConnection.query('SELECT * FROM registers', (err, rows, fields) => {
            if(err) return ServerError(res, err);
            ResultwithData(res, rows);
         })
    } catch (err) {
        console.log(err);
        return ServerError(res, err);
    }
}

module.exports =  getAllRegisters;
