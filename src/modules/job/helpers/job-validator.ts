import Joi from "joi";

const jobValidator = (data: any) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    active: Joi.boolean().required(),
    image: Joi.string().required(),
    salary: Joi.number().min(0).required(),
    company: Joi.string().required(),
  });
 const result = schema.validate(data);
  if (result.error) throw new Error(result.error.message);
  return true;
};

export default jobValidator;