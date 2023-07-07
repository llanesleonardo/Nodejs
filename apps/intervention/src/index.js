const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { config } = require('./config/config');
const { routerApi } = require('./routes/index');
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
routerApi(app);

app.get('/', (req, res) => {
  res.send({ hola: 'hola' });
});

app.listen(config.port, () => {
  console.log('Listen to port', config.port);
  console.log('Enviroment', config.env);
});
