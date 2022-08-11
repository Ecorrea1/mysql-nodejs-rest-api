const { Router } = require('express');
const { getAllConfigs, updateConfig } = require('../services/configs.services');
const router = Router();

// GET all registerss
router.get('/', getAllConfigs ); 

// // GET An registers
// router.get('/:id', getRegisterForId );

// // DELETE An registers
// router.delete('/:id', deleteRegisterForId );

// // INSERT An registers
// router.post('/', insertRegister );

router.put('/:id', updateConfig );

module.exports = router;
