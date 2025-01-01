const { ServerError, NewData, ResultwithDataPagination, ResultwithData } = require('../helpers/result');
const services = require('../services/registers.services');
const create = async ( req, res ) => {
    try { 
        const response = await services.insertRegister(req, res);
        return NewData(res, 'Registro creado', response);
    } catch (error) {
        return ServerError(res, error.message);
    }
}

const get = async ( req, res ) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const index = parseInt( page) || 1;
        let limits = parseInt( limit) || 10;
        const offset = ( index - 1) * limits;
        const totalPages = await services.countRegisters();  
        const response = await services.getAllRegistersWithPagination( limits, offset);   
        return  ResultwithDataPagination(res, 'Lista de regitros', response, index, Math.ceil(totalPages[0].total / limits), index + 1, index - 1  );
    
    } catch (error) {
        return ServerError(res, error.message);
    }
}
const getWithWhere = async ( req, res ) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const index = parseInt( page) || 1;
        let limits = parseInt( limit) || 10;
        // const totalPages = Math.ceil( await services.getTotalRegisters() / 10);
        const totalPages = await services.countRegisters();
        const response = await services.getAllRegistersWithWhere(req, res);
        return  ResultwithDataPagination(res, 'Lista de regitros', response, index, Math.ceil(totalPages / limits), index + 1, index - 1  );
    
    } catch (error) {
        return ServerError(res, error.message);
    }
}

const getById = async ( req, res ) => {
    try {
        const { id } = req.params;
        const response = await services.getRegisterForId(id, res);
        return ResultwithData(res, `Registros de ${id}`, response[0] );
    } catch (error) {
        return ServerError(res, error.message);
    }
}

const getOptionsForSelect = async ( req, res ) => {
    try {
        const { table } = req.params;
        const response = await services.getOptionsForSelect(table, res);
        return ResultwithData(res, `Opciones de ${table}`, response);
    } catch (error) {
        return ServerError(res, error.message);
    }
}

const update = async ( req, res ) => {
    try {
        const { id } = req.params;
        const response = await services.updateRegisterForId(id, req, res);
        return ResultwithData(res, `Registros de ${id} actualizado`, response[0]);
        // ResultOnly(`Registros de ${id}`);
    } catch (error) {
        return ServerError(res, error.message);
    }
}

const _delete = async ( req, res ) => {
    try {
        const { id } = req.params;
        const response = await services.deleteRegisterForId(id, res);
        return ResultwithData(res, `Registros de ${id} eliminado`, response[0]);
    } catch (error) {
        return ServerError(res, error.message);
    }
}

module.exports = {
    create, 
    get,
    getWithWhere,
    getById,
    getOptionsForSelect,
    update, 
    _delete
};
