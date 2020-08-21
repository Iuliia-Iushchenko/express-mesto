/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const { userRouter, cardsRouter } = require('./routes');

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', userRouter);
app.use('/cards', cardsRouter);
app.use((reg, res) => {
  res
    .status(404)
    .send({
      message: 'Запрашиваемый ресурс не найден',
    });
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
