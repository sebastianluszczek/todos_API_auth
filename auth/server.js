const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./src');

// mongoDB connection
mongoose.connect(
  'mongodb://mongo-auth:27017/users',
  { useUnifiedTopology: true, useFindAndModify: true },
  () => console.log('Connected to auth database')
);

app.listen(4000, () => console.log('auth server started'));
