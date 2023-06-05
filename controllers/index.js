const router = require('express').Router();
const userRoutes = require('../routes/userRoutes');
const upload = require('./upload.js');
// Using users route
router.use('/users', userRoutes);


// router.use('/upload', upload);
// console.log('upload hit');

router.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;