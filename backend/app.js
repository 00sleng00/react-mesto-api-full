require('dotenv').config();

console.log(process.env.NODE_ENV);
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');
const { reg } = require('./utils/isLink');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  login,
  createUser,
} = require('./controllers/users');
const { auth } = require('./middlewares/auth');

const app = express();

app.use(express.json());
app.use(cors);

// request logger must be connected before all route handlers
app.use(requestLogger);

// crash test
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// routes w/o auth
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(reg),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

// routes w/ auth
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Такого адреса не существует'));
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});

// error logger connect after the route handlers and before the error handlers
app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log('Server has been started');
});
