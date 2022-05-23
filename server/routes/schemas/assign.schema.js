const Joi = require('joi');
const { objectId } = require('./utils/JoiObjectId');

exports.assignUserSchema = Joi.object({
  permitted_user: Joi.string().required(),
  user_role: Joi.string().valid('member', 'manager').required(),
  organisation: objectId().required(),
  board: objectId().required(),
  task: objectId().required(),
});
