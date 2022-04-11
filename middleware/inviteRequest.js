const middleware = (req, res, next) => {
  if (!req.session.userInInviteRequest) {
    res.locals.logger.info(`Security redirect - not in session - ${req.method} ${req.path}`);
    return res.redirect(res.locals.timeoutDialog.timeoutUrl);
  }

  const sanitisedBody = Object.create(null);
  if (req.body && typeof req.body === 'object') {
    Object.keys(req.body).forEach((key) => {
      const value = req.body[key];
      if (typeof value === 'string') {
        // Trim and replace curly apostrophes with straight
        sanitisedBody[key] = value
          .trim()
          .replace(/\u2019/g, '\'');
      } else {
        sanitisedBody[key] = value;
      }
    });
  }

  req.body = sanitisedBody;

  return next();
};

module.exports = middleware;
