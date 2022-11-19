import Joi from "joi";
import { RoleEnum } from "../types/user";

const passwordPattern = /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/
const userValidator = (data: any) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().required().min(2).max(30),
    lastName: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required().messages({
        'string.base': `Email should be a type of 'string'`,
        'string.empty': `Email cannot be an empty field`,
        'string.email': `Should be a valid email`,
      }),
    password: Joi.string().regex(passwordPattern).required().messages({
        'string.base': `Password must be a type of 'string'`,
        'string.empty': `Password cannot be an empty field`,
        'string.pattern.base': `Should contain atleat 1 uppercase, 3 lowercase, 1 special character, 2 numbers and minimum 8 characters`,
      }),
    role: Joi.string().valid(RoleEnum.ADMIN, RoleEnum.USER).required(),
  });
 const result = schema.validate(data);
  if (result.error) throw new Error(result.error.message);
  return true;
};

export default userValidator;