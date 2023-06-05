const express = require('express');
const router = express.Router();

const homeRoutes = require('./routes/homeRoutes');

router.use('/', homeRoutes);

module.exports = router;
