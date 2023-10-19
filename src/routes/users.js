const { Router } = require('express');
const router = Router();
const { getAllUsers, getUserForId, deleteUserForId, insertUser, updateUsersForId } = require('../services/users.services');

router
    .get('/', getAllUsers )
    .get('/:id', getUserForId )
    .delete('/:id', deleteUserForId )
    .post('/', insertUser )
    .put('/:id', updateUsersForId )

module.exports = router;