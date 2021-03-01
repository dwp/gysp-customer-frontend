const { assert } = require('chai');
const cookieMessage = require('../../../middleware/cookie-message');
const responseHelper = require('../../lib/responseHelper');

let genericResponse = {};

const app = (req, res, next) => ({
  use(callback) {
    callback(req, res, next);
  },
});

const nextFunction = {
  nextValue: '',
  next() {
    this.nextValue = 'foo';
  },
};

describe('cookie message middleware', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  it('should set all default locales options when no cookies set', () => {
    cookieMessage(app({ cookies: { } }, genericResponse, nextFunction.next), 'test', 'trackingId');
    assert.equal(genericResponse.locals.consentCookieName, 'test');
    assert.equal(genericResponse.locals.gaTrackingId, 'trackingId');
  });

  it('should set consentCookieValue local when cookie is set', () => {
    cookieMessage(app({ cookies: { test: 'foo' } }, genericResponse, nextFunction.next), 'test', 'trackingId');
    assert.equal(genericResponse.locals.consentCookieValue, 'foo');
  });

  it('should set cookieChoiceMade local when session cookieChoiceMade is set', () => {
    const req = { session: { cookieChoiceMade: true }, cookies: { } };
    cookieMessage(app(req, genericResponse, nextFunction.next), 'test', 'trackingId');
    assert.isTrue(genericResponse.locals.cookieChoiceMade);
    assert.isUndefined(req.session.cookieChoiceMade);
  });
});
