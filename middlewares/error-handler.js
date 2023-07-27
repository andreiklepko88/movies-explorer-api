const { SERVER_ERROR_CODE } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка.' });
  }
  next();
};

module.exports = errorHandler;
