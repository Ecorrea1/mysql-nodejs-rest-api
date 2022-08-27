const { Router } = require('express');
const router = Router();
const { getAllRegisters, getAllRegistersWithWhere, getRegisterForId, deleteRegisterForId, insertRegister, updateRegisterForId, getOptionsForSelect, getAllRegistersWithPagination } = require('../services/registers.services');

// GET all registerss
router.get('/', getAllRegistersWithPagination );

// GET An registers by id or name
router.get('/search', getAllRegistersWithWhere );

// GET An registers
router.get('/:id', getRegisterForId );

// DELETE An registers
router.delete('/:id', deleteRegisterForId );

// INSERT An registers
router.post('/', insertRegister );

// UPDATE An registers
router.put('/:id', updateRegisterForId );
router.post('/edit/:id', updateRegisterForId );

router.get('/table/:table', getOptionsForSelect );

module.exports = router;
