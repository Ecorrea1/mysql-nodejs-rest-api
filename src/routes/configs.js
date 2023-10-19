const { Router } = require('express');
const { getAllConfigs, updateConfig } = require('../services/configs.services');
const router = Router();

router
    .get('/', getAllConfigs )
    .put('/:id', updateConfig )

module.exports = router;
