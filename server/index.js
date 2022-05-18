const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('./utils/createFolders');
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err);
  process.exit(1);
});

dotenv.config({ path: './.env' });
const app = require('./app');
const DB =
  process.env.NODE_ENV == 'development'
    ? process.env.CLOUD_DB_URL
    : process.env.LOCAL_DB_URL;

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

mongoose.set('strict', true);
mongoose.set('strictPopulate', false);
mongoose.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;

    delete ret.__v;
  },
});
mongoose.set('toObject', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;

    delete ret.__v;
  },
});

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
