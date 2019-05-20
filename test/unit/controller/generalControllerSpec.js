const { assert } = require('chai');

const generalController = require('../../../app/routes/general/functions');
const responseHelper = require('../../lib/responseHelper');

let genericResponse = {};
const emptyRequest = { session: {} };
const validRequest = {
  session: {
    foo: 'bar',
    destroy() {
      delete validRequest.session;
    },
  },
};

describe('General controller ', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe('signOut function (GET /sign-out)', () => {
    it('should destroy session and redirect to start page', (done) => {
      generalController.signOut(validRequest, genericResponse);
      assert.isUndefined(validRequest.session);
      assert.equal(genericResponse.address, 'start-page');
      done();
    });
  });

  describe('cookiesPageGet function (GET /cookie-policy)', () => {
    it('should return cookie page view', (done) => {
      generalController.cookiesPageGet(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/cookies');
      done();
    });
  });

  describe('redirectToStart function (GET /)', () => {
    it('should redirect when called with any response data', (done) => {
      generalController.redirectToStart(emptyRequest, genericResponse);
      assert.equal(genericResponse.address, '/confirm-identity');
      done();
    });
  });
});
