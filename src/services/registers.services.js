const { response } = require('express');
const moment = require('moment');
const { mysqlConnection, poolConnection } = require('../database.js');
const { ResultwithData, ResultwithDataPagination, NewData, DataError, ResultOnly, ServerError } = require('../helpers/result.js');

const sqlRegisters  = 
`SELECT
id,
name, 
age,
phone,
total,
(SELECT name FROM cristals WHERE id = cristal) AS cristal,
(SELECT name FROM treatment WHERE id = treatment) AS treatment,
frame,
observation,
professional,
date_attention,
far_eye_right_sphere,
far_eye_left_sphere,
far_eye_right_cylinder,
far_eye_left_cylinder,
far_eye_right_grade,
far_eye_left_grade,
far_eye_right_pupillary_distance,
far_eye_left_pupillary_distance,
near_eye_right_sphere,
created_at,
updated_at
FROM registers `;

const getAllRegisters = async ( req, res = response ) => {
    console.log('Entra a getAllRegisters');
    try {
        poolConnection.query( sqlRegisters + `ORDER BY created_at ASC`, (err, rows, fields) => {
            if(err) return DataError(res, err);
            ResultwithData(res, 'Lista de regitros', rows );
        })
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const getAllRegistersWithWhere = async ( req, res = response ) => {
    console.log('Entra a getAllRegistersWithWhere');
    try {
    let sqlComplete = '';
    if(req.query){
        const { name, age, phone, total, cristal, treatment, frame, observation, professional, date_attention, order, page, limit } = req.query;
        let query = sqlRegisters +` WHERE `;

        if(name || age || phone || total || payment || balance || cristal || treatment || frame || observation || professional || date_attention){
            let arrayQuery = [];
            if(name) arrayQuery.push(` name LIKE "%${name}%" `);
            if(age) arrayQuery.push(` age LIKE "%${age}%" `);
            if(phone) arrayQuery.push(` phone LIKE "%${phone}%" `);
            if(total) arrayQuery.push(` total LIKE "%${total}%" `);
            if(cristal) arrayQuery.push(` cristal LIKE "%${cristal}%" `);
            if(treatment) arrayQuery.push(` treatment LIKE "%${treatment}%" `);
            if(frame) arrayQuery.push(` frame LIKE "%${frame}%" `);
            if(observation) arrayQuery.push(` observation LIKE "%${observation}%" `);
            if(professional) arrayQuery.push(` professional LIKE "%${professional}%" `);
            if(date_attention) arrayQuery.push(` date_attention LIKE "%${ moment( date_attention ).format('YYYY-MM-DD')}%" `);
            query +=  arrayQuery.join(' AND ');
    
        }

        sqlComplete = query + `ORDER BY ${ (order) ? order : 'created_at' } ASC`;
        
        if (page) sqlComplete += ` LIMIT ${ limit ?? 10 } OFFSET ${( limit ?? 10 ) * ( page - 1 )};`;
        

    } else {

        sqlComplete = sqlRegisters + `ORDER BY created_at DESC`;
    }
        poolConnection.query( sqlComplete, (err, rows, fields) => {
            if(err) return DataError(res, err);
            ResultwithData( res, 'Lista de regitros', rows );
        })
    } catch (error) {
        console.log( error );
        return ServerError( res, error);
    }
}


const getAllRegistersWithPagination = async ( req, res = response ) => {
    console.log('Entra a getAllRegistersWithPagination');
    console.log(req.query);
    const { page = 1, limit = 10 } = req.query;
    console.log('page: ', page);
    
    const offset = limit * (page - 1);
    const sqlComplete = sqlRegisters + `ORDER BY created_at DESC LIMIT ${ limit } OFFSET ${ offset };`;
    try {
        poolConnection.query( sqlComplete, (err, rows, fields) => {
            if(err) return DataError(res, err);
            ResultwithDataPagination(res, 'Lista de regitros', rows, page + 1, page <= 0 ?  page = 1 : page - 1,  );
        } );
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const getRegisterForId = async ( req, res = response ) => {
    console.log('Entra a getRegisterForId');
    try {
        const { id } = req.params; 
        poolConnection.query('SELECT * FROM registers WHERE id = ?', [id], (err, rows, fields) => {
          if(err) return DataError(res, err);
          ResultwithData(res, `Registros de ${id}`, rows[0] );
        });
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const deleteRegisterForId = async ( req, res = response ) => {
    console.log('Entra a deleteRegisterForId');
    try {
        const { id } = req.params;
        poolConnection.query('DELETE FROM registers WHERE id = ?', [id], (err, rows, fields) => {
            if(err) return DataError(res, err);
            ResultOnly( res, 'Registro eliminado');
        });
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const insertRegister = async ( req, res = response ) => {
    console.log('Entra a insertRegister');
    try {
        const { 
            name, 
            age, 
            phone,
            total,
            cristal, 
            treatment, 
            frame, 
            observation, 
            professional, 
            date_attention,
            far_eye_right_sphere,
            far_eye_left_sphere,
            far_eye_right_cylinder,
            far_eye_left_cylinder,
            far_eye_right_grade,
            far_eye_left_grade,
            far_eye_right_pupillary_distance,
            far_eye_left_pupillary_distance,
            near_eye_right_sphere
        } = req.body;
        const query = `INSERT INTO registers 
        (
         id,
         name, 
         age,
         phone,
         total,
         cristal,
         treatment,
         frame,
         observation,
         professional,
         date_attention,
         far_eye_right_sphere,
         far_eye_left_sphere,
         far_eye_right_cylinder,
         far_eye_left_cylinder,
         far_eye_right_grade,
         far_eye_left_grade,
         far_eye_right_pupillary_distance,
         far_eye_left_pupillary_distance,
         near_eye_right_sphere,
         created_at,
         updated_at
        ) VALUES 
        (${null}, 
        "${name}", 
        ${age}, 
        ${phone}, 
        ${total},
        ${cristal},
        ${treatment},
        "${frame}",
        "${observation}",
        "${professional}",
        "${ moment(date_attention).format('YYYY-MM-DD')}",
        ${far_eye_right_sphere ?? 0 },
        ${far_eye_left_sphere ?? 0 },
        ${far_eye_right_cylinder ?? 0},
        ${far_eye_left_cylinder ?? 0},
        ${far_eye_right_grade ?? 0},
        ${far_eye_left_grade ?? 0},
        ${far_eye_right_pupillary_distance ?? 0},
        ${far_eye_left_pupillary_distance ?? 0},
        ${near_eye_right_sphere ?? 0},
        "${ moment().format("YYYY-MM-DD") }",
        "${ moment().format("YYYY-MM-DD") }"
        );`;
        poolConnection.query(query, (err, rows, fields) => {
            if(err) return DataError(res, err);
            console.log(rows[0]);
            console.log('Aqui deberia de insertar');
            NewData( res, 'Registro guardado', rows[0]);
        });
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const updateRegisterForId = async ( req, res = response ) => {
    console.log('Entra a updateRegisterForId');
    try {
        const { id } = req.params;
        const { 
            name, 
            age, 
            phone,
            total,
            cristal, 
            treatment, 
            frame, 
            observation, 
            professional, 
            date_attention,
            far_eye_right_sphere,
            far_eye_left_sphere,
            far_eye_right_cylinder,
            far_eye_left_cylinder,
            far_eye_right_grade,
            far_eye_left_grade,
            far_eye_right_pupillary_distance,
            far_eye_left_pupillary_distance,
            near_eye_right_sphere
        } = req.body;
        const query = `
         UPDATE registers
          SET name = ?,
          age = ?,
          phone = ?,
          total = ?,
          cristal = ?,
          treatment = ?,
          frame = ?,
          observation = ?,
          professional = ?,
          date_attention = ?,
          far_eye_right_sphere = ?,
          far_eye_left_sphere = ?,
          far_eye_right_cylinder = ?,
          far_eye_left_cylinder = ?,
          far_eye_right_grade = ?,
          far_eye_left_grade = ?,
          far_eye_right_pupillary_distance = ?,
          far_eye_left_pupillary_distance = ?,
          near_eye_right_sphere = ?,
          updated_at = ?
          WHERE id = ${ id };`;
        poolConnection.query(query, 
            [
                name, 
                age, 
                phone, 
                total,
                cristal, 
                treatment, 
                frame, 
                observation, 
                professional, 
                moment(date_attention).format('YYYY-MM-DD'),
                far_eye_right_sphere ?? 0,
                far_eye_left_sphere ?? 0,
                far_eye_right_cylinder ?? 0,
                far_eye_left_cylinder ?? 0,
                far_eye_right_grade ?? 0,
                far_eye_left_grade ?? 0,
                far_eye_right_pupillary_distance ?? 0,
                far_eye_left_pupillary_distance ?? 0,
                near_eye_right_sphere ?? 0,
                moment().format("YYYY-MM-DD") ], 
            (err, rows, fields) => {
            console.log(err);
            if(err) return DataError(res, err);
            ResultOnly( res, 'Registro actualizado');
        } );
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

const getOptionsForSelect = async ( req, res = response ) => {
    console.log('Entra a getOptionsForSelect');
    try {
        const { table } = req.params;
        poolConnection.query(`SELECT * FROM ${ table } WHERE enabled = 1`, (err, rows, fields) => {
            if(err) return DataError( res, err );
            ResultwithData(res, `Lista de ${ table }`, rows );
        } );
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}

module.exports = { 
    getAllRegisters, 
    getAllRegistersWithWhere,
    getAllRegistersWithPagination,
    getRegisterForId, 
    deleteRegisterForId, 
    insertRegister, 
    updateRegisterForId, 
    getOptionsForSelect 
};
