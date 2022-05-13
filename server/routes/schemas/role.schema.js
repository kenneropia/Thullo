const Joi = require('joi');
const { objectId } = require('./utls/JoiObjectId');

exports.addUserRoleSchema = Joi.object({
  owner: objectId().required(),
  permitted: objectId().required(),
  organisation: objectId().required(),
  user_role: Joi.string().valid('member').required(),
});
exports.upgradeUserRoleSchema = Joi.object({
  owner: objectId().required(),
  permitted: objectId().required(),
  organisation: objectId().required(),
  user_role: Joi.string().valid('member', 'manager').required(),
});
