const jwt = require('jsonwebtoken');
const config = require('../config');

const UnauthorizedError = require('../errors/unauthorized-err');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) next(new UnauthorizedError('Необходима авторизация'));

  let payload;

  try {
    payload = jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};

module.exports = auth;
