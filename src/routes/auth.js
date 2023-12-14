const express = require('express');
const router = express.Router(); 
const { login } = require('../services/auth.services');

router.post('/', login )

module.exports = router;