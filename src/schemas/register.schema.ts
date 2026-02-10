import Joi from 'joi';
import { emailSchema } from './auth.schema';

const phoneRegExp = /^(?:(?:81|91|70|80|90|71|081|091|070|080|090|071)\d{8,})$/;

export const RegisterUserSchema = Joi.object({
  email: emailSchema.required(),
  phone: Joi.string().pattern(phoneRegExp).required().messages({
    'string.empty': 'A valid phone number is required.',
    'string.pattern.base': 'Invalid phone number',
    'any.required': 'A valid phone number is required.',
  }),
  first_name: Joi.string()
    .min(2)
    .max(200)
    .pattern(/^[a-zA-Z0-9\s\-'&.()]+$/)
    .messages({
      'string.min': 'First name must be at least 2 characters',
      'string.max': 'First name must not exceed 200 characters',
      'string.pattern.base': 'First name contains invalid characters',
      'string.empty': 'First name is required',
      'any.required': 'First name is required',
    })
    .required(),
  last_name: Joi.string()
    .min(2)
    .max(200)
    .pattern(/^[a-zA-Z0-9\s\-'&.()]+$/)
    .messages({
      'string.min': 'Last name must be at least 2 characters',
      'string.max': 'Last name must not exceed 200 characters',
      'string.pattern.base': 'First name contains invalid characters',
      'string.empty': 'Last name is required',
      'any.required': 'Last name is required',
    })
    .required(),
  other_name: Joi.string().allow(''),
  state: Joi.string()
    .messages({
      'any.only': 'Please select an LGA',
      'string.empty': 'LGA is required',
      'any.required': 'LGA is required',
    })
    .required(),
  gender: Joi.string()
    .messages({
      'any.only': 'Please select gender',
      'string.empty': 'Gender is required',
      'any.required': 'Gender is required',
    })
    .required(),
});
