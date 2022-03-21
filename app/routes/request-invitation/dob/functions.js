const got = require('got');
const { StatusCodes } = require('http-status-codes');

const validation = require('../../../../lib/validations/request-invitation/dobValidation');
const statePensionDate = require('../../../../lib/objects/statePensionDateObject');
const requestHelper = require('../../../../lib/helpers/requestHelper');
const dateHelper = require('../../../../lib/helpers/dateHelper');
const { requestFilter, dob } = require('../../../../lib/utils/requestHelper');
const { get: getData, save: saveData, checkAndSave } = require('../../../../lib/dataStore');

const HOME_ADDRESS_URL = 'home-address';
const CANNOT_REQUEST_CODE_URL = 'cannot-request-code';

const CANNOT_REQUEST_CODE_EARLIEST_DATE = '1953-12-06';

const getNewStatePensionDate = (req, res) => new Promise((resolve, reject) => {
  let redirectURL = HOME_ADDRESS_URL;
  const details = req.body;

  // if date is before supported date resolve promise
  const { dateYear, dateMonth, dateDay } = details;
  if (dateHelper.isDateBefore(`${dateYear}-${dateMonth}-${dateDay}`, CANNOT_REQUEST_CODE_EARLIEST_DATE)) {
    resolve({ redirectURL, statePensionDate: null });
  }

  const requestBody = statePensionDate.toObject('Male', details);
  const { customerServiceApiGateway: baseUrl } = res.locals;
  const requestObj = requestHelper.generatePostCall(`${baseUrl}/customer/recalculateSpaDate`, requestBody);
  got(requestObj).then(({ body }) => {
    if (body.spaDate === null || dateHelper.numberOfMonthsInFuture(body.spaDate) > 3) {
      redirectURL = CANNOT_REQUEST_CODE_URL;
    }
    resolve({ redirectURL, statePensionDate: body.spaDate });
  }).catch((err) => {
    const traceID = requestHelper.getTraceID(err);
    requestHelper.infoLoggingHelper(err, '/api/customer/recalculateSpaDate', traceID, res.locals.logger, 'INVITE-REQUEST');
    reject(err);
  });
});

const get = (req, res) => {
  const details = getData(req, 'request-invitation-dob');
  res.render('pages/request-invitation/dob', { details });
};

const post = async (req, res) => {
  const details = req.body;
  const errors = validation.dobValidator(details, req.session.lang);
  if (Object.keys(errors).length > 0) {
    res.render('pages/request-invitation/dob', { details, errors });
  } else {
    try {
      const nspDateResponse = await getNewStatePensionDate(req, res);
      saveData(req, 'newStatePensionDate', nspDateResponse);
      const filteredRequest = requestFilter(dob(), details);
      checkAndSave(req, 'request-invitation-dob', filteredRequest);
      res.redirect(nspDateResponse.redirectURL);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      res.render('pages/error', { status: StatusCodes.INTERNAL_SERVER_ERROR });
    }
  }
};

module.exports = {
  get,
  post,
  getNewStatePensionDate,
};
