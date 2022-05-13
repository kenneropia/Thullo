const mongoose = require('mongoose');
const mongooseOptions = require('./utils/mongooseOptions');

const LabelSchema = new mongoose.Schema(
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
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'board',
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  mongooseOptions
);

const Label = mongoose.model('Label', LabelSchema);

module.exports = Label;

module.exports = Label;
