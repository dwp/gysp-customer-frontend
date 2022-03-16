const middleware = (req, _res, next) => {
  const sanitisedBody = Object.create(null);
  if (req.body && typeof req.body === 'object') {
    Object.keys(req.body).forEach((key) => {
      const value = req.body[key];
      if (typeof value === 'string') {
        sanitisedBody[key] = value.trim();
      } else {
        sanitisedBody[key] = value;
      }
    });
  }

  req.body = sanitisedBody;

  return next();
};

module.exports = middleware;
