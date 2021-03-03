const cookieMessage = require('./cookie-message');

module.exports = (app, consentCookieName, gaTrackingId, gaDomain) => {
  cookieMessage(app, consentCookieName, gaTrackingId, gaDomain);
};
