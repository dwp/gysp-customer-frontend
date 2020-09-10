function signOut(req, res) {
  req.session.destroy();
  res.redirect('start-page');
}

function cookiesPageGet(req, res) {
  res.render('pages/cookies');
}

function redirectToStart(req, res) {
  res.redirect('/confirm-identity');
}

function accessibilityStatement(req, res) {
  res.render('pages/accessibility-statement');
}

module.exports.signOut = signOut;
module.exports.cookiesPageGet = cookiesPageGet;
module.exports.redirectToStart = redirectToStart;
module.exports.accessibilityStatement = accessibilityStatement;
