const jwt = require('jsonwebtoken');

const fs = require('fs');
const path = require('path');

const publicKEY = fs.readFileSync(
  path.join(__dirname, '../..', 'public.key'),
  'utf8'
);
const { ErrorHandler } = require('../utils/error.utils');

module.exports.verifyToken = async (req, res, next) => {
  const authHeader = req.header('Authentication');
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) next(new ErrorHandler(401, 'Missing access token'));
  try {
    const verified = await jwt.verify(token, publicKEY, {
      algorithms: ['RS256'],
    });
    req.user = verified;
    next();
  } catch (error) {
    next(new ErrorHandler(401, 'Invalid access token'));
  }
};
