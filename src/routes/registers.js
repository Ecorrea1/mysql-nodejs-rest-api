const { Router } = require('express');
const router = Router();
const { getAllRegisters, getRegisterForId, deleteRegisterForId, insertRegister, updateRegisterForId } = require('../services/registers.services');

// GET all registerss
router.get('/', getAllRegisters ); 

// GET An registers
router.get('/:id', getRegisterForId );

// DELETE An registers
router.delete('/:id', deleteRegisterForId );

// INSERT An registers
router.post('/', insertRegister );

// UPDATE An registers
router.put('/:id', updateRegisterForId );

module.exports = router;
