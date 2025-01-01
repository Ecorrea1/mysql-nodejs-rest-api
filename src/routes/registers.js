const { Router } = require('express');
const service = require('../controllers/register.controller');
const router = Router();

router
    .get('/', service.get )
    .get('/search', service.getWithWhere )
    .get('/:id', service.getById )
    .delete('/:id', service._delete )
    .post('/', service.create )
    .post('/edit/:id', service.update )
    .get('/table/:table', service.getOptionsForSelect );

module.exports = router;
