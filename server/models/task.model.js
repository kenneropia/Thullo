const mongoose = require('mongoose');
const mongooseOptions = require('./utils/mongooseOptions');

const TaskSchema = new mongoose.Schema(
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
    label: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Label',
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
  },
  mongooseOptions
);

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
