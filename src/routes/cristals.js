'use strict'
const { check } = require('express-validator');
const { valitedFields } = require('../middlewares/validated-field.middleware');
const { Router } = require('express');
const router = Router();
const { getAllCristals, getCristalForId, deleteCristalForId, insertCristal, updateCristal } = require('../services/cristals.services');

router
    .get('/', getAllCristals ) 
    .get('/:id', [check('id', 'El id es obligatio').not().isEmpty(), valitedFields],getCristalForId )
    .delete('/:id', [check('id', 'El id es obligatio').not().isEmpty(), valitedFields], deleteCristalForId )
    .post('/', [check('name', 'El nombre es obligatio').not().isEmpty(), valitedFields], insertCristal )
    .post('/edit/:id', [check('id', 'El id es obligatio').not().isEmpty(), valitedFields], updateCristal )

module.exports = router;