'use strict'
const { Router } = require('express');
const router = Router();
const { getAllTreatments, getTreatmentForId, deleteTreatmentForId, insertTreatment, updateTreatment } = require('../services/treatment.services');

// GET all Treatments
router.get('/', getAllTreatments ); 

// GET An Treatments
router.get('/:id', getTreatmentForId );

// DELETE An Treatments
router.delete('/:id', deleteTreatmentForId );

// INSERT An Treatments
router.post('/', insertTreatment );

// UPDATE An Treatments
router.post('/edit/:id', updateTreatment );

module.exports = router;