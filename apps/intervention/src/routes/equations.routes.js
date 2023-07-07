const express = require('express');
const equationsRouter = express.Router();
const EquationsController = require('../controllers/equations.controllers');
const EquationsServices = require('../services/equations.services');

const equationsServicesObject = new EquationsServices();
const equationsControllerObject = new EquationsController(
  equationsServicesObject,
);

equationsRouter.get('/harrisbenedict', (req, res, next) => {
  equationsControllerObject.harrisbenedictgetAll(req, res, next);
});

equationsRouter.post('/harrisbenedict', (req, res, next) => {
  equationsControllerObject.harrisbenedict(req, res, next);
});

module.exports = { equationsRouter };
