const mongoose = require('mongoose');
const mongooseOptions = require('./utils/mongooseOptions');

const organisationSchema = new mongoose.Schema(
  {
    title: String,
    description: String,

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    board: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
      },
    ],
    tag: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    label: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Label',
      },
    ],
  },
  mongooseOptions
);

// organisationSchema.index({ owner: 1 }, { unique: true });

const Organisation = mongoose.model('Organisation', organisationSchema);

module.exports = Organisation;
