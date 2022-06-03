const mongoose = require('mongoose');
const mongooseOptions = require('./utils/mongooseOptions');

const AttachmentSchema = new mongoose.Schema(
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
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
    },
    type: String,
    title: String,
    fileSize: String,
    key: String,
    extension: String,
    location: String,
  },
  mongooseOptions
);

const Attachment = mongoose.model('Attachment', AttachmentSchema);

module.exports = Attachment;
