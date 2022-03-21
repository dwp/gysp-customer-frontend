const { requestFilter, addressManual } = require('../../../../lib/utils/requestHelper');
const { get: getData, checkAndSave, save } = require('../../../../lib/dataStore');
const { validator } = require('../../../../lib/validations/request-invitation/addressManualValidation');
const { isCrownDependency, isNorthernIreland } = require('../../../../lib/helpers/locationHelper');

const get = (req, res) => {
  const details = getData(req, 'request-invitation-address-manual');
  res.render('pages/request-invitation/address-manual', { details });
};

const post = async (req, res) => {
  const details = req.body;
  const errors = validator(details, req.session.lang);
  if (Object.keys(errors).length > 0) {
    res.render('pages/request-invitation/address-manual', { details, errors });
  } else {
    const filteredRequest = requestFilter(addressManual(), details);
    checkAndSave(req, 'request-invitation-address-manual', filteredRequest);
    save(req, 'isNorthernIreland', isNorthernIreland(filteredRequest.addressPostcode));
    if (isCrownDependency(details.addressPostcode)) {
      // Next iteration: this will redirect to a page on our service
      res.redirect('https://www.gov.uk/state-pension-if-you-retire-abroad');
    } else {
      res.redirect('check-details');
    }
  }
};

module.exports = {
  get,
  post,
};
