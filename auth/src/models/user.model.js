const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 5,
    max: 100,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true,
  },
  password: {
    type: String,
    min: 5,
    max: 100,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
