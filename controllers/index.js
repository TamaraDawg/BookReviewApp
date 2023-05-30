const router = require('express').Router();

console.log('main server index');
const apiRoutes = require('./api');
const home = require('./home.js');

router.use('/', home);
console.log('home hit');

router.use('/api', apiRoutes);
console.log('api hit');


module.exports = router;
