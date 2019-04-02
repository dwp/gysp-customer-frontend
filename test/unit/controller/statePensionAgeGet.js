const { assert } = require('chai');

const controller = require('../../../app/routes/date/functions');
const responseHelper = require('../../lib/responseHelper');

let genericResponse = {};
const noUserDOB = { session: { customerDetails: { statePensionDate: -1631145600000 }, userDateOfBirthInfo: {} }, body: { preferredTelephoneNumber: '', additionalTelephoneNumber: '', email: '' } };
const userDOB = { session: { customerDetails: { statePensionDate: -1531145600000 }, userDateOfBirthInfo: { newStatePensionDate: -1631102401000 } }, body: { preferredTelephoneNumber: '', additionalTelephoneNumber: '', email: '' } };
const noUserDOBOverseas = { session: { customerDetails: { statePensionDate: -1631145600000 }, userDateOfBirthInfo: {}, isOverseas: true }, body: { preferredTelephoneNumber: '', additionalTelephoneNumber: '', email: '' } };
const userDOBOverseas = { session: { customerDetails: { statePensionDate: -1531145600000 }, userDateOfBirthInfo: { newStatePensionDate: -1631102401000 }, isOverseas: true }, body: { preferredTelephoneNumber: '', additionalTelephoneNumber: '', email: '' } };


describe('State Pension Age controller ', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe(' statePensionAgeGet function (GET /your-state-pension-date)', () => {
    it('should return view name with system state pension age when none is in session', (done) => {
      controller.statePensionAgeGet(noUserDOB, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/state-pension-date.html');
      assert.equal(genericResponse.data.statePensionDate, '25 April 1918');
      assert.equal(genericResponse.data.nextPage, '/have-you-ever-lived-outside-of-the-uk');
      assert.equal(genericResponse.data.displayText, 'system');
      done();
    });

    it('should return view name with user state pension age when one is in session', (done) => {
      controller.statePensionAgeRevisedGet(userDOB, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/state-pension-date.html');
      assert.equal(genericResponse.data.statePensionDate, '25 April 1918');
      assert.equal(genericResponse.data.nextPage, '/have-you-ever-lived-outside-of-the-uk');
      assert.equal(genericResponse.data.displayText, 'user');
      done();
    });

    it('should return overseas view name with system state pension age when none is in session', (done) => {
      controller.statePensionAgeGet(noUserDOBOverseas, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/state-pension-date.html');
      assert.equal(genericResponse.data.statePensionDate, '25 April 1918');
      assert.equal(genericResponse.data.nextPage, '/where-have-you-lived-outside-the-uk');
      assert.equal(genericResponse.data.displayText, 'system');
      done();
    });

    it('should return overseas view name with user state pension age when one is in session', (done) => {
      controller.statePensionAgeRevisedGet(userDOBOverseas, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/state-pension-date.html');
      assert.equal(genericResponse.data.statePensionDate, '25 April 1918');
      assert.equal(genericResponse.data.nextPage, '/where-have-you-lived-outside-the-uk');
      assert.equal(genericResponse.data.displayText, 'user');
      done();
    });
  });
});
