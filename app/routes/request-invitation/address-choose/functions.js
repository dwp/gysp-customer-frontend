const { requestFilter, addressChoose } = require('../../../../lib/utils/requestHelper');
const { get: getData, checkAndSave } = require('../../../../lib/dataStore');
const { validator } = require('../../../../lib/validations/request-invitation/addressChooseValidation');
const postcodeLookupObject = require('../../../../lib/objects/postcodeLookupObject');

const get = (req, res) => {
  const addressLookup = getData(req, 'addressLookup');
  const details = getData(req, 'request-invitation-address-choose') || Object.create(null);
  const addressList = postcodeLookupObject.addressList(addressLookup, details.uprn, true);
  res.render('pages/request-invitation/address-choose', { addressList });
};

const post = async (req, res) => {
  const details = req.body || Object.create(null);
  const errors = validator(details, req.session.lang);
  if (Object.keys(errors).length > 0) {
    const addressLookup = getData(req, 'addressLookup');
    const addressList = postcodeLookupObject.addressList(addressLookup, details.uprn, true);
    res.render('pages/request-invitation/address-choose', { addressList, errors });
  } else {
    const filteredRequest = requestFilter(addressChoose(), details);
    checkAndSave(req, 'request-invitation-address-choose', filteredRequest);
    const redirectUrl = details.uprn === 'manual' ? 'what-is-your-address' : 'check-details';
    res.redirect(redirectUrl);
  }
};

module.exports = {
  get,
  post,
};
