const { get: getData } = require('../../../../lib/dataStore');

const get = (req, res) => {
  const { nameNumber, postcode } = getData(req, 'request-invitation-address') || Object.create(null);
  res.render('pages/request-invitation/address-not-found', {
    nameNumber,
    postcode,
  });
};

module.exports = {
  get,
};
