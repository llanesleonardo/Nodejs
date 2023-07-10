/**
 * * allowedOrigins Array that contains two domains, these are the only domains than can communicate with the app.
 */
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3005',
  'http://localhost:8080',
  'http://localhost:8000',
  'http://localhost:80',
  'http://reactapp:3000',
  'http://reactapp:3005',
  'http://reactapp:8080',
  'http://reactapp:8000',
  'http://reactapp:80',
];
/**
 * * corsOptionsBase object define other rules for the cors dependency
 */
const corsOptionsBase = {
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};
/**
 * * corsOptionsDelegate variable contains a functionas its value. This function receives a request and a callback function (req,callback)
 * * Then this function has a series of conditionals that evaluates if URL values sending real request are inside allowedOrigins array
 */
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (
    allowedOrigins.indexOf(req.header('Origin')) !== -1 ||
    !req.header('Origin')
  ) {
    corsOptions = { origin: true, ...corsOptionsBase }; // * reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // * disable CORS for this request
  }
  callback(null, corsOptions); // * callback expects two parameters: error and options
};

module.exports = { corsOptionsDelegate };
