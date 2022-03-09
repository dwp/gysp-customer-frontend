function signOut(req, res) {
  req.session.destroy();
  res.redirect('start-page');
}

function redirectToStart(req, res) {
  res.redirect('/invitation-code');
}

function accessibilityStatement(req, res) {
  res.render('pages/accessibility-statement');
}

module.exports.signOut = signOut;
module.exports.redirectToStart = redirectToStart;
module.exports.accessibilityStatement = accessibilityStatement;
