const mongoose = require('mongoose');
const mongooseOptions = require('./utils/mongooseOptions');

const AssignSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    permitted_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    user_role: {
      type: String,
      enum: ['collaborator', 'participant'],
      default: 'participant',
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organisation',
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  },
  mongooseOptions
);

const Assign = mongoose.model('Assign', AssignSchema);

module.exports = Assign;
