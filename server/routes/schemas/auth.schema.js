const Joi = require('joi');

exports.signupSchema = Joi.object({
  username: Joi.string().min(5).max(40).required(),
  email: Joi.string().min(5).max(40).required(),
  password: Joi.string().min(8).max(40).required(),
});

exports.loginSchema = Joi.object({
  username: Joi.string().min(5).max(40),
  email: Joi.string().min(5).max(40),
  password: Joi.string().min(8).max(40).required(),
}).xor('username', 'email');

exports.updateUserSchema = Joi.object({
  username: Joi.string().min(5).max(40),
  email: Joi.string().min(5).max(40),
}).xor('username', 'email');
