const { StatusCodes } = require('http-status-codes');

const dataStore = require('../../../../lib/dataStore');
const requestHelper = require('../../../../lib/helpers/requestHelper');
const deleteSession = require('../../../../lib/deleteSession');
const helper = require('../../../../lib/utils/checkDetailsHelper');
const inviteRequestObject = require('../../../../lib/objects/inviteRequestObject');

const { postRequestInvitation } = require('../../../services/customer/customerService');

const clearSessionAndSetAsCompleteAndRedirect = (req, res, redirectUrl) => {
  deleteSession.deleteInviteRequestFormData(req);
  dataStore.save(req, 'userHasCompletedInviteRequest', true);
  dataStore.save(req, 'userHasCompletedInviteRequestRedirectUrl', redirectUrl);
  res.redirect(redirectUrl);
};

const get = (req, res) => {
  const formData = dataStore.getAll(req);
  const filteredData = helper.requestFilter(formData, req.session.lang);
  res.render('pages/request-invitation/check-details', {
    details: filteredData,
  });
};

// eslint-disable-next-line consistent-return
const post = async (req, res) => {
  // format api invite request object
  const formData = dataStore.getAll(req);
  const requestObj = inviteRequestObject.sessionToObject(formData);
  try {
    await postRequestInvitation(res, requestObj);
    clearSessionAndSetAsCompleteAndRedirect(req, res, '/request-invitation-code/code-requested');
  } catch (err) {
    const traceID = requestHelper.getTraceID(err);
    const path = requestHelper.getUriPath(err);
    if (err.response && err.response.statusCode === StatusCodes.CONFLICT) {
      clearSessionAndSetAsCompleteAndRedirect(req, res, '/request-invitation-code/cannot-send-code');
    } else {
      requestHelper.errorLoggingHelper(err, path, traceID, res.locals.logger, 'INVITE-REQUEST');
      clearSessionAndSetAsCompleteAndRedirect(req, res, '/request-invitation-code/problem-with-the-service');
    }
  }
};

module.exports = {
  get,
  post,
};
