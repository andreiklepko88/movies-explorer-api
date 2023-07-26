const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

const { JWT_SECRET, NODE_ENV } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError('При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
  }
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    throw new UnauthorizedError('При авторизации произошла ошибка. Переданный токен некорректен.');
  }

  req.user = payload;

  return next();
};

module.exports = { auth };
