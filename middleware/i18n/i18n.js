module.exports = (log) => (req, res, next) => {
  if (!req.i18n) {
    req.i18n = {
      changeLanguage() {
        log.debug('i18n not registered on req; changeLanguage() mocked');
      },
    };
  }

  if (req.session) {
    req.session.lang = req.session.lang || 'en-GB';
    req.i18n.changeLanguage(req.session.lang);
    res.locals.htmlLang = req.session.lang;
    res.locals.locale = req.session.lang === 'cy-GB' ? 'cy' : 'en';
  } else {
    res.locals.htmlLang = req.i18n.language;
  }
  next();
};
