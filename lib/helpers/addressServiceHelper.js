const { StatusCodes } = require('http-status-codes');
const requestHelper = require('./requestHelper');

const addressService = require('../../app/services/address/addressService');

module.exports = {
  getPostCodeAddressLookup(res, nameNumber, postcode, excludeBusiness = false) {
    return new Promise((resolve, reject) => {
      const addressList = addressService.getAddressListByPostcode(res, nameNumber, postcode, excludeBusiness);
      addressList.then(({ body }) => {
        if (!body.data) {
          reject(new Error('Address list not returned from address service'));
        }
        resolve(body);
      }).catch((err) => {
        const traceID = requestHelper.getTraceID(err);
        const path = requestHelper.getUriPath(err);
        requestHelper.infoLoggingHelper(err, path, traceID, res.locals.logger, null);
        if (err.statusCode === StatusCodes.NOT_FOUND) {
          requestHelper.infoLoggingHelper(err, path, traceID, res.locals.logger, null);
        } else {
          requestHelper.errorLoggingHelper(err, path, traceID, res.locals.logger, null);
        }

        reject(err);
      });
    });
  },
};
