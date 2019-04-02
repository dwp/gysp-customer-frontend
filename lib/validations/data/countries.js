const request = require('request-promise');

const requestHelper = require('../../../lib/helpers/requestHelper');
const config = require('../../../config/yaml');

const customerApiGateway = process.env.CUSTOMERAPIGATEWAY ? process.env.CUSTOMERAPIGATEWAY : config.application.urls.api;

/* istanbul ignore next */
module.exports = {
  getCountryList(callback) {
    const countryList = requestHelper.generateGetCall(`${customerApiGateway}/claim/countries`);
    request(countryList).then((req) => {
      callback(undefined, req);
    }).catch((err) => {
      callback(err, undefined);
    });
  },
};
