const { assert } = require('chai');
const timeout = require('../../../../middleware/session/timeout');
const responseHelper = require('../../../lib/responseHelper');

const timeoutUrls = {
  SESSION_KEEP_ALIVE: '/staying-alive',
  SESSION_ENDED: '/end',
  SESSION_TIMEOUT: '/timeout',
};

const emptyRequest = { session: {} };
const overseasRequest = { session: { isOverseasStub: true } };
const welshRequest = { session: { lang: 'cy-GB' } };
let genericResponse = {};

const nextFunction = {
  nextValue: '',
  next() {
    nextFunction.nextValue = 'called';
  },
};

describe('timeout middleware', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  it('should set timeout dialog object', () => {
    timeout(timeoutUrls, 300, 120)(emptyRequest, genericResponse, nextFunction.next);
    assert.isObject(genericResponse.locals.timeoutDialog, 'test');
    assert.equal(nextFunction.nextValue, 'called');
  });

  it('should set timeout dialog object without overseas stub', () => {
    timeout(timeoutUrls, 300, 120)(emptyRequest, genericResponse, nextFunction.next);
    assert.equal(genericResponse.locals.timeoutDialog.keepAliveUrl, timeoutUrls.SESSION_KEEP_ALIVE);
    assert.equal(genericResponse.locals.timeoutDialog.signOutUrl, timeoutUrls.SESSION_ENDED);
    assert.equal(genericResponse.locals.timeoutDialog.timeoutUrl, `${timeoutUrls.SESSION_TIMEOUT}/en`);
    assert.equal(genericResponse.locals.timeoutDialog.timeout, 300);
    assert.equal(genericResponse.locals.timeoutDialog.countdown, 180);
    assert.equal(nextFunction.nextValue, 'called');
  });

  it('should set timeout dialog object with overseas stub', () => {
    timeout(timeoutUrls, 300, 120)(overseasRequest, genericResponse, nextFunction.next);
    assert.equal(genericResponse.locals.timeoutDialog.timeoutUrl, `${timeoutUrls.SESSION_TIMEOUT}/en?overseas-stub=true`);
    assert.equal(nextFunction.nextValue, 'called');
  });

  it('should set timeout dialog object with welsh', () => {
    timeout(timeoutUrls, 300, 120)(welshRequest, genericResponse, nextFunction.next);
    assert.equal(genericResponse.locals.timeoutDialog.timeoutUrl, `${timeoutUrls.SESSION_TIMEOUT}/cy`);
    assert.equal(nextFunction.nextValue, 'called');
  });
});
