const fs = require('fs');
const path = require('path');
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/users.route');
const coursesRouter = require('./routes/courses.route');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'static')));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/courses', coursesRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
