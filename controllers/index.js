const router = require('express').Router();

const apiRoutes = require('./api'); // Default to index.js file inside api folder
// const home = require('./home.js');

// to go to home page
// router.use('/', home);

// to use the api routes
router.use('/api', apiRoutes);

module.exports = router;
