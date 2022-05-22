const got = require('got');
const { StatusCodes } = require('http-status-codes');
const i18n = require('i18next');

const generalHelper = require('../utils/general');
const requestHelper = require('../../helpers/requestHelper');
const bank = require('../../objects/bankObject');
const bankVerification = require('../../helpers/bankVerificationStatus');
const errorHelper = require('../../utils/errorHelper');

const SORT_CODE_INVALID_MSG = 'BV3: Validation Failure INVALID - Sortcode'.toLowerCase();
const ACC_NUMBER_INVALID_MSG = 'BV4: Validation Failure INVALID - Account Number'.toLowerCase();

class TransunionValidationError {
  constructor(sortCodeError, accNumberError, originalMsgs) {
    this.sortCodeError = sortCodeError;
    this.accNumberError = accNumberError;
    this.originalMsgs = originalMsgs;
    this.errorSummary = [];
  }

  bothSortCodeAndAccNumberInvalid() {
    return this.sortCodeError && this.accNumberError;
  }

  eitherSortCodeOrAccNumberInvalid() {
    return this.sortCodeError || this.accNumberError;
  }

  hasAtleastSingleError() {
    return this.eitherSortCodeOrAccNumberInvalid();
  }

  get isSortCodeInvalid() {
    return this.sortCodeError;
  }

  get isAccNumberInvalid() {
    return this.accNumberError;
  }

  get errors() {
    if (this.bothSortCodeAndAccNumberInvalid()) {
      return TransunionValidationError.buildBothSortCodeAndAccNumerrors();
    }

    if (this.eitherSortCodeOrAccNumberInvalid()) {
      if (this.sortCodeError) {
        return TransunionValidationError.buildSortCodeError();
      }

      if (this.accNumberError) {
        return TransunionValidationError.buildAccNumError();
      }
    }

    return {};
  }

  static buildBothSortCodeAndAccNumerrors() {
    const { bankSortCode, errorSummary: scSummary } = TransunionValidationError.buildSortCodeError();
    const { bankAccountNumber, errorSummary: acSummary } = TransunionValidationError.buildAccNumError();
    return {
      bankSortCode,
      bankAccountNumber,
      errorSummary: scSummary.concat(acSummary),
    };
  }

  static buildSortCodeError() {
    const errText = i18n.t('account:fields.sortCode.errors.transunionInvalid');
    return {
      bankSortCode: {
        text: errText,
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      },
      errorSummary: [errorHelper.generateGlobalErrorGenericFieldLink(
        'bankSortCode',
        'account',
        'sortCode',
        errText,
        i18n.t('google-analytics:pages.account-details.error', { TYPE: 'bank', FIELD: 'sort-code' }),
      )],
    };
  }

  static buildAccNumError() {
    const errText = i18n.t('account:fields.accountNumber.errors.transunionInvalid');
    return {
      bankAccountNumber: {
        text: i18n.t('account:fields.accountNumber.errors.transunionInvalid'),
        visuallyHiddenText: i18n.t('app:error-message.visuallyHiddenText'),
      },
      errorSummary: [errorHelper.generateGlobalErrorGenericFieldLink(
        'bankAccountNumber',
        'account',
        'accountNumber',
        errText,
        i18n.t('google-analytics:pages.account-details.error', { TYPE: 'bank', FIELD: 'account-number' }),
      )],
    };
  }

  static build(messages) {
    let sortCodeErr = false;
    let accNumErr = false;

    if (messages && Array.isArray(messages)) {
      for (let i = 0; i < messages.length; i++) {
        const msg = messages[i];
        const foundSortCodeErr = msg.toLowerCase() === SORT_CODE_INVALID_MSG;
        if (!sortCodeErr && foundSortCodeErr) {
          sortCodeErr = true;
        }

        const foundAccNumErr = msg.toLowerCase() === ACC_NUMBER_INVALID_MSG;
        if (!accNumErr && foundAccNumErr) {
          accNumErr = true;
        }
      }
    }
    return new TransunionValidationError(sortCodeErr, accNumErr, messages);
  }
}

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
  const bankVerifyCall = requestHelper.generatePostCall(`${res.locals.bankValidateServiceApiGateway}/bankvalidate`, verifyObject, 'frontend');

  try {
    const { body } = await got(bankVerifyCall);
    return body;
  } catch (err) {
    const traceID = requestHelper.getTraceID(err);
    requestHelper.errorLoggingHelper(err, '/api/bankvalidate', traceID, res.locals.logger, req.session.inviteKey);
    if (err.response && err.response.statusCode === StatusCodes.BAD_REQUEST) {
      return { result: bankVerification.badRequest() };
    }
    return { result: bankVerification.errorReturned() };
  }
};

const buildTransunionValidationError = (errorMessages) => TransunionValidationError.build(errorMessages);

const generateKBV = async (req, res, bankDetails, customerDetails) => {
  const requestObject = bank.bankDetailsToObjectWithCustomerDetails(bankDetails, customerDetails, req.session['dob-details']);
  const generateKBVCall = requestHelper.generatePostCall(`${res.locals.bankValidateServiceApiGateway}/bankvalidate/generateKBV`, requestObject, 'frontend');

  try {
    const { body } = await got(generateKBVCall);
    return body;
  } catch (err) {
    const traceID = requestHelper.getTraceID(err);
    requestHelper.errorLoggingHelper(err, '/api/bankvalidate/generateKBV', traceID, res.locals.logger, req.session.inviteKey);
    throw new Error(err);
  }
};

module.exports = {
  verifyAccountDetails,
  buildTransunionValidationError,
  generateKBV,
  SORT_CODE_INVALID_MSG,
  ACC_NUMBER_INVALID_MSG,
};
