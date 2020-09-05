/* eslint-disable no-console */
/* eslint-disable no-shadow */
const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.log(err);
      return res.status(err.message ? 404 : 500).send({ message: err.message || 'На сервере произошла ошибка.' });
    });
};

const getUser = (req, res) => User.findById(req.params.id)
  .orFail(new Error('NotValidId'))
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    if (err.message === 'NotValidId') {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    console.log(err);
    return res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка.' });
  });

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.log(err);
      return res.status(err.message ? 404 : 500).send({ message: err.message || 'На сервере произошла ошибка.' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send(user);
        return;
      }
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    })
    .catch((err) => {
      console.log(err);
      return res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка.' });
    });
};

const uppdateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send(user);
        return;
      }
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    })
    .catch((err) => {
      console.log(err);
      return res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка.' });
    });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  uppdateAvatar,
};
