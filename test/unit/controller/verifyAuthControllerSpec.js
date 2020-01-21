const { assert } = require('chai');

const nock = require('nock');

nock.disableNetConnect();

const verifyAuthController = require('../../../app/routes/verify-auth/functions');
const responseHelper = require('../../lib/responseHelper');

const customerAPI = '/api/customer/hashpid';
const claimAPI = '/api/claim/claimexists';

let genericResponse = {};
const emptyRequest = { session: {}, body: {} };
const customerDetailsGB = {
  inviteKey: 'JONE12345', firstName: 'Tom', lastName: 'Jones', residentialAddress: { postCode: 'NE1 1YS' },
};
const customerDetailsNI = {
  inviteKey: 'NEES12345', firstName: 'Liam', lastName: 'Neeson', residentialAddress: { postCode: 'BT1 2TY' },
};

const validCustomerRequest = { session: { customerDetails: { statePensionDate: 1519862400000 } } };
const validCustomerWelshRequest = { session: { customerDetails: { statePensionDate: 1519862400000 }, lang: 'cy-GB' } };

let validWelshLangaugeRequest = { params: { language: 'cy' }, session: {} };
let validEnglishLangaugeRequest = { params: { language: 'en' }, session: {} };
let validUnrecognisedLangaugeRequest = { params: { language: 'es' }, session: {} };

const customerSessionGB = {
  userPassedAuth: true,
  inviteKey: 'JONE12345',
  inviteKeyHash: '4b5d41060b6ae1f43f5b10336af535d6281676d1165831a8cae969988c0b3519',
  customerDetails: {
    inviteKey: 'JONE12345', firstName: 'Tom', lastName: 'Jones', residentialAddress: { postCode: 'NE1 1YS' },
  },
  userDateOfBirthInfo: {},
  isNorthernIreland: false,
  isBeforeSpa: true,
};
const customerSessionNI = {
  userPassedAuth: true,
  inviteKey: 'NEES12345',
  inviteKeyHash: '512d094f59d23ba0d2f37b1daca2143c17cfe140c4d1e383908f6d755c841375',
  customerDetails: {
    inviteKey: 'NEES12345', firstName: 'Liam', lastName: 'Neeson', residentialAddress: { postCode: 'BT1 2TY' },
  },
  userDateOfBirthInfo: {},
  isNorthernIreland: true,
  isBeforeSpa: true,
};
const validUser = { pid: 'pid' };

const error = {
  statusCode: 404, inviteKey: 'TEST12345', message: 'Test error message', options: { headers: { 'X-B3-TraceId': 123456 } }, req: { path: 'test/test' },
};
const logMessage = '404 - Test error message - Requested on test/test';

const postSignInWithVerifySession = { personalDataPermission: 'yes' };

describe('Verify controller ', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
    genericResponse.locals.traceID = '';
    genericResponse.locals.logMessage = '';
    genericResponse.locals.logger = {
      error(traceID, errorTxt) {
        genericResponse.locals.traceID = traceID;
        genericResponse.locals.logMessage = errorTxt;
      },
    };
  });

  describe(' getVerifyAbout function (GET /verify)', () => {
    it('should return view name when called with unpopulated response data', (done) => {
      verifyAuthController.getVerifyAbout(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/verify-about');
      done();
    });
  });

  describe(' getNoMatch function (GET /verify/no-match)', () => {
    it('should return view name when called with unpopulated response data', (done) => {
      verifyAuthController.getNoMatch(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/verify-no-match');
      done();
    });
  });

  describe(' getCancel function (GET /verify/cancel)', () => {
    it('should return view name when called with unpopulated response data', (done) => {
      verifyAuthController.getCancel(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/verify-cancel');
      done();
    });
  });

  describe(' processAuth function', () => {
    it('should call api and return customer object when customer is found and claim doesn\'t exists', async () => {
      nock('http://test-url').get(`${customerAPI}/${validUser.pid}`).reply(200, customerDetailsGB);
      nock('http://test-url').get(`${claimAPI}/${customerDetailsGB.inviteKey}`).reply(404, {});
      const processAuth = await verifyAuthController.processAuth(emptyRequest, genericResponse, validUser);
      assert.equal(JSON.stringify(processAuth), JSON.stringify(customerDetailsGB));
    });

    it('should call api and return an error when customer is found and claim does exists', async () => {
      nock('http://test-url').get(`${customerAPI}/${validUser.pid}`).reply(200, customerDetailsGB);
      nock('http://test-url').get(`${claimAPI}/${customerDetailsGB.inviteKey}`).reply(200, {});
      try {
        await verifyAuthController.processAuth(emptyRequest, genericResponse, validUser);
      } catch (err) {
        assert.instanceOf(err, Error);
      }
    });

    it('should call api and return an error when customer is not found', async () => {
      nock('http://test-url').get(`${customerAPI}/${validUser.pid}`).reply(404, {});
      nock('http://test-url').get(`${claimAPI}/${customerDetailsGB.inviteKey}`).reply(404, {});
      try {
        await verifyAuthController.processAuth(emptyRequest, genericResponse, validUser);
      } catch (err) {
        assert.instanceOf(err, Error);
      }
    });
  });

  describe(' setSessionData function', () => {
    it('should set session data with GB customer when called with unpopulated response data', (done) => {
      verifyAuthController.setSessionData(emptyRequest, genericResponse, customerDetailsGB, () => {});
      assert.equal(JSON.stringify(emptyRequest.session), JSON.stringify(customerSessionGB));
      done();
    });

    it('should set session data with NI customer when called with unpopulated response data', (done) => {
      verifyAuthController.setSessionData(emptyRequest, genericResponse, customerDetailsNI, () => {});
      assert.equal(JSON.stringify(emptyRequest.session), JSON.stringify(customerSessionNI));
      done();
    });
  });

  describe(' authErrorPage function', () => {
    it('should set log message and display error view when called with error', (done) => {
      verifyAuthController.authErrorPage(error, emptyRequest, genericResponse);
      assert.equal(genericResponse.locals.logMessage, logMessage);
      assert.equal(genericResponse.statusCode, 200);
      assert.equal(genericResponse.viewName, 'pages/error');
      done();
    });
  });

  describe(' getTooEarlyForPension function (GET /verify/you-are-too-early-to-get-your-state-pension)', () => {
    it('should return view name with correct state pension date', (done) => {
      verifyAuthController.getTooEarlyForPension(validCustomerRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/verify-state-pension-age-too-early');
      assert.equal(genericResponse.data.statePensionDate, '1 March 2018');
      done();
    });

    it('should return view name with correct state pension date in welsh when language is set to welsh', (done) => {
      verifyAuthController.getTooEarlyForPension(validCustomerWelshRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/verify-state-pension-age-too-early');
      assert.equal(genericResponse.data.statePensionDate, '1 Mawrth 2018');
      done();
    });
  });

  describe(' getSignInWithVerify function (GET /verify/you-can-now-sign-in-with-govuk-verify)', () => {
    it('should return correct view name when call route', (done) => {
      verifyAuthController.getSignInWithVerify(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/verify-sign-in');
      done();
    });
  });

  describe(' postSignInWithVerify function (POST /verify/you-can-now-sign-in-with-govuk-verify)', () => {
    it('should return a redirect when posting to route', (done) => {
      verifyAuthController.postSignInWithVerify(emptyRequest, genericResponse);
      assert.equal(JSON.stringify(emptyRequest.session['personal-data']), JSON.stringify(postSignInWithVerifySession));
      assert.equal(genericResponse.address, '/verify/start');
      done();
    });
  });

  describe(' getSwitchLanguage function (GET /verify/you-can-now-sign-in-with-govuk-verify/:language)', () => {
    beforeEach(() => {
      const setLng = {
        lang: '',
        i18n: {
          setLng: (lang) => {
            setLng.lang = lang;
          },
        },
      };
      validEnglishLangaugeRequest = Object.assign(validEnglishLangaugeRequest, setLng);
      validWelshLangaugeRequest = Object.assign(validWelshLangaugeRequest, setLng);
      validUnrecognisedLangaugeRequest = Object.assign(validUnrecognisedLangaugeRequest, setLng);
    });

    it('should set english language and return a redirect when english is requested', (done) => {
      verifyAuthController.getSwitchLanguage(validEnglishLangaugeRequest, genericResponse);
      assert.equal(validEnglishLangaugeRequest.session.lang, 'en-GB');
      assert.equal(genericResponse.address, '/verify/you-can-now-sign-in-with-govuk-verify');
      done();
    });

    it('should set welsh language and return a redirect when welsh is requested', (done) => {
      verifyAuthController.getSwitchLanguage(validWelshLangaugeRequest, genericResponse);
      assert.equal(validWelshLangaugeRequest.session.lang, 'cy-GB');
      assert.equal(genericResponse.address, '/verify/you-can-now-sign-in-with-govuk-verify');
      done();
    });

    it('should set english language and return a redirect when unrecognised language is requested', (done) => {
      verifyAuthController.getSwitchLanguage(validUnrecognisedLangaugeRequest, genericResponse);
      assert.equal(validUnrecognisedLangaugeRequest.session.lang, 'en-GB');
      assert.equal(genericResponse.address, '/verify/you-can-now-sign-in-with-govuk-verify');
      done();
    });
  });
});
