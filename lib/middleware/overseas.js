const locationHelper = require('../helpers/locationHelper');

module.exports = () => (req, res, next) => {
  if (req.session.customerDetails && req.session.customerDetails.overseasAddress) {
    req.session.isOverseas = true;
  } else if (req.session.customerDetails && req.session.customerDetails.residentialAddress) {
    req.session.isOverseas = false;
  } else if (req.headers && req.headers['x-akamai-edgescape']) {
    req.session.isOverseas = locationHelper.isOverseas(req.headers['x-akamai-edgescape']);
  } else if (req.session.isOverseasStub) {
    req.session.isOverseas = true;
  } else {
    req.session.isOverseas = false;
  }
  next();
};
