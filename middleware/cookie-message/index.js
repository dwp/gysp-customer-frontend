const cookieMessage = require('./cookie-message');

module.exports = (app, consentCookieName, gtmContainerId) => {
  cookieMessage(app, consentCookieName, gtmContainerId);
};
