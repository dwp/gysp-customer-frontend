const request = require('request-promise');

const requestHelper = require('../../../lib/helpers/requestHelper');
const config = require('../../../config/application');

const { claimServiceApiGateway } = config.application.urls;

/* istanbul ignore next */
module.exports = {
  getCountryList(callback) {
    const countryList = requestHelper.generateGetCall(`${claimServiceApiGateway}/claim/countries`);
    request(countryList).then((req) => {
      callback(undefined, req);
    }).catch((err) => {
      callback(err, undefined);
    });
  },
};
