const mongoose = require('mongoose');
const mongooseOptions = require('./utils/mongooseOptions');

const CommentSchema = new mongoose.Schema(
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
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  },
  mongooseOptions
);

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;

module.exports = Comment;
