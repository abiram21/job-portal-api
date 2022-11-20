import Joi from "joi";

const passwordPattern =
  /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
const loginValidator = (data: any) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required().messages({
      "string.base": `Email should be a type of 'string'`,
      "string.empty": `Email cannot be an empty field`,
      "string.email": `Email should be a valid email`,
      "any.required": `Email is required`,
    }),
    password: Joi.string().regex(passwordPattern).required().messages({
      "string.base": `Password must be a type of 'string'`,
      "string.empty": `Password cannot be an empty field`,
      "string.pattern.base": `Password should contain atleat 1 uppercase, 3 lowercase, 1 special character, 2 numbers and minimum 8 characters`,
      "any.required": `Password is required`,
    }),
  });
  const result = schema.validate(data);
  if (result.error) throw new Error(result.error.message);
  return true;
};

export default loginValidator;
