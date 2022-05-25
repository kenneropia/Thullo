const Joi = require('joi');
const { objectId } = require('./utils/JoiObjectId');

exports.createCommentSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  owner: objectId().required(),
  organisation: objectId().required(),
  board: objectId(),
  task: objectId(),
});

exports.updateCommentSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  edited: Joi.boolean(),
  organisation: objectId().required(),
  board: objectId(),
  task: objectId(),
});
