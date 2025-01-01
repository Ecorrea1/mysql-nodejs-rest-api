const { response } = require('express');
const moment = require('moment');
const sequelize = require('../config/sequelize.js');
const { poolConnection } = require('../config/database.js');
const { ResultwithData, DataError, ServerError } = require('../helpers/result.js');

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
        poolConnection.query( sqlRegisters + `ORDER BY created_at DESC`, (err, rows, fields) => {
            if(err) return DataError(res, err);
            ResultwithData(res, 'Lista de registros', rows );
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
        if(!req.query) {
            console.log('NO tiene query');
            
            sqlComplete = sqlRegisters + `ORDER BY created_at DESC`;
            return   poolConnection.query( sqlComplete, (err, rows, fields) => {
                if(err) return DataError(res, err);
                ResultwithData( res, 'Lista de regitros', rows );
            })
        }    
    
        const { name, age, phone, total, cristal, treatment, frame, observation, professional, order, page = 1, limit = 10 } = req.query;
        let query = sqlRegisters +` WHERE `;
    
        if(name || age || phone || total || cristal || treatment || frame || observation || professional ) {
            let arrayQuery = [];
            if(name) arrayQuery.push(` name LIKE "%${name}%" `);
            if(age) arrayQuery.push(` age LIKE "%${parseInt(age)}%" `);
            if(phone) arrayQuery.push(` phone LIKE "%${phone}%" `);
            if(total) arrayQuery.push(` total LIKE "%${total}%" `);
            if(cristal) arrayQuery.push(` cristal LIKE "%${cristal}%" `);
            if(treatment) arrayQuery.push(` treatment LIKE "%${treatment}%" `);
            if(frame) arrayQuery.push(` frame LIKE "%${frame}%" `);
            if(observation) arrayQuery.push(` observation LIKE "%${observation}%" `);
            if(professional) arrayQuery.push(` professional LIKE "%${professional}%" `);
            // if(date_attention) arrayQuery.push(` date_attention LIKE "%${ moment( date_attention ).format('YYYY-MM-DD')}%" `);
            query +=  arrayQuery.join(' AND ');

        }
        
        sqlComplete = query + `ORDER BY ${ (order) ? order : 'created_at' } DESC`;

        let index = parseInt( page) || 1;
        let limits = parseInt( limit) || 10;
        const offset = (index - 1) * limits;
    
        if (page) sqlComplete += ` LIMIT ${ limits } OFFSET ${offset};`;

        poolConnection.query( sqlComplete, async (err, rows, fields) => {
            if(err) return DataError(res, err);
            return rows
        
        });

    } catch (error) {
        console.log( error );
        return ServerError( res, error);
    }
}
const countRegisters = async () => {
    console.log('Entra a countRegisters');
    try {
        return await sequelize.query('SELECT COUNT(*) AS total FROM registers', { type: sequelize.QueryTypes.SELECT } )
        .catch((error) => console.error(error.message));
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}
const getAllRegistersWithPagination = async ( limit, offset ) => {
    console.log('Entra a getAllRegistersWithPagination');
    try {
      return await sequelize.query( sqlRegisters + `ORDER BY created_at DESC LIMIT ${ limit } OFFSET ${ offset };` , { type: sequelize.QueryTypes.SELECT } )
      .catch((error) => console.error(error.message));
    } catch (error) {
      console.error(error.message)
    }
}
const getRegisterForId = async ( id ) => {
    console.log('Entra a getRegisterForId');
    try {
        return await sequelize.query(`SELECT * FROM registers WHERE id = ${ id }`, { type: sequelize.QueryTypes.SELECT })
        .catch((error) => console.error(error.message));
    } catch (error) {
        console.log(error);
    }
}
const deleteRegisterForId = async ( req, res = response ) => {
    console.log('Entra a deleteRegisterForId');
    try {
        const { id } = req.params;
        return await sequelize.query(`DELETE FROM registers WHERE id = ${ id }`, { type: sequelize.QueryTypes.DELETE })
        .catch((error) => console.error(error.message));
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

        return await sequelize.query(query, { type: sequelize.QueryTypes.INSERT })
        .catch((error) => console.error(error.message));
    
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}
const updateRegisterForId = async ( id, req, res = response ) => {
    console.log('Entra a updateRegisterForId');
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
            return rows[0];
        } );
    } catch (error) {
        console.log(error);
        return ServerError(res, error);
    }
}
const getOptionsForSelect = async ( table) => {
    console.log('Entra a getOptionsForSelect');
    try {
        return await sequelize.query(`SELECT * FROM ${ table } WHERE enabled = 1`, { type: sequelize.QueryTypes.SELECT })
        .catch((error) => console.error(error.message));
    } catch (error) {
        console.log(error);
    }
}

module.exports = { 
    getAllRegisters, 
    getAllRegistersWithWhere,
    getAllRegistersWithPagination,
    countRegisters,
    getRegisterForId, 
    deleteRegisterForId, 
    insertRegister, 
    updateRegisterForId, 
    getOptionsForSelect 
};
