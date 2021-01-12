const passport = require('passport');
const passportVerify = require('passport-verify');

const saveRequestId = require('./saveRequestId');
const loadRequestId = require('./loadRequestId');

module.exports = (app, log, config) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, JSON.stringify(user)));
  passport.deserializeUser((user, done) => done(null, JSON.parse(user)));

  passport.use(passportVerify.createStrategy(
    config.verifyServiceProviderHost,
    (responseBody) => responseBody,
    (responseBody) => responseBody,
    saveRequestId(log),
    loadRequestId(log),
    null,
    null,
    'LEVEL_1',
  ));
};
