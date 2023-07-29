const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

const { errors: celebrateErrors } = require('celebrate');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const errors = require('./middlewares/errors');
const { validateCreateUser, validateLogin } = require('./middlewares/validation');

mongoose.connect(DB_URL)
  .then(() => {
    console.log('mongoDB connected');
  });

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateLogin, login);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Неверный адрес запроса' });
});

app.use(celebrateErrors());
app.use(errors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
