const session = require('./session');
const timeout = require('./timeout');

module.exports = (app, log, config, timeoutUrls) => {
  const {
    redis: redisConfig,
    session: sessionConfig,
  } = config;

  app.use(session(log, sessionConfig, redisConfig));
  app.use(timeout(timeoutUrls, sessionConfig.timeout, sessionConfig.timeoutDialogCountdown));
};
