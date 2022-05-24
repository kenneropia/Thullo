const Joi = require('joi');
const { objectId } = require('./utils/JoiObjectId');

exports.assignUserSchema = Joi.object({
  owner: objectId().required(),
  permitted_user: Joi.string().required(),
  organisation: objectId().required(),
  board: objectId().required(),
  task: objectId().required(),
});
