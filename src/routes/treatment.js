'use strict'
const { check } = require('express-validator');
const { valitedFields } = require('../middlewares/validated-field.middleware');
const { Router } = require('express');
const router = Router();
const { getAllTreatments, getTreatmentForId, deleteTreatmentForId, insertTreatment, updateTreatment } = require('../services/treatment.services');

router
    .get('/', getAllTreatments )
    .get('/:id',[check('id', 'El id es obligatio').not().isEmpty(), valitedFields], getTreatmentForId )
    .delete('/:id',[check('id', 'El id es obligatio').not().isEmpty(), valitedFields], deleteTreatmentForId )
    .post('/',[check('name', 'El nombre es obligatio').not().isEmpty(), valitedFields], insertTreatment )
    .post('/edit/:id',[check('id', 'El id es obligatio').not().isEmpty(), valitedFields], updateTreatment );

module.exports = router;