const express = require('express');
const { formulasRouter } = require('./formulas.routes');

function routerApi(app) {
  const apiV1 = express.Router();
  app.use('/api/v1', apiV1);
  apiV1.use('/formulas', formulasRouter);
}

module.exports = { routerApi };
