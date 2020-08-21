/* eslint-disable no-console */
const path = require('path');
const getFile = require('../helpers');

const getCards = (req, res) => {
  getFile(path.join(__dirname, '..', 'data', 'cards.json'))
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

module.exports = {
  getCards,
};
