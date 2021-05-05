class ErrorHandler extends Error {
  constructor(statusCode, errors) {
    super();
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

const handleError = (err, req, res, next) => {
  let { statusCode, errors } = err;
  res.status(statusCode || 500);
  res.json({
    status: 'error',
    errors,
  });
};

const logError = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }
  next(err);
};

module.exports = {
  ErrorHandler,
  handleError,
  logError,
};
