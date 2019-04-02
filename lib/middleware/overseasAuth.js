module.exports = (req, res, next) => {
  if (req.session.isOverseas) {
    res.redirect('/auth');
  } else {
    next();
  }
};
