const mongoose = require('mongoose');
const mongooseOptions = require('./utils/mongooseOptions');

const tagSchema = new mongoose.Schema(
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
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  mongooseOptions
);

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
