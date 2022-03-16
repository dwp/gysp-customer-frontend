const { StatusCodes } = require('http-status-codes');

const { requestFilter, address } = require('../../../../lib/utils/requestHelper');
const { get: getData, save, checkAndSave } = require('../../../../lib/dataStore');
const { validator } = require('../../../../lib/validations/request-invitation/addressValidation');
const { getPostCodeAddressLookup } = require('../../../../lib/helpers/addressServiceHelper');
const { isCrownDependency } = require('../../../../lib/helpers/locationHelper');

const get = (req, res) => {
  const details = getData(req, 'request-invitation-address');
  res.render('pages/request-invitation/address', { details });
};

const post = async (req, res) => {
  const details = req.body;
  const errors = validator(details, req.session.lang);
  if (Object.keys(errors).length > 0) {
    res.render('pages/request-invitation/address', { details, errors });
  } else {
    const { nameNumber, postcode } = details;
    try {
      const { data: addressLookup } = await getPostCodeAddressLookup(res, nameNumber, postcode, true);

      // save form data
      const filteredRequest = requestFilter(address(), details);
      checkAndSave(req, 'request-invitation-address', filteredRequest);

      if (addressLookup.length === 0) {
        res.redirect('no-addresses-found');
      } else if (isCrownDependency(postcode)) {
        // Next iteration: this will redirect to a page on our service
        res.redirect('https://www.gov.uk/state-pension-if-you-retire-abroad');
      } else {
        save(req, 'addressLookup', addressLookup);
        res.redirect('confirm-full-address');
      }
    } catch (err) {
      res.status(StatusCodes.OK);
      res.render('pages/error', { status: StatusCodes.INTERNAL_SERVER_ERROR });
    }
  }
};

module.exports = {
  get,
  post,
};
