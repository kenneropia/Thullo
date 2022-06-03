require('express-async-errors');
const path = require('path');
const express = require('express');

const morgan = require('morgan');
/* */
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const cors = require('cors');

const app = express();

app.enable('trust proxy');

/**/

app.use(helmet());

app.use(cors());

app.options('*', cors());

const limiter = rateLimit({
  max: 100,
  windowms: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/users.route');
const organisationRouter = require('./routes/organisation.route');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');
const User = require('./models/user.model');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whiteList: [
      'edited',
      'createdAt',
      'updatedAt',
      'page',
      'sort',
      'limit',
      'fields',
      'owner',
    ],
  })
);

app.use(compression());

app.use(express.static(path.join(__dirname, 'static')));

app.get('/test', (req, res) => {
  try {
    const num2 = num1 + 8;
    const num1 = null;
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/organisation', organisationRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
