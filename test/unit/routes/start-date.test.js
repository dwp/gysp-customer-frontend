const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const mockdate = require('mockdate');
const moment = require('moment');

chai.use(chaiAsPromised);

const { assert } = chai;

const nock = require('nock');

nock.disableNetConnect();

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../config/i18next');

const responseHelper = require('../../lib/responseHelper');
const controller = require('../../../app/routes/start-date/functions');

let genericResponse = {};
const sessonStoreBeforeSpa = { session: { customerDetails: { statePensionDate: 1522398310000 }, isBeforeSpa: true }, body: { dateDay: '', dateMonth: '', dateYear: '' } };
const validFormDataBeforeSpa = { session: { customerDetails: { statePensionDate: 1522398310000 }, isBeforeSpa: true }, body: { dateDay: '01', dateMonth: '04', dateYear: '2018' } };
const validFormDataBeforeSpaEdit = { session: { editSection: 'claim-from-date', customerDetails: { statePensionDate: 1522398310000 }, isBeforeSpa: true }, body: { dateDay: '01', dateMonth: '04', dateYear: '2018' } };
const emptyFormDataBeforeSpa = { session: { customerDetails: { statePensionDate: 1522398310000 }, isBeforeSpa: true }, body: { dateDay: '', dateMonth: '', dateYear: '' } };
const invalidFormatDataBeforeSpa = { session: { customerDetails: { statePensionDate: 1522398310000 }, isBeforeSpa: true }, body: { dateDay: '10', dateMonth: '18', dateYear: '2019' } };
const invalidDateBeforeStatePensionDateBeforeSpa = { session: { customerDetails: { statePensionDate: 1522398310000 }, isBeforeSpa: true }, body: { dateDay: '29', dateMonth: '03', dateYear: '2018' } };
const validDateMoreThan4MonthBeforeSpa = { session: { customerDetails: { statePensionDate: 1522398310000 }, isBeforeSpa: true }, body: { dateDay: '02', dateMonth: '07', dateYear: '2018' } };

const sessonStoreAfterSpa = { session: { customerDetails: { statePensionDate: 1522398310000 }, isBeforeSpa: false }, body: { dateDay: '', dateMonth: '', dateYear: '' } };
const sessionStoreAfterSpaDateBeforeMockDate = { session: { customerDetails: { statePensionDate: 1459862400000 }, isBeforeSpa: false }, body: { dateDay: '', dateMonth: '', dateYear: '' } };
const validFormDataAfterSpa = { session: { customerDetails: { statePensionDate: 1522398310000 }, isBeforeSpa: false }, body: { dateDay: '01', dateMonth: '04', dateYear: '2018' } };
const validFormDataAfterSpaEdit = { session: { editSection: 'claim-from-date', customerDetails: { statePensionDate: 1522398310000 }, isBeforeSpa: false }, body: { dateDay: '01', dateMonth: '04', dateYear: '2018' } };
const emptyFormDataAfterSpa = { session: { customerDetails: { statePensionDate: 1522398310000 }, isBeforeSpa: false }, body: { dateDay: '', dateMonth: '', dateYear: '' } };
const invalidFormatDataAfterSpa = { session: { customerDetails: { statePensionDate: 1522398310000 }, isBeforeSpa: false }, body: { dateDay: '10', dateMonth: '18', dateYear: '2019' } };
const invalidDateBeforeStatePensionDateAfterSpa = { session: { customerDetails: { statePensionDate: 1522398310000 }, isBeforeSpa: false }, body: { dateDay: '29', dateMonth: '03', dateYear: '2018' } };
const invalidDateMoreThan12MonthsBeforeTodayAfterSpa = { session: { customerDetails: { statePensionDate: 1409862400000 }, isBeforeSpa: false }, body: { dateDay: '29', dateMonth: '03', dateYear: '2016' } };
const validDateMoreThan4MonthAfterSpa = { session: { customerDetails: { statePensionDate: 1522398310000 }, isBeforeSpa: false }, body: { dateDay: '02', dateMonth: '07', dateYear: '2018' } };

const validStatePensionStartDateErrorRequest = { session: {} };
const validStatePensionStartDateErrorNVRequest = { session: { userDateOfBirthInfo: { newStatePensionDate: 1522398310000 } } };
const validStatePensionStartDateErrorRequestEdit = { session: { editSection: 'claim-from-date' } };

const mockDateMinus12Months = moment(new Date('2018-03-01')).locale('en').subtract(1, 'year').format('D MMMM YYYY');

describe('Start date controller ', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
    mockdate.set(new Date('2018-03-01'));
  });

  afterEach(() => {
    mockdate.reset();
  });

  describe(' beforeSpa ', () => {
    describe('getStatePensionStartDate function (get /when-do-you-want-your-state-pension)', () => {
      it('should return view when called', (done) => {
        controller.getStatePensionStartDate(sessonStoreBeforeSpa, genericResponse);
        assert.equal(genericResponse.viewName, 'pages/state-pension-start-date.html');
        assert.equal(genericResponse.data.statePensionDate, '30 March 2018');
        assert.equal(genericResponse.data.displayText, 'system');
        done();
      });
    });

    describe('postStatePensionStartDate function (post /when-do-you-want-your-state-pension)', () => {
      it('should return view with validation errors when called with empty data', (done) => {
        controller.postStatePensionStartDate(emptyFormDataBeforeSpa, genericResponse);
        assert.equal(genericResponse.data.errors.date.text, 'Enter a date that you want to get your State Pension.');
        assert.equal(genericResponse.viewName, 'pages/state-pension-start-date.html');
        assert.equal(genericResponse.data.statePensionDate, '30 March 2018');
        assert.equal(genericResponse.data.displayText, 'system');
        done();
      });

      it('should return view with validation errors when called with date that is incorrectly formatted', (done) => {
        controller.postStatePensionStartDate(invalidFormatDataBeforeSpa, genericResponse);
        assert.equal(genericResponse.data.errors.date.text, 'Enter a real date.');
        assert.equal(genericResponse.viewName, 'pages/state-pension-start-date.html');
        assert.equal(genericResponse.data.statePensionDate, '30 March 2018');
        assert.equal(genericResponse.data.displayText, 'system');
        done();
      });

      it('should return view with validation errors when called with date that is before state pension date', (done) => {
        controller.postStatePensionStartDate(invalidDateBeforeStatePensionDateBeforeSpa, genericResponse);
        assert.equal(genericResponse.data.errors.date.text, 'Date cannot be before your State Pension date.');
        assert.equal(genericResponse.viewName, 'pages/state-pension-start-date.html');
        assert.equal(genericResponse.data.statePensionDate, '30 March 2018');
        assert.equal(genericResponse.data.displayText, 'system');
        done();
      });

      it('should redirect to your claim date error page when called with date more than 4 months away', (done) => {
        controller.postStatePensionStartDate(validDateMoreThan4MonthBeforeSpa, genericResponse);
        assert.equal(genericResponse.address, 'your-claim-date');
        done();
      });

      it('should redirect to next page when called with valid data', (done) => {
        controller.postStatePensionStartDate(validFormDataBeforeSpa, genericResponse);
        assert.equal(genericResponse.address, 'have-you-ever-lived-outside-of-the-uk');
        done();
      });

      it('should redirect to check and change when called with valid data and in edit mode', (done) => {
        controller.postStatePensionStartDate(validFormDataBeforeSpaEdit, genericResponse);
        assert.equal(genericResponse.address, 'check-your-details');
        done();
      });
    });
  });

  describe('  afterSpa  ', () => {
    describe('getStatePensionStartDate function (get /when-do-you-want-your-state-pension)', () => {
      it('should return view when called', (done) => {
        controller.getStatePensionStartDate(sessonStoreAfterSpa, genericResponse);
        assert.equal(genericResponse.viewName, 'pages/state-pension-start-date.html');
        assert.equal(genericResponse.data.statePensionDate, '30 March 2018');
        assert.equal(genericResponse.data.displayText, 'system');
        done();
      });
      it('should return view when called with todays date minus 12 months if spa is more than 12 months ago', (done) => {
        controller.getStatePensionStartDate(sessionStoreAfterSpaDateBeforeMockDate, genericResponse);
        assert.equal(genericResponse.viewName, 'pages/state-pension-start-date.html');
        assert.equal(genericResponse.data.statePensionDate, mockDateMinus12Months);
        assert.equal(genericResponse.data.displayText, 'system');
        done();
      });
    });

    describe('postStatePensionStartDate function (post /when-do-you-want-your-state-pension)', () => {
      it('should return view with validation errors when called with empty data', (done) => {
        controller.postStatePensionStartDate(emptyFormDataAfterSpa, genericResponse);
        assert.equal(genericResponse.data.errors.date.text, 'Enter a date that you want to get your State Pension.');
        assert.equal(genericResponse.viewName, 'pages/state-pension-start-date.html');
        assert.equal(genericResponse.data.statePensionDate, '30 March 2018');
        assert.equal(genericResponse.data.displayText, 'system');
        done();
      });

      it('should return view with validation errors when called with date that is incorrectly formatted', (done) => {
        controller.postStatePensionStartDate(invalidFormatDataAfterSpa, genericResponse);
        assert.equal(genericResponse.data.errors.date.text, 'Enter a real date.');
        assert.equal(genericResponse.viewName, 'pages/state-pension-start-date.html');
        assert.equal(genericResponse.data.statePensionDate, '30 March 2018');
        assert.equal(genericResponse.data.displayText, 'system');
        done();
      });

      it('should return view with validation errors when called with date that is before state pension date', (done) => {
        controller.postStatePensionStartDate(invalidDateBeforeStatePensionDateAfterSpa, genericResponse);
        assert.equal(genericResponse.data.errors.date.text, 'Date cannot be before your State Pension date.');
        assert.equal(genericResponse.viewName, 'pages/state-pension-start-date.html');
        assert.equal(genericResponse.data.statePensionDate, '30 March 2018');
        assert.equal(genericResponse.data.displayText, 'system');
        done();
      });

      it('should return view with validation errors when called with date more than 12 months ago', (done) => {
        controller.postStatePensionStartDate(invalidDateMoreThan12MonthsBeforeTodayAfterSpa, genericResponse);
        assert.equal(genericResponse.data.errors.date.text, 'Date cannot be more than 12 months before today.');
        assert.equal(genericResponse.viewName, 'pages/state-pension-start-date.html');
        assert.equal(genericResponse.data.displayText, 'system');
        done();
      });

      it('should redirect to your claim date error page when called with date more than 4 months away', (done) => {
        controller.postStatePensionStartDate(validDateMoreThan4MonthAfterSpa, genericResponse);
        assert.equal(genericResponse.address, 'your-claim-date');
        done();
      });

      it('should redirect to next page when called with valid data', (done) => {
        controller.postStatePensionStartDate(validFormDataAfterSpa, genericResponse);
        assert.equal(genericResponse.address, 'have-you-spent-any-time-in-prison');
        done();
      });

      it('should redirect to check and change when called with valid data and in edit mode', (done) => {
        controller.postStatePensionStartDate(validFormDataAfterSpaEdit, genericResponse);
        assert.equal(genericResponse.address, 'check-your-details');
        done();
      });
    });
  });

  describe('getStatePensionStartDateError', () => {
    it('should return view when called with start pension link as your-state-pension-date', (done) => {
      controller.getStatePensionStartDateError(validStatePensionStartDateErrorRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/state-pension-start-date-error.html');
      assert.equal(genericResponse.data.startPensionDatePage, '/when-do-you-want-your-state-pension');
      done();
    });
    it('should return view when called with start pension link as revised-your-state-pension-date', (done) => {
      controller.getStatePensionStartDateError(validStatePensionStartDateErrorNVRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/state-pension-start-date-error.html');
      assert.equal(genericResponse.data.startPensionDatePage, '/revised-your-state-pension-date');
      done();
    });
    it('should return view when called with start pension link as when-do-you-want-your-state-pension when in edit mode', (done) => {
      controller.getStatePensionStartDateError(validStatePensionStartDateErrorRequestEdit, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/state-pension-start-date-error.html');
      assert.equal(genericResponse.data.startPensionDatePage, '/when-do-you-want-your-state-pension');
      done();
    });
  });
});
