const { assert } = require('chai');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../config/i18next');

const controller = require('../../../app/routes/cookies/functions');
const responseHelper = require('../../lib/responseHelper');

let genericResponse = {};

const emptyCookieRequest = { headers: { referer: undefined }, cookies: { }, session: {} };
const cookieRequest = { headers: { referer: undefined }, cookies: { foo: 'bar' }, session: {} };
const cookieRequestWithReferer = {
  headers: { referer: 'http://test.com/foo' }, cookies: { foo: 'bar' }, session: {}, protocol: 'http', get: () => 'test.com',
};

const headers = { headers: { cookie: '_gat=test,_ga=test,-gid=test', referer: 'http://test.com/foo' } };
const cookieEmptyPostRequest = {
  headers: { referer: 'http://test.com/foo' }, cookies: { foo: 'bar' }, session: {}, body: { },
};
const cookieValidYesPostRequest = {
  ...headers,
  cookies: { foo: 'bar' },
  session: {},
  body: { cookieConsent: 'yes' },
};

const cookieValidNoPostRequest = {
  ...headers,
  cookies: { foo: 'bar' },
  session: {},
  body: { cookieConsent: 'no' },
};

describe('cookie controller', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe('getCookiePage function (GET /cookie-policy)', () => {
    it('should return cookie page view with cookies empty', (done) => {
      controller.getCookiePage(emptyCookieRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/cookies');
      assert.isUndefined(genericResponse.data.details.cookieConsent);
      done();
    });

    it('should return cookie page view with cookies', (done) => {
      genericResponse.locals.consentCookieName = 'foo';
      controller.getCookiePage(cookieRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/cookies');
      assert.equal(genericResponse.data.details.cookieConsent, 'bar');
      done();
    });

    it('should return cookie page with cookieBackUrl is null ', (done) => {
      controller.getCookiePage(cookieRequest, genericResponse);
      assert.isNull(cookieRequest.session.cookieBackUrl);
      done();
    });

    it('should return cookie page with cookieBackUrl as /foo ', (done) => {
      controller.getCookiePage(cookieRequestWithReferer, genericResponse);
      assert.equal(cookieRequestWithReferer.session.cookieBackUrl, '/foo');
      done();
    });
  });

  describe('postCookiePage function (POST /cookie-policy)', () => {
    beforeEach(() => {
      genericResponse.locals.consentCookieName = 'foo';
    });

    it('should return default view name when called with empty object', (done) => {
      controller.postCookiePage(cookieEmptyPostRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/cookies');
      assert.equal(genericResponse.data.errors.cookieConsent.text, 'Select Yes if we can use cookies to help us improve the service.');
      assert.equal(genericResponse.data.errors.errorSummary.length, 1);
      done();
    });

    it('should return redirect when called with valid yes object without back url', (done) => {
      controller.postCookiePage(cookieValidYesPostRequest, genericResponse);
      assert.equal(genericResponse.address, 'cookie-policy');
      done();
    });

    it('should return redirect when called with valid no object without back url', (done) => {
      controller.postCookiePage(cookieValidNoPostRequest, genericResponse);
      assert.equal(genericResponse.address, 'cookie-policy');
      done();
    });

    it('should return redirect when called with valid yes object with back url', (done) => {
      const request = { ...JSON.parse(JSON.stringify(cookieValidYesPostRequest)), session: { cookieBackUrl: '/back-url' } };
      controller.postCookiePage(request, genericResponse);
      assert.equal(genericResponse.address, '/back-url');
      done();
    });

    it('should return redirect when called with valid no object with back url', (done) => {
      const request = { ...JSON.parse(JSON.stringify(cookieValidNoPostRequest)), session: { cookieBackUrl: '/back-url' } };
      controller.postCookiePage(request, genericResponse);
      assert.equal(genericResponse.address, '/back-url');
      done();
    });

    it('should set cookie when called with valid object', (done) => {
      controller.postCookiePage(cookieValidYesPostRequest, genericResponse);
      assert.equal(genericResponse.cookieData.name, 'foo');
      assert.equal(genericResponse.cookieData.value, 'yes');
      assert.deepEqual(genericResponse.cookieData.options, {
        path: '/',
        maxAge: 31536000000,
        httpOnly: true,
        sameSite: 'Strict',
        secure: false,
      });
      done();
    });

    it('should set session data when cookie choice has been made', (done) => {
      controller.postCookiePage(cookieValidYesPostRequest, genericResponse);
      assert.isTrue(cookieValidYesPostRequest.session.cookieChoiceMade);
      done();
    });

    it('should remove ga cookies if consent is no', (done) => {
      controller.postCookiePage(cookieValidNoPostRequest, genericResponse);
      assert.deepEqual(genericResponse.clearCookieData[0], { name: '_gat', options: { path: '/' } });
      assert.deepEqual(genericResponse.clearCookieData[1], { name: '_ga', options: { path: '/' } });
      assert.deepEqual(genericResponse.clearCookieData[2], { name: '_gid', options: { path: '/' } });
      done();
    });

    it('should remove ga _gat cookies with dynamic name if consent is no', (done) => {
      cookieValidNoPostRequest.headers.cookie = 'test=test; _gat_UA-1234567-1=1;';
      controller.postCookiePage(cookieValidNoPostRequest, genericResponse);
      assert.deepEqual(genericResponse.clearCookieData[0], { name: '_gat_UA-1234567-1', options: { path: '/' } });
      done();
    });
  });
});
