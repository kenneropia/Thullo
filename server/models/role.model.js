const mongoose = require('mongoose');
const mongooseOptions = require('./utils/mongooseOptions');

const roleSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    permitted_user: {
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

roleSchema.index(
  { organisation: 1, permitted_user: 1, owner: 1 },
  { unique: true }
);

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
