const { Router } = require('express');
const { getAllConfigs, updateConfig, serverUp } = require('../services/configs.services');
const router = Router();
const { check } = require('express-validator');
const { valitedFields } = require('../middlewares/validated-field.middleware');

router
    .get('/', getAllConfigs )
    .get('/:code',[check('code', 'El codigo es obligatorio').not().isEmpty(), valitedFields], serverUp )
    .put('/:id', updateConfig )

module.exports = router;
