const mongoose = require('mongoose');
const mongooseOptions = require('./utils/mongooseOptions');

const LabelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    level: {
      type: String,
      enum: ['board', 'task'],
      default: 'task',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    edit: Boolean,
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organisation',
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'board',
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  },
  mongooseOptions
);

const Label = mongoose.model('Label', LabelSchema);

module.exports = Label;

module.exports = Label;
