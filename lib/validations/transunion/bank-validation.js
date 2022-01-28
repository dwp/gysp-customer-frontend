const got = require('got');
const { StatusCodes } = require('http-status-codes');

const generalHelper = require('../utils/general.js');
const requestHelper = require('../../helpers/requestHelper.js');
const bank = require('../../objects/bankObject.js');
const bankVerification = require('../../helpers/bankVerificationStatus.js');

const isCheckableAccount = (paymentMethod, buildingRoll) => {
  if (paymentMethod === 'building' && generalHelper.isThisUndefinedOrEmtpy(buildingRoll)) {
    return true;
  }
  if (paymentMethod === 'bank') {
    return true;
  }
  return false;
};

const verifyAccountDetails = async (req, res, bankDetails, customerDetails) => {
  if (req.session.isOverseas === true) {
    return { result: bankVerification.featureOverseas() };
  }

  if (!isCheckableAccount(bankDetails.paymentMethod, bankDetails.buildingRoll)) {
    return { result: bankVerification.featureNotChecked() };
  }

  const verifyObject = bank.bankDetailsToObjectWithCustomerDetails(bankDetails, customerDetails, req.session['dob-details']);
  const bankVerifyCall = requestHelper.generatePostCall(
    `${res.locals.bankValidateServiceApiGateway}/bankvalidate`, verifyObject, 'frontend',
  );

  try {
    const { body } = await got(bankVerifyCall);
    return body;
  } catch (err) {
    const traceID = requestHelper.getTraceID(err);
    requestHelper.errorLoggingHelper(err, '/api/bankvalidate', traceID, res.locals.logger, req.session.inviteKey);
    if (err.response.statusCode === StatusCodes.BAD_REQUEST) {
      return { result: bankVerification.badRequest() };
    }
    return { result: bankVerification.errorReturned() };
  }
};

module.exports = {
  verifyAccountDetails,
};
