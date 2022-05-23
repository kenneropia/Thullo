const Assign = require('../models/assign.model');
const factory = require('./utils/handlerFactory');

exports.assignUserToTask = factory.createOne(Assign);
exports.removeUserFromTask = factory.deleteOne(Assign);
