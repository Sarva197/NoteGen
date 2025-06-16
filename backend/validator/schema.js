import Joi from 'joi';

export const userSignupSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email',
    }),

  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.empty': 'Username is required',
      'string.min': 'Username must be at least 3 characters',
      'string.max': 'Username must be at most 30 characters',
    }),

  password: Joi.string()
    .min(6)
    .messages({
      'string.min': 'Password must be at least 6 characters',
    }),

  googleId: Joi.string()
}).or('password', 'googleId'); // Require either password or googleId



export const userLoginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email',
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters',
    }),

    googleId: Joi.string()
    .optional() 
});



