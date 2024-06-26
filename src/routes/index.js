const { Router } = require('express');
const router = Router();
function routerApi(app) {
    app.use('/api', router); 
    router.use('/users', require('./users'));
    router.use('/auth', require('./auth'));
    router.use('/registers', require('./registers'));
    router.use('/cristals', require('./cristals'));
    router.use('/treatment', require('./treatment'));
    router.use('/configs', require('./configs'));
}

module.exports = routerApi;