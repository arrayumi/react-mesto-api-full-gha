const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-err');

const JWT_SECRET = 'secretkey';

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) next(new UnauthorizedError('Необходима авторизация'));

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};

module.exports = {
  auth,
  JWT_SECRET,
};
