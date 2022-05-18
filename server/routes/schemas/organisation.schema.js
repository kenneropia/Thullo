const Joi = require('joi');
const { objectId } = require('./utils/JoiObjectId');

exports.createOrganisationSchema = Joi.object({
  owner: objectId().required(),
  title: Joi.string().min(5).max(60).required(),
  description: Joi.string().min(5).max(200).required(),
  email: Joi.string().email({ tlds: { allow: false } }),
});

exports.updateOrganisationSchema = Joi.object({
  title: Joi.string().min(5).max(60),
  description: Joi.string().min(5).max(200),
});
