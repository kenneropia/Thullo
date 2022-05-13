const mongoose = require('mongoose');
const mongooseOptions = require('./utils/mongooseOptions');

const roleSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    permitted: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organisation',
    },
    user_role: {
      type: String,
      enum: ['supervisor', 'manager', 'member'],
      default: 'member',
    },
  },
  mongooseOptions
);

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
