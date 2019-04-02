function signOut(req, res) {
  req.session.destroy();
  res.redirect('start-page');
}

function cookiesPageGet(req, res) {
  res.render('pages/cookies');
}

function getSessionLanguage(lang) {
  let language = 'Language-english';
  if (lang === 'en-GB') {
    language = 'Language-welsh';
  }
  return language;
}

function redirectToStart(req, res) {
  res.redirect('/confirm-identity');
}

module.exports.signOut = signOut;
module.exports.cookiesPageGet = cookiesPageGet;
module.exports.getSessionLanguage = getSessionLanguage;
module.exports.redirectToStart = redirectToStart;
