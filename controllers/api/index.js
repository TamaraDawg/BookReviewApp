const router = require('express').Router();
const userRoutes = require('./userRoutes');
const upload = require('./upload');
// Using users route
router.use('/users', userRoutes);
router.use('/upload', upload);

module.exports = router;