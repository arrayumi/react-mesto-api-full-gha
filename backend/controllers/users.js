const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const ConflictError = require('../errors/conflict-err');
const UnauthorizedError = require('../errors/unauthorized-err');

const SALT_ROUNDS = 10;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (users) res.status(200).send(users);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.findOne({ email })
    .then((userExists) => {
      if (userExists) {
        throw new ConflictError('Пользователь с таким email уже зарегистрирован');
      }
      bcrypt.hash(password, SALT_ROUNDS)
        .then((hash) => User.create({
          name,
          about,
          avatar,
          email,
          password: hash,
        }))
        .then((user) => {
          res.status(201).send({
            _id: user._id, name, about, avatar, email,
          });
        })
        .catch((error) => {
          if (error instanceof mongoose.Error.ValidationError) {
            throw new ValidationError('Невалидные данные');
          }
          next(error);
        });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(new NotFoundError('Пользователь по данному id не найден'))
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по данному id не найден');
      } else {
        res.status(200).send(user);
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        throw new ValidationError('Некорректные данные');
      }
      next(error);
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по данному id не найден');
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new ValidationError('Некорректные данные');
      }
      next(error);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по данному id не найден');
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      if ((error instanceof mongoose.Error.CastError)
        || (error instanceof mongoose.Error.ValidationError)) {
        throw new ValidationError('Некорректные данные');
      }
      next(error);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ValidationError('Поля email или пароль не могут быть пустыми');
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new UnauthorizedError('Пользователь с таким email не существует');
      else {
        bcrypt.compare(password, user.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) throw new UnauthorizedError('Пароль указан неверно');
            const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, { expiresIn: '7d' });
            res
              .cookie('jwt', token, {
                maxAge: 3600 * 24 * 7,
                httpOnly: true,
                sameSite: 'none',
                secure: true,
              })
              .status(200)
              .send({
                _id: user._id,
                email: user.email,
                name: user.name,
                about: user.about,
                avatar: user.avatar,
              });
          })
          .catch(next);
      }
    })
    .catch((error) => {
      if ((error instanceof mongoose.Error.CastError)
        || (error instanceof mongoose.Error.ValidationError)) {
        throw new ValidationError('Некорректные данные');
      }
      next(error);
    });
};

const getUserinfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь с данным id не найден');
      else {
        res.status(200).send(user);
      }
    })
    .catch((error) => {
      if ((error instanceof mongoose.Error.CastError)
        || (error instanceof mongoose.Error.ValidationError)) {
        throw new ValidationError('Некорректные данные');
      }
      next(error);
    });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateProfile,
  updateAvatar,
  login,
  getUserinfo,
};
