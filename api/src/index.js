const express = require('express');

const app = express();

const { handleError, logError } = require('./utils/error.utils');

app.use(express.json());

const { verifyToken } = require('./middlewares/auth.middlewares');

// app.use(verifyToken);

app.use('/api/todos', verifyToken, require('./routes/todo.routes'));

app.use(logError);
app.use(handleError);

module.exports = app;
