const Joi = require('joi');

//const id = Joi.string().uuid();
const kg = Joi.number().integer();
const cm = Joi.number().integer();
const edad = Joi.number().integer();
const sexo = Joi.number().integer();

const createEquationSchema = Joi.object({
  kg: kg.required(),
  cm: cm.required(),
  edad: edad.required(),
  sexo: sexo.required(),
});

module.exports = { createEquationSchema };
