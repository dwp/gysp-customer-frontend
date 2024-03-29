const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const moment = require('moment');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const nock = require('nock');

const i18nextConfig = require('../../../config/i18next');

chai.use(chaiAsPromised);

const { assert } = chai;

nock.disableNetConnect();

const responseHelper = require('../../lib/responseHelper');
const controller = require('../../../app/routes/dob/functions');

let genericResponse = {};

const statePensionAPI = '/api/customer/recalculateSpaDate';

let sessonStore = { session: { customerDetails: { gender: 'Male' }, userDateOfBirthInfo: {} }, body: { dateYear: 2000, dateMonth: 9, dateDay: 9 } };
const sessonStoreDobInPast = { session: { customerDetails: { gender: 'Male' }, userDateOfBirthInfo: {} }, body: { dateYear: 1955, dateMonth: 9, dateDay: 9 } };
const noData = { session: { customerDetails: { gender: 'Male' }, userDateOfBirthInfo: {} }, body: { dateYear: '', dateMonth: '', dateDay: '' } };
const sessonStoreEdit = { session: { editSection: 'dob-details', customerDetails: { gender: 'Male' }, userDateOfBirthInfo: {} }, body: { dateYear: 2000, dateMonth: 9, dateDay: 9 } };
const datePlus2Months = moment().add(2, 'months').toDate().getTime();

const messages = {
  NSP_CLAIM: 'Non state pension customer',
  MATURE_CLAIM: 'Mature claim',
  PRE_MATURE_CLAIM: 'Pre-Mature claim',
};

describe('DOB controller ', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  beforeEach(() => {
    sessonStore = { session: { customerDetails: { gender: 'Male' }, userDateOfBirthInfo: {} }, body: { dateYear: 2000, dateMonth: 9, dateDay: 9 } };
    genericResponse = responseHelper.genericResponse();
  });

  describe(' dobConfirmRedirect function (post /date-of-birth)', () => {
    it('should return error when form elements are not complete', (done) => {
      controller.dobConfirmRedirect(noData, genericResponse);
      assert.equal(genericResponse.data.errors.date.text, 'Enter your date of birth.');
      done();
    });
  });

  describe(' getNewStatePensionDate function ', () => {
    it('should redirect to State Pension date page when date of doesn\'t match but is within a valid range and store details in session', () => {
      nock('http://test-url').post(statePensionAPI).reply(200, { message: messages.MATURE_CLAIM, spaDate: datePlus2Months });
      return assert.becomes(controller.getNewStatePensionDate(sessonStore, genericResponse), { redirectURL: 'revised-your-state-pension-date', statePensionDate: datePlus2Months });
    });
    it('should redirect When do you want your pension page when date birth of doesn\'t match and is afterSpa and store details in session', () => {
      nock('http://test-url').post(statePensionAPI).reply(200, { message: messages.MATURE_CLAIM, spaDate: -483235200000 });
      return assert.becomes(controller.getNewStatePensionDate(sessonStore, genericResponse), { redirectURL: 'when-do-you-want-your-state-pension', statePensionDate: -483235200000 });
    });

    it('should redirect to too early page when date of birth doesn\'t match and is too early (before 4 months)', () => {
      nock('http://test-url').post(statePensionAPI).reply(200, { message: messages.PRE_MATURE_CLAIM, spaDate: -483235200000 });
      return assert.becomes(controller.getNewStatePensionDate(sessonStore, genericResponse), { redirectURL: 'you-are-too-early-to-get-your-state-pension', statePensionDate: -483235200000 });
    });

    it('should redirect to before page when date of birth doesn\'t match and is before 4th of April (Not a NSP Customer)', () => {
      nock('http://test-url').post(statePensionAPI).reply(200, { message: messages.NSP_CLAIM });
      return assert.becomes(controller.getNewStatePensionDate(sessonStore, genericResponse), { redirectURL: 'call-us-to-get-your-state-pension', statePensionDate: undefined });
    });

    it('should reject when 404 is found with no state pension date', () => {
      nock('http://test-url').post(statePensionAPI).reply(404, {});
      return assert.isRejected(controller.getNewStatePensionDate(sessonStore, genericResponse));
    });
  });

  describe('dobConfirm function', () => {
    it('should redirect to date of birth age when date of birth has been verifed', () => {
      sessonStore.session.customerDetails.dobVerification = 'V';
      controller.dobConfirm(sessonStore, genericResponse);
      assert.equal(genericResponse.address, 'your-state-pension-date');
    });

    it('should render date of birth confirm page when date of birth has not been verifed', () => {
      sessonStore.session.customerDetails.dobVerification = 'NV';
      controller.dobConfirm(sessonStore, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/dob-confirm');
    });
  });

  describe('dobConfirmRedirect function', () => {
    it('should redirect to your state pension age when session date of birth matches user input', () => {
      sessonStore.session.customerDetails.dob = 968457600000;
      controller.dobConfirmRedirect(sessonStore, genericResponse);
      assert.equal(sessonStore.session.userDateOfBirthInfo.newDobVerification, 'V');
      assert.equal(sessonStore.session.userDateOfBirthInfo.newStatePensionDate, sessonStore.session.customerDetails.statePensionDate);
      assert.equal(genericResponse.address, 'revised-your-state-pension-date');
    });

    it('should redirect to when do you want pension page when session date of birth matches user input and is before today', () => {
      sessonStoreDobInPast.session.customerDetails.dob = -451663754000;
      sessonStoreDobInPast.session.customerDetails.statePensionDate = -483235200000;
      controller.dobConfirmRedirect(sessonStoreDobInPast, genericResponse);
      assert.equal(sessonStoreDobInPast.session.userDateOfBirthInfo.newDobVerification, 'V');
      assert.equal(genericResponse.address, 'when-do-you-want-your-state-pension');
    });

    it('should set new state pension date session object and redirect when user input has a state pension date in the past and status code is OK', async () => {
      sessonStore.session.customerDetails.dob = 946684800;
      nock('http://test-url').post(statePensionAPI).reply(200, { message: messages.MATURE_CLAIM, spaDate: -483235200000 });
      await controller.dobConfirmRedirect(sessonStore, genericResponse);
      assert.equal(sessonStore.session.userDateOfBirthInfo.newStatePensionDate, -483235200000);
      assert.equal(genericResponse.address, 'when-do-you-want-your-state-pension');
    });

    it('should set new state pension date session object and redirect when user input has a state pension date in the future and status code is OK', async () => {
      sessonStore.session.customerDetails.dob = 946684800;
      nock('http://test-url').post(statePensionAPI).reply(200, { message: messages.MATURE_CLAIM, spaDate: datePlus2Months });
      await controller.dobConfirmRedirect(sessonStore, genericResponse);
      assert.equal(sessonStore.session.userDateOfBirthInfo.newStatePensionDate, datePlus2Months);
      assert.equal(genericResponse.address, 'revised-your-state-pension-date');
    });

    it('should set new state pension date session object and redirect to too early when user input has a state pension date and message is too early', async () => {
      sessonStore.session.customerDetails.dob = 946684800;
      nock('http://test-url').post(statePensionAPI).reply(200, { message: messages.PRE_MATURE_CLAIM, spaDate: -483235200000 });
      await controller.dobConfirmRedirect(sessonStore, genericResponse);
      assert.equal(sessonStore.session.userDateOfBirthInfo.newStatePensionDate, -483235200000);
      assert.equal(genericResponse.address, 'you-are-too-early-to-get-your-state-pension');
    });

    it('should redirect to call us screen when no user input state and state pension date isn\'t supplied', async () => {
      sessonStore.session.customerDetails.dob = 946684800;
      nock('http://test-url').post(statePensionAPI).reply(200, { message: messages.NSP_CLAIM });
      await controller.dobConfirmRedirect(sessonStore, genericResponse);
      assert.equal(sessonStore.session.userDateOfBirthInfo.newStatePensionDate, undefined);
      assert.equal(genericResponse.address, 'call-us-to-get-your-state-pension');
    });

    it('should show error screen when and an internal error occurred ', async () => {
      sessonStore.session.customerDetails.dob = 946684800;
      nock('http://test-url').post(statePensionAPI).reply(404, {});
      await controller.dobConfirmRedirect(sessonStore, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/error');
    });

    it('should render date of birth confirm with errors when an error is encountered', () => {
      sessonStore.body.dateDay = 'Error';
      controller.dobConfirmRedirect(sessonStore, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/dob-confirm');
    });

    it('should redirect to check and change page when in edit mode and data hasn\t changed', () => {
      sessonStoreEdit.session['dob-details'] = { dateYear: 2000, dateMonth: 9, dateDay: 9 };
      controller.dobConfirmRedirect(sessonStoreEdit, genericResponse);
      assert.equal(genericResponse.address, 'check-your-details');
    });

    it('should redirect to state pension date when in edit mode and data has changed and new date is a mature date', async () => {
      sessonStore.session.customerDetails.dob = 946684800;
      nock('http://test-url').post(statePensionAPI).reply(200, { message: messages.MATURE_CLAIM, spaDate: datePlus2Months });
      sessonStoreEdit.session['dob-details'] = { dateYear: 2000, dateMonth: 9, dateDay: 10 };
      await controller.dobConfirmRedirect(sessonStoreEdit, genericResponse);
      assert.equal(genericResponse.address, 'revised-your-state-pension-date');
    });

    it('should set "isBeforeSpa" to false when user input date of birth matches session dob and when statePensionDate is before today\'s date', () => {
      sessonStore.session.customerDetails.dob = 968457600000;
      sessonStore.session.customerDetails.statePensionDate = 1607731200; // Saturday, 12 December 2020
      controller.dobConfirmRedirect(sessonStore, genericResponse);
      assert.isFalse(sessonStore.session.isBeforeSpa);
    });
  });

  describe('beforePensionAgeGet function', () => {
    it('should render state pension age too early view when called', () => {
      controller.beforePensionAgeGet(sessonStore, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/state-pension-age-before');
    });
  });

  describe('tooEarlyForPensionGet function', () => {
    it('should render state pension age too early view with no state pension data when it is not in session', () => {
      controller.tooEarlyForPensionGet(sessonStore, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/state-pension-age-too-early');
      assert.equal(genericResponse.data.statePensionDate, false);
    });

    it('should render state pension age too early view with state pension date when it is in the session', () => {
      sessonStore.session.userDateOfBirthInfo = { newStatePensionDate: -483235200000 };
      controller.tooEarlyForPensionGet(sessonStore, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/state-pension-age-too-early');
      assert.equal(genericResponse.data.statePensionDate, '9 September 1954');
    });
  });

  describe('dobProofGet function', () => {
    it('should render dob proof view when called', () => {
      controller.dobProofGet(sessonStore, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/dob-proof');
    });
  });
});
