const Joi = require('joi');
const { objectId } = require('./utls/JoiObjectId');

exports.addTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  owner: objectId().required(),
  organisation: objectId().required(),
});

exports.updateTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  organisation: objectId(),
});
