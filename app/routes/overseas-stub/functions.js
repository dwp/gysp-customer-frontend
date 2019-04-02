function getActive(req, res) {
  req.session.isOverseasStub = true;
  res.redirect('/auth');
}

function getInactive(req, res) {
  delete req.session.isOverseasStub;
  res.redirect('/confirm-identity');
}

module.exports.getActive = getActive;
module.exports.getInactive = getInactive;
