const express = require('express');
const morgan = require('morgan');

const homeRoutes = require('./routes/homeRoutes');

const app = express();

// Development Logging
app.use(morgan('dev'));

app.use('/', homeRoutes);

module.exports = router;
