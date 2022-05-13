const mongoose = require('mongoose');
const mongooseOptions = require('./utils/mongooseOptions');

const BoardSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organisation',
    },
    label: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'label',
      },
    ],
  },
  mongooseOptions
);

const Board = mongoose.model('Board', BoardSchema);

module.exports = Board;
