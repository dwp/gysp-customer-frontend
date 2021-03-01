module.exports = (app, consentCookieName, gaTrackingId) => {
  app.use((req, res, next) => {
    // Get cookie banner flash messages (did you accept / reject)
    if (req.session) {
      res.locals.cookieChoiceMade = req.session.cookieChoiceMade;
      req.session.cookieChoiceMade = undefined;
    }

    // Add Google analytics tracking id to templates
    res.locals.gaTrackingId = gaTrackingId;

    // Add consent cookie name to templates
    res.locals.consentCookieName = consentCookieName;

    // Add current consent cookie value to templates
    if (req.cookies[consentCookieName]) {
      res.locals.consentCookieValue = req.cookies[consentCookieName];
    }

    next();
  });
};
