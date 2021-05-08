const jwt = require('jsonwebtoken');

const fs = require('fs');
const path = require('path');

const publicKEY = fs.readFileSync(
  path.join(__dirname, '../..', 'public.key'),
  'utf8'
);
const { ErrorHandler } = require('../utils/error.utils');

module.exports.verifyToken = async (req, res, next) => {
  const token = req.header('Authentication').split(' ')[1];
  if (!token) throw new ErrorHandler(401, 'Missing access token');
  try {
    const verified = await jwt.verify(token, publicKEY, {
      algorithms: ['RS256'],
    });
    req.user = verified;
    next();
  } catch (error) {
    console.log(error);
    throw new ErrorHandler(401, 'Invalid access token');
  }
};
