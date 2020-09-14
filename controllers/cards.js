/* eslint-disable no-console */
const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: 'На сервере произошла ошибка.' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка.' });
    });
};

const deleteCard = (req, res) => Card.findByIdAndRemove(req.params.id)
  .orFail()
  .then((card) => res.send(card))
  .catch((err) => {
    console.log(err);
    if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: 'Карточки с таким id не существует' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send({ message: 'На сервере произошла ошибка.' });
  });

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail()
  .then((likes) => res.send({ data: likes }))
  .catch((err) => {
    console.log(err);
    if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: 'Карточки с таким id не существует' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send({ message: 'На сервере произошла ошибка.' });
  });

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail()
  .then((likes) => res.send({ data: likes }))
  .catch((err) => {
    console.log(err);
    if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: 'Карточки с таким id не существует' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send({ message: 'На сервере произошла ошибка.' });
  });

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
