const express = require('express');
const equationsRouter = express.Router();
const EquationsController = require('../controllers/equations.controllers');
const EquationsServices = require('../services/equations.services');
const { createEquationSchema } = require('../schemas/equations.schemas');
const validatorSchema = require('../middlewares/validator.middleware');

const equationsServicesObject = new EquationsServices();
const equationsControllerObject = new EquationsController(
  equationsServicesObject,
);

equationsRouter.get('/harrisbenedict', (req, res, next) => {
  equationsControllerObject.harrisbenedictgetAll(req, res, next);
});

equationsRouter.get('/harrisbenedict/last', (req, res, next) => {
  equationsControllerObject.harrisbenedictGet(req, res, next);
});

equationsRouter.post(
  '/harrisbenedict',
  (req, res, next) => {
    validatorSchema(req, res, next, createEquationSchema);
  },
  (req, res, next) => {
    equationsControllerObject.harrisbenedict(req, res, next);
  },
);

equationsRouter.get('/mifflinjoer', (req, res, next) => {
  equationsControllerObject.mifflinjoergetAll(req, res, next);
});

equationsRouter.get('/mifflinjoer/last', (req, res, next) => {
  equationsControllerObject.mifflinjoerGet(req, res, next);
});

equationsRouter.post(
  '/mifflinjoer',
  (req, res, next) => {
    validatorSchema(req, res, next, createEquationSchema);
  },
  (req, res, next) => {
    equationsControllerObject.mifflinjoer(req, res, next);
  },
);

equationsRouter.get('/faooms', (req, res, next) => {
  equationsControllerObject.faoomsgetAll(req, res, next);
});

equationsRouter.get('/faooms/last', (req, res, next) => {
  equationsControllerObject.faoomsGet(req, res, next);
});

equationsRouter.post(
  '/faooms',
  (req, res, next) => {
    validatorSchema(req, res, next, createEquationSchema);
  },
  (req, res, next) => {
    equationsControllerObject.faooms(req, res, next);
  },
);

equationsRouter.get('/valencia', (req, res, next) => {
  equationsControllerObject.valenciagetAll(req, res, next);
});

equationsRouter.get('/valencia/last', (req, res, next) => {
  equationsControllerObject.valenciaGet(req, res, next);
});

equationsRouter.post(
  '/valencia',
  (req, res, next) => {
    validatorSchema(req, res, next, createEquationSchema);
  },
  (req, res, next) => {
    equationsControllerObject.valencia(req, res, next);
  },
);

equationsRouter.get('/schofield', (req, res, next) => {
  equationsControllerObject.schofieldgetAll(req, res, next);
});

equationsRouter.get('/schofield/last', (req, res, next) => {
  equationsControllerObject.schofieldGet(req, res, next);
});

equationsRouter.post(
  '/schofield',
  (req, res, next) => {
    validatorSchema(req, res, next, createEquationSchema);
  },
  (req, res, next) => {
    equationsControllerObject.schofield(req, res, next);
  },
);

equationsRouter.get('/all', (req, res, next) => {
  equationsControllerObject.allequationsgetAll(req, res, next);
});

equationsRouter.post(
  '/all',
  (req, res, next) => {
    validatorSchema(req, res, next, createEquationSchema);
  },
  (req, res, next) => {
    equationsControllerObject.allequations(req, res, next);
  },
);

module.exports = { equationsRouter };
