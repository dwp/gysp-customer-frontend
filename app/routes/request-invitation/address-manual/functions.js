const { requestFilter, addressManual } = require('../../../../lib/utils/requestHelper');
const { get: getData, checkAndSave } = require('../../../../lib/dataStore');
const { validator } = require('../../../../lib/validations/request-invitation/addressManualValidation');
const { isCrownDependency } = require('../../../../lib/helpers/locationHelper');

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
