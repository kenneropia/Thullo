const Task = require('../models/task.model');
const factory = require('./utils/handlerFactory');

exports.createTask = factory.createOne(Task);

exports.getAllTasks = factory.getAll(Task);

exports.getTaskById = factory.getOne(Task);

exports.updateTask = factory.updateOne(Task);

exports.deleteTask = factory.deleteOne(Task);
