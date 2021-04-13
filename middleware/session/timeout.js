const querystring = require('querystring');

module.exports = (timeoutUrls, sessionTtl, timeoutDialogCountdown) => (req, res, next) => {
  const lang = req.session.lang === 'cy-GB' ? 'cy' : 'en';

  let timeoutQueryString = '';
  if (req.session.isOverseasStub) {
    timeoutQueryString = '?';
    timeoutQueryString += querystring.stringify({
      'overseas-stub': req.session.isOverseasStub,
    });
  }

  res.locals.timeoutDialog = {
    keepAliveUrl: `${timeoutUrls.SESSION_KEEP_ALIVE}`,
    signOutUrl: `${timeoutUrls.SESSION_ENDED}`,
    timeoutUrl: `${timeoutUrls.SESSION_TIMEOUT}/${lang}${timeoutQueryString}`,
    countdown: sessionTtl - timeoutDialogCountdown,
    timeout: sessionTtl,
  };

  next();
};
