const { Router } = require('express');
const router = Router();
const { getAllUsers, getUserForId, deleteUserForId, insertUser, updateUsersForId } = require('../services/users.services');

// GET all users
router.get('/', getAllUsers );

// GET An registers
router.get('/:id', getUserForId );

// DELETE An registers
router.delete('/:id', deleteUserForId );

// INSERT An registers
router.post('/', insertUser );

// UPDATE An registers
router.put('/:id', updateUsersForId );

module.exports = router;