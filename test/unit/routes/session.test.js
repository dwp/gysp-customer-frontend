const { assert } = require('chai');

const controller = require('../../../app/routes/session/functions');
const responseHelper = require('../../lib/responseHelper');

let genericResponse = {};
const emptyRequest = { };
const validRequest = {
  lang: '',
  i18n: {
    changeLanguage: (lang) => {
      validRequest.lang = lang;
    },
  },
  session: {},
  params: { language: 'cy' },
};

describe('Session controller ', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe('getSessionKeepAlive function (GET /session-keep-alive)', () => {
    it('should set status code of 200', (done) => {
      controller.getSessionKeepAlive(emptyRequest, genericResponse);
      assert.equal(genericResponse.statusCode, 200);
      done();
    });
  });

  describe('getSessionTimeout function (GET /session-timeout/:language)', () => {
    it('should return session timeout page view when no :language param present', (done) => {
      controller.getSessionTimeout(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/session-timeout');
      done();
    });

    it('should return redirect when :language param present', (done) => {
      controller.getSessionTimeout(validRequest, genericResponse);
      assert.equal(genericResponse.address, '/session-timeout');
      done();
    });

    it('should set session overseas stub to false when no query string present', (done) => {
      controller.getSessionTimeout(validRequest, genericResponse);
      assert.isFalse(validRequest.session.isOverseasStub);
      done();
    });

    it('should set session overseas stub to false when query string is empty but is false', (done) => {
      const request = { ...validRequest, query: { } };
      controller.getSessionTimeout(request, genericResponse);
      assert.isFalse(validRequest.session.isOverseasStub);
      done();
    });

    it('should set session overseas stub to false when query string is false', (done) => {
      const request = { ...validRequest, query: { 'overseas-stub': 'false' } };
      controller.getSessionTimeout(request, genericResponse);
      assert.isFalse(validRequest.session.isOverseasStub);
      done();
    });

    it('should set session overseas stub to true when query string is true', (done) => {
      const request = { ...validRequest, query: { 'overseas-stub': 'true' } };
      controller.getSessionTimeout(request, genericResponse);
      assert.isTrue(validRequest.session.isOverseasStub);
      done();
    });
  });
});
