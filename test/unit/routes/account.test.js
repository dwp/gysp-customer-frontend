const { assert } = require('chai');
const sandbox = require('sinon').createSandbox();
const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const { application } = require('../../../config/application');
const bankValidation = require('../../../lib/validations/transunion/bank-validation');
const { SORT_CODE_INVALID_MSG, ACC_NUMBER_INVALID_MSG } = require('../../../lib/validations/transunion/bank-validation');
const i18nextConfig = require('../../../config/i18next');

const accountController = require('../../../app/routes/account/functions');
const responseHelper = require('../../lib/responseHelper');
const { additionChecksRequired, badRequest } = require('../../../lib/helpers/bankVerificationStatus');
const bankVerificationStatus = require('../../../lib/helpers/bankVerificationStatus');

let genericResponse = {};
const populatedSessionGet = { session: { 'account-details': true } };
const emptyRequest = {
  session: {},
  body: {
    bankAccountHolder: '', bankAccountNumber: '', bankSortCode: '',
  },
};
const populatedRequest = {
  session: { customerDetails: {}, userDateOfBirthInfo: { newStatePensionDate: 'Yes', newDobVerification: 'V' } },
  body: {
    bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCode: '112233',
  },
};
const populatedNonVerifiedRequest = {
  session: { customerDetails: {}, userDateOfBirthInfo: { newStatePensionDate: 'Yes', newDobVerification: 'NV' } },
  body: {
    bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCode: '112233',
  },
};
const populatedRequestBuilding = {
  session: { customerDetails: {}, userDateOfBirthInfo: { newStatePensionDate: 'Yes', newDobVerification: 'V' } },
  body: {
    bankAccountHolder: 'Mr Joe Bloggs',
    bankAccountNumber: '12345678',
    bankSortCode: '112233',
    buildingRoll: 'Test',
  },
};
const populatedRequestMoreFields = () => ({
  session: { customerDetails: {}, userDateOfBirthInfo: { newStatePensionDate: 'Yes', newDobVerification: 'V' } },
  body: {
    batman: true, batname: 'Jim', bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCode: '112233',
  },
});

const overseasSessionRequest = { session: { isOverseas: true }, body: { accountHolder: '', accountNumber: '', accountCode: '' } };
const populatedOverseasSessionGet = { session: { 'account-details-overseas': true, isOverseas: true } };
const populatedOverseasRequest = { session: { isOverseas: true, customerDetails: {}, userDateOfBirthInfo: { newStatePensionDate: 'Yes', newDobVerification: 'V' } }, body: { accountHolder: 'Test accountHolder', accountNumber: 'Test accountNumber', accountCode: 'Test accountCode' } };
const populatedNonVerifiedOverseasRequest = { session: { isOverseas: true, customerDetails: {}, userDateOfBirthInfo: { newStatePensionDate: 'Yes', newDobVerification: 'NV' } }, body: { accountHolder: 'Test accountHolder', accountNumber: 'Test accountNumber', accountCode: 'Test accountCode' } };
const populatedOverseasRequestMoreFields = {
  session: { isOverseas: true, customerDetails: {}, userDateOfBirthInfo: { newStatePensionDate: 'Yes', newDobVerification: 'V' } },
  body: {
    spiderman: true, shouldBeRemoved: true, accountHolder: 'Test accountHolder', accountNumber: 'Test accountNumber', accountCode: 'Test accountCode',
  },
};

describe('Account controller ', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe(' UK/NI customer ', () => {
    describe(' accountPageGet function (GET /account-details)', () => {
      it('should return view name when called with unpopulated response data when session is not populated', (done) => {
        accountController.accountPageGet(emptyRequest, genericResponse);
        assert.equal(genericResponse.viewName, 'pages/account-details');
        assert.isUndefined(genericResponse.data.details);
        done();
      });

      it('should return view name when called with populated response data when session is set', (done) => {
        accountController.accountPageGet(populatedSessionGet, genericResponse);
        assert.equal(genericResponse.viewName, 'pages/account-details');
        assert.isTrue(genericResponse.data.details);
        done();
      });
    });

    describe(' accountPagePost function (POST /account-details)', () => {
      it('should return default view name when called with empty object', async () => {
        await accountController.accountPagePost(emptyRequest, genericResponse);
        assert.equal(genericResponse.viewName, 'pages/account-details');
      });

      it('should return redirect when called with valid object and set validation to disabled when bank account is used', async () => {
        await accountController.accountPagePost(populatedRequest, genericResponse);
        assert.equal(genericResponse.address, 'check-your-details');
        assert.equal(populatedRequest.session['account-details'].bankAccountNumber, '12345678');
        assert.equal(Object.keys(populatedRequest.session['account-details']).length, 4);
        assert.isTrue(populatedRequest.session.accountDetailsEntered);
      });

      it('should return redirect to DOB proof when called with valid object and set validation to disabled when bank account is used', async () => {
        await accountController.accountPagePost(populatedNonVerifiedRequest, genericResponse);
        assert.equal(genericResponse.address, 'you-need-to-send-proof-of-your-date-of-birth');
        assert.equal(populatedRequest.session['account-details'].bankAccountNumber, '12345678');
        assert.equal(Object.keys(populatedRequest.session['account-details']).length, 4);
        assert.isTrue(populatedRequest.session.accountDetailsEntered);
      });

      it('should return redirect when called with valid object and validation is not set when building soc is used', async () => {
        await accountController.accountPagePost(populatedRequestBuilding, genericResponse);
        assert.equal(genericResponse.address, 'check-your-details');
        assert.equal(populatedRequestBuilding.session['account-details'].bankAccountNumber, '12345678');
        assert.equal(populatedRequestBuilding.session['account-details'].validated, undefined);
        assert.isTrue(populatedRequest.session.accountDetailsEntered);
      });

      it('should filter out any post items that are not allowed', async () => {
        const req = populatedRequestMoreFields();
        await accountController.accountPagePost(req, genericResponse);
        assert.equal(genericResponse.address, 'check-your-details');
        assert.isUndefined(req.session['account-details'].batman);
        assert.isUndefined(req.session['account-details'].batname);
      });

      it('should redirect user to "extra-checks" page if transunion bank validation fails with additionalchecks required and generateKBV call succeeds', async () => {
        const configStub = sandbox.stub(application, 'feature');
        configStub.value({ bankValidationUsingKBV: true });

        const generateKBVStub = sandbox.stub(bankValidation, 'generateKBV');
        generateKBVStub.returns(Promise.resolve({
          questions: [
            {
              category: 'KBV18',
              questionText: 'You took out a mobile phone contract in May 2005, which provider was it with?',
              options: [{
                text: 'T-MOBILE',
                correct: false,
              },
              {
                text: 'EE',
                correct: false,
              },
              {
                text: 'THREE',
                correct: false,
              },
              {
                text: 'ORANGE',
                correct: false,
              },
              {
                text: 'O2',
                correct: true,
              },
              ],
            },
          ],
        }));

        const verifyAccountDetailsStub = sandbox.stub(bankValidation, 'verifyAccountDetails');
        verifyAccountDetailsStub.returns(Promise.resolve({
          result: additionChecksRequired(),
        }));

        const req = populatedRequestMoreFields();
        await accountController.accountPagePost(req, genericResponse);
        assert.equal(genericResponse.address, 'extra-checks');
        assert.equal(req.session.kbvQuestions.length, 1);
        assert.equal(req.session.translatedKbvQuestions.length, 1);
        assert.isTrue(req.session.accountDetailsEntered);
        assert.isTrue(req.session['account-details'].kbvFlag);

        configStub.restore();
        verifyAccountDetailsStub.restore();
        generateKBVStub.restore();
      });

      it('should redirect user to "check-your-details" page if transunion bank validation fails with additionalchecks required and generateKBV call fails', async () => {
        const configStub = sandbox.stub(application, 'feature');
        configStub.value({ bankValidationUsingKBV: true });

        const generateKBVStub = sandbox.stub(bankValidation, 'generateKBV');
        generateKBVStub.throws(new Error('dummy conn error'));

        const verifyAccountDetailsStub = sandbox.stub(bankValidation, 'verifyAccountDetails');
        verifyAccountDetailsStub.returns(Promise.resolve({
          result: additionChecksRequired(),
        }));

        const req = populatedRequestMoreFields();
        await accountController.accountPagePost(req, genericResponse);
        assert.equal(genericResponse.address, 'check-your-details');
        assert.isUndefined(req.session.kbvQuestions);
        assert.isUndefined(req.session.translatedKbvQuestions);
        assert.isUndefined(req.session.kbvFlag);
        assert.equal(req.session.accountStatus.result, bankVerificationStatus.badRequest());
        assert.isTrue(req.session.accountDetailsEntered);

        configStub.restore();
        verifyAccountDetailsStub.restore();
        generateKBVStub.restore();
      });

      it('should take user back to account details page if transunion bank validation fails for sort code AND account number errors', async () => {
        const configStub = sandbox.stub(application, 'feature');
        configStub.value({ bankValidationUsingKBV: true });

        const verifyAccountDetailsStub = sandbox.stub(bankValidation, 'verifyAccountDetails');
        verifyAccountDetailsStub.returns(Promise.resolve({
          result: badRequest(),
          messages: [SORT_CODE_INVALID_MSG, ACC_NUMBER_INVALID_MSG],
        }));

        const req = populatedRequestMoreFields();
        await accountController.accountPagePost(req, genericResponse);
        assert.equal(genericResponse.viewName, 'pages/account-details');
        assert.deepEqual(genericResponse.data.details, {
          bankSortCode: '112233',
          bankAccountNumber: '12345678',
          bankAccountHolder: 'Mr Joe Bloggs',
          batman: true,
          batname: 'Jim',
          paymentMethod: 'bank',
        });
        assert.deepEqual(genericResponse.data.errors, {
          bankSortCode: {
            text: 'The sort code does not exist - check it and try again',
            visuallyHiddenText: 'Error',
          },
          bankAccountNumber: {
            text: 'The account number does not exist - check it and try again',
            visuallyHiddenText: 'Error',
          },
          errorSummary: [
            {
              href: '#bankSortCode',
              text: 'The sort code does not exist - check it and try again',
            },
            {
              href: '#bankAccountNumber',
              text: 'The account number does not exist - check it and try again',
            }],
        });

        configStub.restore();
        verifyAccountDetailsStub.restore();
      });

      it('should redirect user to account details page with transunion errors if transunion bank validation fails for sort code OR account number error', async () => {
        const configStub = sandbox.stub(application, 'feature');
        const req = populatedRequestMoreFields();
        configStub.value({ bankValidationUsingKBV: true });

        const verifyAccountDetailsStub = sandbox.stub(bankValidation, 'verifyAccountDetails');
        verifyAccountDetailsStub.returns(Promise.resolve({
          result: badRequest(),
          messages: [SORT_CODE_INVALID_MSG],
        }));

        await accountController.accountPagePost(req, genericResponse);
        assert.equal(genericResponse.viewName, 'pages/account-details');
        assert.deepEqual(genericResponse.data.details, {
          bankSortCode: '112233',
          bankAccountNumber: '12345678',
          bankAccountHolder: 'Mr Joe Bloggs',
          batman: true,
          batname: 'Jim',
          paymentMethod: 'bank',
        });
        assert.deepEqual(genericResponse.data.errors, {
          bankSortCode: {
            text: 'The sort code does not exist - check it and try again',
            visuallyHiddenText: 'Error',
          },
          errorSummary: [{
            href: '#bankSortCode',
            text: 'The sort code does not exist - check it and try again',
          }],
        });

        configStub.restore();
        verifyAccountDetailsStub.restore();
      });

      it('for overseas customer it should set accountStatus to "Not checked - Resident abroad" if KBV feature is enabled', async () => {
        const configStub = sandbox.stub(application, 'feature');
        const clonedReq = JSON.parse(JSON.stringify(populatedOverseasRequestMoreFields));
        configStub.value({ bankValidationUsingKBV: true });

        await accountController.accountPagePost(clonedReq, genericResponse);
        assert.equal(genericResponse.address, 'check-your-details');
        assert.deepEqual(clonedReq.session.accountStatus, { result: 'Not checked - Resident abroad' });

        configStub.restore();
      });
    });
  });

  describe(' Overseas customer ', () => {
    describe(' accountPageGet function (GET /account-details)', () => {
      it('should return view name when called with unpopulated response data when session is set', (done) => {
        accountController.accountPageGet(overseasSessionRequest, genericResponse);
        assert.equal(genericResponse.viewName, 'pages/account-details-overseas');
        assert.isUndefined(genericResponse.data.details);
        done();
      });

      it('should return view name when called with populated response data when session is set', (done) => {
        accountController.accountPageGet(populatedOverseasSessionGet, genericResponse);
        assert.equal(genericResponse.viewName, 'pages/account-details-overseas');
        assert.isTrue(genericResponse.data.details);
        done();
      });
    });

    describe(' accountPagePost function (POST /account-details)', () => {
      it('should return default view name when called with empty object', async () => {
        await accountController.accountPagePost(overseasSessionRequest, genericResponse);
        assert.equal(genericResponse.viewName, 'pages/account-details-overseas');
      });

      it('should return redirect to declaration when called with valid verified DOB object', async () => {
        await accountController.accountPagePost(populatedOverseasRequest, genericResponse);
        assert.equal(genericResponse.address, 'check-your-details');
        assert.equal(populatedOverseasRequest.session['account-details-overseas'].accountNumber, 'Test accountNumber');
        assert.equal(Object.keys(populatedOverseasRequest.session['account-details-overseas']).length, 3);
      });

      it('should return redirect to dob proof when called with valid non verified DOB object', async () => {
        await accountController.accountPagePost(populatedNonVerifiedOverseasRequest, genericResponse);
        assert.equal(genericResponse.address, 'you-need-to-send-proof-of-your-date-of-birth');
        assert.equal(populatedNonVerifiedOverseasRequest.session['account-details-overseas'].accountNumber, 'Test accountNumber');
        assert.equal(Object.keys(populatedNonVerifiedOverseasRequest.session['account-details-overseas']).length, 3);
      });

      it('should filter out any post items that are not allowed', async () => {
        await accountController.accountPagePost(populatedOverseasRequestMoreFields, genericResponse);
        assert.equal(genericResponse.address, 'check-your-details');
        assert.isUndefined(populatedOverseasRequestMoreFields.session['account-details-overseas'].spiderman);
        assert.isUndefined(populatedOverseasRequestMoreFields.session['account-details-overseas'].shouldBeRemoved);
      });
    });
  });
});
