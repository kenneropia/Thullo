const Joi = require('joi');
const { objectId } = require('./utils/JoiObjectId');

exports.addUserRoleSchema = Joi.object({
  owner: objectId().required(),
  permitted_user: objectId().required(),
  organisation: objectId().required(),
  user_role: Joi.string().valid('member').required(),
});
exports.upgradeUserRoleSchema = Joi.object({
  user_role: Joi.string().valid('member', 'manager').required(),
});
