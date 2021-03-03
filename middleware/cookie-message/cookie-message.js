module.exports = (app, consentCookieName, gaTrackingId, gaDomain) => {
  app.use((req, res, next) => {
    // Get cookie banner flash messages (did you accept / reject)
    if (req.session) {
      res.locals.cookieChoiceMade = req.session.cookieChoiceMade;
      req.session.cookieChoiceMade = undefined;
    }

    // Add Google analytics tracking id to templates
    res.locals.gaTrackingId = gaTrackingId;

    // Add Google analytics domain to templates
    res.locals.gaDomain = gaDomain;

    // Add consent cookie name to templates
    res.locals.consentCookieName = consentCookieName;

    // Add current consent cookie value to templates
    if (req.cookies[consentCookieName]) {
      res.locals.consentCookieValue = req.cookies[consentCookieName];
    }

    next();
  });
};
