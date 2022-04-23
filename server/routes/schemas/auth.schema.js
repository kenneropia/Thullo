const Joi = require('joi');

export const signupSchema = Joi.object({
  username: Joi.string().min(5).max(40).required(),
  email: Joi.string().min(5).max(40).required(),
  password: Joi.string().min(8).max(40).required(),
});

export const loginSchema = Joi.object({
  username: Joi.string().min(5).max(40),
  email: Joi.string().min(5).max(40),
  password: Joi.string().min(8).max(40).required(),
}).xor('username', 'email');

export const updateUserSchema = Joi.object({
  username: Joi.string().min(5).max(40),
  email: Joi.string().min(5).max(40),
}).xor('username', 'email');
