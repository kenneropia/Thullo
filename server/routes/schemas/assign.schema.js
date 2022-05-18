const Joi = require('joi');
const { objectId } = require('./utls/JoiObjectId');

exports.assignUserSchema = Joi.object({
  permitted_user: Joi.string().required(),
  user_role: Joi.string().valid('member', 'manager').required(),
});

exports.updateAssignSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  organisation: objectId(),
});
