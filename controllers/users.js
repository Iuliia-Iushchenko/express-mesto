/* eslint-disable no-console */
/* eslint-disable no-shadow */
const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: 'На сервере произошла ошибка.' });
    });
};

const getUser = (req, res) => User.findById(req.params.id)
  .orFail()
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    console.log(err);
    if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    return res.status(500).send({ message: 'На сервере произошла ошибка.' });
  });

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка.' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.log(err);
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка.' });
    });
};

const uppdateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.log(err);
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка.' });
    });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  uppdateAvatar,
};
