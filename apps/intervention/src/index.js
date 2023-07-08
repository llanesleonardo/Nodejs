const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { config } = require('./config/config');
const { routerApi } = require('./routes/index');
const {
  errorbaseHandler,
  logErrors,
  boomErrorHandler,
} = require('./middlewares/errorbase.middleware');
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
routerApi(app);
app.use(boomErrorHandler);
app.use(logErrors);
app.use(errorbaseHandler);

app.listen(config.port, () => {
  console.log('Listen to port', config.port);
  console.log('Enviroment', config.env);
});
