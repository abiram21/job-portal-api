import Joi from "joi";

const jobValidator = (data: any) => {
  const schema = Joi.object().keys({
    title: Joi.string().required().messages({
      "string.base": `Title should be a type of 'string'`,
      "any.required": `Title is required`,
    }),
    description: Joi.string().required().messages({
      "string.base": `Description should be a type of 'string'`,
      "any.required": `Description is required`,
    }),
    active: Joi.boolean().required().messages({
      "string.base": `Active should be a type of 'boolean'`,
      "any.required": `Active is required`,
    }),
    image: Joi.string().required().messages({
      "string.base": `Image should be a type of 'string'`,
      "any.required": `Image is required`,
    }),
    salary: Joi.number().min(0).required().messages({
      "string.base": `Salary should be a type of 'number'`,
      "any.required": `Salary is required`,
      "string.min": `Salary should be greater than 0`,
    }),
    company: Joi.string().required().messages({
      "string.base": `Company should be a type of 'string'`,
      "any.required": `Company is required`,
    }),
  });
  const result = schema.validate(data);
  if (result.error) throw new Error(result.error.message);
  return true;
};

export default jobValidator;
