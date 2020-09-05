/* eslint-disable no-console */
const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      console.log(err);
      return res.status(err.message ? 404 : 500).send({ message: err.message || 'На сервере произошла ошибка.' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      console.log(err);
      return res.status(err.message ? 404 : 500).send({ message: err.message || 'На сервере произошла ошибка.' });
    });
};

const deleteCard = (req, res) => Card.findByIdAndRemove(req.params.id)
  .orFail(new Error('NotValidId'))
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.message === 'NotValidId') {
      return res.status(404).send({ message: 'Карточки с таким id не существует' });
    }
    console.log(err);
    return res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка.' });
  });

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(new Error('NotValidId'))
  .then((likes) => res.send({ data: likes }))
  .catch((err) => {
    if (err.message === 'NotValidId') {
      return res.status(404).send({ message: 'Карточки с таким id не существует' });
    }
    console.log(err);
    return res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка.' });
  });

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(new Error('NotValidId'))
  .then((likes) => res.send({ data: likes }))
  .catch((err) => {
    if (err.message === 'NotValidId') {
      return res.status(404).send({ message: 'Карточки с таким id не существует' });
    }
    console.log(err);
    return res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка.' });
  });

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
