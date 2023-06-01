const router = require('express').Router();
const { Book, Genre } = require('../models/index.js'); 

const sequelize = require('../config/connection.js');

const homeRoutes = require('./homeRoutes.js')
const apiRoutes = require('./api/index.js');

router.use('/', homeRoutes)
router.use('/api', apiRoutes);

module.exports = router;

