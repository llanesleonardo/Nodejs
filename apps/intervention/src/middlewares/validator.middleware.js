const boom = require('@hapi/boom');

function validatorSchema(req, res, next, schema) {
  const data = req.body;
  const { error, value } = schema.validate(data);
  console.log(value);
  if (error) {
    next(boom.badRequest(error));
  }

  next();
}

module.exports = validatorSchema;
