const express = require('express');

const app = express();

const { handleError, logError } = require('./utils/error.utils');

app.use(express.json());

app.use('/api/todos', require('./routes/todo.routes'));

app.use(logError);
app.use(handleError);

module.exports = app;
