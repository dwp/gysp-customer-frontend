const got = require('got');

const requestHelper = require('../../../lib/helpers/requestHelper');

const postRequestInvitation = async (res, body) => {
  const postRequestObj = requestHelper.generatePostCall(`${res.locals.customerServiceApiGateway}/customer/request-invitation`, body);
  return got(postRequestObj);
};

module.exports = {
  postRequestInvitation,
};
