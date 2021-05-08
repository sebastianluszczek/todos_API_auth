const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// use 'utf8' to get string instead of byte array  (512 bit key)
const privateKEY = fs.readFileSync(
  path.join(__dirname, '../..', 'private.key'),
  'utf8'
);
const publicKEY = fs.readFileSync(
  path.join(__dirname, '../..', 'public.key'),
  'utf8'
);

const { getUserByEmail, createUser } = require('../services/user.services');

const { ErrorHandler } = require('../utils/error.utils');
const {
  registerUserValidator,
  loginUserValidator,
} = require('../utils/validation.utils');

module.exports.registerUser = async (req, res, next) => {
  try {
    // Validate request
    const { error } = registerUserValidator(req.body);
    if (error) throw new ErrorHandler(400, error.details[0].message);

    // check if email exist in database
    const emailExist = await getUserByEmail(req.body.email);
    if (emailExist) throw new ErrorHandler(400, 'Email already exist');

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await createUser({
      ...req.body,
      password: hashedPassword,
    });
    res.json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    // Validate request
    const { error } = loginUserValidator(req.body);
    if (error) throw new ErrorHandler(400, error.details[0].message);

    // check if email exist
    const user = await getUserByEmail(req.body.email);
    if (!user)
      throw new ErrorHandler(
        404,
        `User with email ${req.body.email} does not exist`
      );

    // check if password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) throw new ErrorHandler(401, 'Invalid password');

    // create and assign o token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.eamil,
      },
      privateKEY,
      {
        algorithm: 'RS256',
        // expiresIn: '1m',
      }
    );

    res.status(200).json({
      msg: 'User logged in',
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
