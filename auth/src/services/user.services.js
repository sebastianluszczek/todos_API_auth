const mongoose = require('mongoose');
const User = require('../models/user.model');

const { ErrorHandler } = require('../utils/error.utils');

module.exports.createUser = async data => {
  try {
    const doc = await User.create(data);
    return doc;
  } catch (error) {
    throw error;
  }
};
module.exports.getUserById = async id => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ErrorHandler(400, `'${id}' is not valid ID type`);
    }
    const doc = await User.findOne({ _id: id });
    return doc;
  } catch (error) {
    throw error;
  }
};
module.exports.getUserByEmail = async email => {
  try {
    const doc = await User.findOne({ email: email });
    return doc;
  } catch (error) {
    throw error;
  }
};
