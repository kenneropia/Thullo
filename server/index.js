const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err);
  process.exit(1);
});

dotenv.config({ path: './.env' });
const app = require('./app');
const DB =
  process.env.NODE_ENV == 'development'
    ? process.env.DB_URL_ENV
    : process.env.DB_CLOUD_ENV;

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3005;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err);

  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
