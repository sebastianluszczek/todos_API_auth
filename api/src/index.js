const express = require('express');
const mongoose = require('mongoose');

const app = express();

const { handleError, logError } = require('./utils/error.utils');

// mongoDB connection
mongoose.connect(
  'mongodb://mongo:27017/todos',
  { useUnifiedTopology: true },
  () => console.log('Connected to Mongo database')
);

app.use(express.json());

app.use('/api/todos', require('./routes/todo.routes'));

app.use(logError);
app.use(handleError);

module.exports = app;
