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

module.exports.signOut = signOut;
module.exports.cookiesPageGet = cookiesPageGet;
module.exports.redirectToStart = redirectToStart;
