const got = require('got');

const requestHelper = require('../../helpers/requestHelper');
const config = require('../../../config/application');

const { claimServiceApiGateway } = config.application.urls;

/* istanbul ignore next */
module.exports = {
  getCountryList(callback) {
    const countryList = requestHelper.generateGetCall(`${claimServiceApiGateway}/claim/countries`);
    got(countryList).then((res) => {
      callback(undefined, res.body);
    }).catch((err) => {
      callback(err, undefined);
    });
  },
};
