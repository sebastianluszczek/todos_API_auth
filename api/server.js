const mongoose = require('mongoose');
const app = require('./src');

// mongoDB connection
mongoose.connect(
  'mongodb://mongo:27017/todos',
  { useUnifiedTopology: true, useFindAndModify: true },
  () => console.log('Connected to Mongo database')
);

app.listen(3000, () => console.log('server started'));
