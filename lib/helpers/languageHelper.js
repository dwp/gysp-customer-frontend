
module.exports = {
  setLocale: (req, language) => {
    if (language === 'cy') {
      req.session.lang = 'cy-GB';
    } else {
      req.session.lang = 'en-GB';
    }
    req.i18n.setLng(req.session.lang);
  },
};
