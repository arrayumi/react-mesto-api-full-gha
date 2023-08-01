const mongoose = require('mongoose');
const Card = require('../models/card');

const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const ForbiddenError = require('../errors/forbidden-err');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (cards) res.status(200).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new ValidationError('Невалидные данные');
      }
      next(error);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(new NotFoundError('Некорректный id карточки'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) throw new ForbiddenError('Нельзя удалить чужую карточку');
      res.status(200).send({ data: card });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        throw new ValidationError('Некорректные данные');
      }
      next(error);
    });
};

const addLike = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Некорректный id карточки'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        throw new ValidationError('Некорректные данные');
      }
      next(error);
    });
};

const deleteLike = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Некорректный id карточки'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        throw new ValidationError('Некорректные данные');
      }
      next(error);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
};
