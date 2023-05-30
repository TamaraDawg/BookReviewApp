const router = require('express').Router();
const userRoutes = require('./userRoutes');
const upload = require('./upload.js');
const newUser = require('./newUser.js');
// Using users route
router.use('/newUser', newUser);

router.use('/users', userRoutes);
console.log('user hit');

router.use('/upload', upload);
console.log('upload hit');

router.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;