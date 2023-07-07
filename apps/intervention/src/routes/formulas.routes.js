const express = require('express');
const formulasRouter = express.Router();

formulasRouter.get('/', (req, res, next) => {
  console.log('Hola');

  res.json({ hola: 'Hola' });
});
module.exports = { formulasRouter };
