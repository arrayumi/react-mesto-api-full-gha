const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://arrayumi.mesto.nomoredomains.sbs',
  'http://arrayumi.mesto.nomoredomains.sbs',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Max-Age', '3600');

    return res.end();
  }

  return next();
};

module.exports = cors;
