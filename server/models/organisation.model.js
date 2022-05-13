const mongoose = require('mongoose');
const mongooseOptions = require('./utils/mongooseOptions');

const OrganisationSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    email: String,
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

const Organisation = mongoose.model('Organisation', OrganisationSchema);

module.exports = Organisation;
