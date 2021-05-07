const express = require('express');

const app = express();

const { handleError, logError } = require('./utils/error.utils');

app.use(express.json());

app.use('/auth', require('./routes/auth.routes'));

app.use(logError);
app.use(handleError);

module.exports = app;
