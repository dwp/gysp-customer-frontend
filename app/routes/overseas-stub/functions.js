function getActive(req, res) {
  req.session.isOverseasStub = true;
  res.redirect('/auth');
}

function getInactive(req, res) {
  delete req.session.isOverseasStub;
  res.redirect('/invitation-code');
}

module.exports.getActive = getActive;
module.exports.getInactive = getInactive;
