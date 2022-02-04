const { assert } = require('chai');
const sinon = require('sinon');
const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const { application } = require('../../../config/application.js');
const bankValidation = require('../../../lib/validations/transunion/bank-validation');
const i18nextConfig = require('../../../config/i18next');

const accountController = require('../../../app/routes/account/functions');
const responseHelper = require('../../lib/responseHelper');
const { additionChecksRequired } = require('../../../lib/helpers/bankVerificationStatus');

let genericResponse = {};
const populatedSessionGet = { session: { 'account-details': true } };
const emptyRequest = {
  session: {},
  body: {
    paymentMethod: '', bankAccountHolder: '', bankAccountNumber: '', bankSortCodeField1: '', bankSortCodeField2: '', bankSortCodeField3: '',
  },
};
const populatedRequest = {
  session: { customerDetails: {}, userDateOfBirthInfo: { newStatePensionDate: 'Yes', newDobVerification: 'V' } },
  body: {
    paymentMethod: 'bank', bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCodeField1: '11', bankSortCodeField2: '22', bankSortCodeField3: '33',
  },
};
const populatedNonVerifiedRequest = {
  session: { customerDetails: {}, userDateOfBirthInfo: { newStatePensionDate: 'Yes', newDobVerification: 'NV' } },
  body: {
    paymentMethod: 'bank', bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCodeField1: '11', bankSortCodeField2: '22', bankSortCodeField3: '33',
  },
};
const populatedRequestBuilding = {
  session: { customerDetails: {}, userDateOfBirthInfo: { newStatePensionDate: 'Yes', newDobVerification: 'V' } },
  body: {
    paymentMethod: 'building', buildingAccountHolder: 'Mr Joe Bloggs', buildingAccountNumber: '12345678', buildingSortCodeField1: '11', buildingSortCodeField2: '22', buildingSortCodeField3: '33', buildingRoll: 'Test',
  },
};
const populatedRequestMoreFields = {
  session: { customerDetails: {}, userDateOfBirthInfo: { newStatePensionDate: 'Yes', newDobVerification: 'V' } },
  body: {
    batman: true, batname: 'Jim', paymentMethod: 'bank', bankAccountHolder: 'Mr Joe Bloggs', bankAccountNumber: '12345678', bankSortCodeField1: '11', bankSortCodeField2: '22', bankSortCodeField3: '33',
  },
};

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
        assert.equal(Object.keys(populatedRequest.session['account-details']).length, 6);
      });

      it('should return redirect to DOB proof when called with valid object and set validation to disabled when bank account is used', async () => {
        await accountController.accountPagePost(populatedNonVerifiedRequest, genericResponse);
        assert.equal(genericResponse.address, 'you-need-to-send-proof-of-your-date-of-birth');
        assert.equal(populatedRequest.session['account-details'].bankAccountNumber, '12345678');
        assert.equal(Object.keys(populatedRequest.session['account-details']).length, 6);
      });

      it('should return redirect when called with valid object and validation is not set when building soc is used', async () => {
        await accountController.accountPagePost(populatedRequestBuilding, genericResponse);
        assert.equal(genericResponse.address, 'check-your-details');
        assert.equal(populatedRequestBuilding.session['account-details'].buildingAccountNumber, '12345678');
        assert.equal(populatedRequestBuilding.session['account-details'].validated, undefined);
      });

      it('should filter out any post items that are not allowed', async () => {
        await accountController.accountPagePost(populatedRequestMoreFields, genericResponse);
        assert.equal(genericResponse.address, 'check-your-details');
        assert.isUndefined(populatedRequestMoreFields.session['account-details'].batman);
        assert.isUndefined(populatedRequestMoreFields.session['account-details'].batname);
      });

      it('should redirect user if transunion bank validation fails with additionalchecks required', async () => {
        const configStub = sinon.stub(application, 'feature');
        configStub.value({ bankValidationUsingKBV: true });

        const verifyAccountDetailsStub = sinon.stub(bankValidation, 'verifyAccountDetails');
        verifyAccountDetailsStub.returns(Promise.resolve({
          result: additionChecksRequired(),
        }));

        await accountController.accountPagePost(populatedRequestMoreFields, genericResponse);
        assert.equal(genericResponse.address, 'extra-checks');

        configStub.restore();
        verifyAccountDetailsStub.restore();
      });

      it('for overseas customer it should set accountStatus to "Not checked - Resident abroad" if KBV feature is enabled', async () => {
        const configStub = sinon.stub(application, 'feature');
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
