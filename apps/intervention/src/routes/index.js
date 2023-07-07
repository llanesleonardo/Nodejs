const express = require('express');
const { equationsRouter } = require('./equations.routes');

function routerApi(app) {
  const apiV1 = express.Router();
  app.use('/api/v1', apiV1);
  apiV1.use('/equations', equationsRouter);
}

module.exports = { routerApi };
