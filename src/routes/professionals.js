const { Router } = require('express');
const router = Router();
const { getAllProfessionals, getProfessionalForId, deleteProfessionalForId, insertProfessional, updateProfessional } = require('../services/professionals.services');

// GET all professionals
router.get('/', getAllProfessionals ); 

// GET An professionals
router.get('/:id', getProfessionalForId );

// DELETE An professionals
router.delete('/:id', deleteProfessionalForId );

// INSERT An professionals
router.post('/', insertProfessional );

// UPDATE An professionals
router.put('/:id', updateProfessional );

module.exports = router;