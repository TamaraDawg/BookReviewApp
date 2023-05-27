const router = require('express').Router();

const userProfile = require('./userprofile');

router.use('/users', userProfile);

module.exports = router;