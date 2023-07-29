const { celebrate, Joi } = require('celebrate');
const mongoose = require('mongoose');
const NotFoundError = require('../errors/not-found-err');

const regexLink = /(http(s)?:\/\/(www\.)?)[0-9a-zA-Z\-._~:/?#[\]@!$&'()*+,;=]+#?/;

// login and register
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexLink),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
});

// userId

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().custom((value) => {
      const isValid = mongoose.isValidObjectId(value);
      if (isValid) return value;
      throw new NotFoundError('Пользователь по данному id не найден');
    }),
  }),
});

// cardId

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().custom((value) => {
      const isValid = mongoose.isValidObjectId(value);
      if (isValid) return value;
      throw new NotFoundError('Карточка с данным id не найдена');
    }),
  }),
});

// users

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(regexLink),
  }),
});

// cards

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regexLink),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateUpdateProfile,
  validateUpdateAvatar,
  validateCreateCard,
  validateUserId,
  validateCardId,
};
