const cookieMessage = require('./cookie-message');

module.exports = (app, consentCookieName, gaTrackingId) => {
  cookieMessage(app, consentCookieName, gaTrackingId);
};
