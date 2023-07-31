const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-err');

const DEV_SECRET = 'secretkey';

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) next(new UnauthorizedError('Необходима авторизация'));

  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : DEV_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};

module.exports = {
  auth,
  DEV_SECRET,
};
