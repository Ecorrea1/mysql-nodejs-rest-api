const { Router } = require('express');
const router = Router();
const { getAllRegistersWithWhere, getRegisterForId, deleteRegisterForId, insertRegister, updateRegisterForId, getOptionsForSelect, getAllRegistersWithPagination } = require('../services/registers.services');

router
    .get('/', getAllRegistersWithPagination )
    .get('/search', getAllRegistersWithWhere )
    .get('/:id', getRegisterForId )
    .delete('/:id', deleteRegisterForId )
    .post('/', insertRegister )
    .post('/edit/:id', updateRegisterForId )
    .get('/table/:table', getOptionsForSelect )

module.exports = router;
