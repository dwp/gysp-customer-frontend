const { StatusCodes } = require('http-status-codes');
const requestHelper = require('./requestHelper');
const comma2Br = require('../utils/comma2Br');
const array2Br = require('../utils/array2Br');

const addressService = require('../../app/services/address/addressService');

const findAddressByUprn = (uprn, addressLookup) => {
  const uprnFiltered = uprn.replace('-alt', '');
  const addressData = addressLookup.find((address) => address.uprn === uprnFiltered);

  // If uprn is an alternative replace singleLine as alternateSingleLine
  if (uprn.includes('-alt')) {
    return { ...addressData, singleLine: addressData.alternateSingleLine };
  }
  return addressData;
};

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
  addressLookupFormatter(details, addressLookup) {
    const { singleLine } = findAddressByUprn(details.uprn, addressLookup);
    return comma2Br(singleLine);
  },
  findAddressByUprn,
  manualAddress(details) {
    const addressLines = [
      details.addressLine1,
      details.addressLine2,
      details.addressTown,
      details.addressPostcode,
    ];

    return array2Br(addressLines);
  },
};
