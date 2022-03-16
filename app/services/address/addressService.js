const got = require('got');

const requestHelper = require('../../../lib/helpers/requestHelper');

const getAddressListByPostcode = (res, searchString, postcode, excludeBusiness) => {
  const searchParams = new URLSearchParams({
    searchString,
    postcode,
    excludeBusiness,
    showSourceData: true,
  });
  const getRequestObj = requestHelper.generateGetCall(`${res.locals.addressServiceApiGateway}/lookup/address?${searchParams.toString()}`);
  return got(getRequestObj);
};

module.exports = {
  getAddressListByPostcode,
};
