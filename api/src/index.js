const express = require('express');
const mongoose = require('mongoose');

const app = express();

// mongoDB connection
mongoose.connect(
  'mongodb://mongo:27017/todos',
  { useUnifiedTopology: true },
  () => console.log('Connected to Mongo database')
);

app.get('/', (req, res) => {
  res.send('success');
});

module.exports = app;
