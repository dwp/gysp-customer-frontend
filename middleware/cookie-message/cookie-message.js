module.exports = (app, consentCookieName, gtmContainerId) => {
  app.use((req, res, next) => {
    // Get cookie banner flash messages (did you accept / reject)
    if (req.session) {
      res.locals.cookieChoiceMade = req.session.cookieChoiceMade;
      req.session.cookieChoiceMade = undefined;
    }

    // set GTM container ID
    res.locals.GTM_CONTAINER_ID = gtmContainerId;

    // Add consent cookie name to templates
    res.locals.consentCookieName = consentCookieName;

    // Add current consent cookie value to templates
    if (req.cookies[consentCookieName]) {
      res.locals.consentCookieValue = req.cookies[consentCookieName];
    }

    next();
  });
};
