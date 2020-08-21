/* eslint-disable no-console */
/* eslint-disable no-shadow */
const path = require('path');
const getFile = require('../helpers');

const getAllUsers = (req, res) => {
  getFile(path.join(__dirname, '..', 'data', 'users.json'))
    .then((data) => res
      .status(200)
      .send(JSON.parse(data)))
    .catch((error) => {
      console.log(error);
      return res
        .status(500)
        .send({
          message: 'Запрашиваемый ресурс не найден',
        });
    });
};

const getUser = (req, res) => {
  getFile(path.join(__dirname, '..', 'data', 'users.json'))
    .then((data) => {
      // eslint-disable-next-line eqeqeq
      const user = JSON.parse(data).find((user) => user._id == req.params.id);
      if (user) {
        return res
          .status(200)
          .send(user);
      }
      return res
        .status(404)
        .send({
          message: 'Нет пользователя с таким id',
        });
    });
};

module.exports = {
  getAllUsers,
  getUser,
};
