module.exports = {
  setLocale: (req, language) => {
    if (language === 'cy') {
      req.session.lang = 'cy-GB';
    } else {
      req.session.lang = 'en-GB';
    }
    req.i18n.changeLanguage(req.session.lang);
  },
};
