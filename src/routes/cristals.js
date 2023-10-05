'use strict'
const { Router } = require('express');
const router = Router();
const { getAllCristals, getCristalForId, deleteCristalForId, insertCristal, updateCristal } = require('../services/cristals.services');

// GET all Cristals
router.get('/', getAllCristals ); 

// GET An Cristals
router.get('/:id', getCristalForId );

// DELETE An Cristals
router.delete('/:id', deleteCristalForId );

// INSERT An Cristals
router.post('/', insertCristal );

// UPDATE An Cristals
router.post('/edit/:id', updateCristal );

module.exports = router;