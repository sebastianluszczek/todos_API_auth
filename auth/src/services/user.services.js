const mongoose = require('mongoose');
const User = require('../models/user.model');

const { ErrorHandler } = require('../utils/error.utils');

module.exports.createUser = async data => {
  const doc = await User.create(data);
  return doc;
};
module.exports.getUserById = async id => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ErrorHandler(400, `'${id}' is not valid ID type`);
  }
  const doc = await User.findOne({ _id: id });
  return doc;
};
module.exports.getUserByEmail = async email => {
  const doc = await User.findOne({ email: email });
  return doc;
};
