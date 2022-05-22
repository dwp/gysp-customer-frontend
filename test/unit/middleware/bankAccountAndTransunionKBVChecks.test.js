const sandbox = require('sinon').createSandbox();
const { assert } = require('chai');
const responseHelper = require('../../lib/responseHelper');
const middleware = require('../../../middleware/bankAccountAndTransunionKBVChecks');

let genericResponse;
const req = (kbvAnswered, accountDetailsEntered, path) => ({
  session: {
    kbvAnswered,
    accountDetailsEntered,
  },
  path,
});

describe('middleware: bankAccountAndTransunionKBVChecks', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when KBV question are answered already (implies account details have been entered already)', () => {
    it('should redirect to "cannot-go-back-to-questions" page for last security question page and context path "/"', () => {
      const nextFnStub = sandbox.stub();
      middleware(req(true, true, '/security-question-3'), genericResponse, nextFnStub);

      assert.equal(genericResponse.address, 'cannot-go-back-to-questions');
      assert.isFalse(nextFnStub.called);
    });

    it('should redirect to "cannot-go-back-to-questions" page for first question page and context path "/customerfrontend"', () => {
      const nextFnStub = sandbox.stub();
      middleware(req(true, true, '/customerfrontend/security-question-1'), genericResponse, nextFnStub);

      assert.equal(genericResponse.address, 'cannot-go-back-to-questions');
      assert.isFalse(nextFnStub.called);
    });

    it('should redirect to "cannot-go-back-to-questions" page when user is trying to access account details page', () => {
      const nextFnStub = sandbox.stub();
      middleware(req(true, true, '/customerfrontend/account-details'), genericResponse, nextFnStub);

      assert.equal(genericResponse.address, 'cannot-go-back-to-questions');
      assert.isFalse(nextFnStub.called);
    });

    it('should NOT redirect when the page accessed is not restricted', () => {
      const nextFnStub = sandbox.stub();
      middleware(req(true, true, '/customerfrontend/check-your-details'), genericResponse, nextFnStub);

      assert.equal(genericResponse.address, '');
      assert.isTrue(nextFnStub.called);
    });
  });

  describe('when account details have been entered already (implies KBV questions have not been answered yet)', () => {
    it('should redirect to "cannot-go-back" page when user tries to access account-details page', () => {
      const nextFnStub = sandbox.stub();
      middleware(req(false, true, '/customerfrontend/account-details'), genericResponse, nextFnStub);

      assert.equal(genericResponse.address, 'cannot-go-back');
      assert.isFalse(nextFnStub.called);
    });

    it('should redirect to "cannot-go-back" page when user tries to access account-details-overseas page', () => {
      const nextFnStub = sandbox.stub();
      middleware(req(false, true, '/customerfrontend/account-details-overseas'), genericResponse, nextFnStub);

      assert.equal(genericResponse.address, 'cannot-go-back');
      assert.isFalse(nextFnStub.called);
    });

    it('should NOT redirect when the page accessed is restricted but not completed (security questions in KBV)', () => {
      const nextFnStub = sandbox.stub();
      middleware(req(false, true, '/customerfrontend/security-question-1'), genericResponse, nextFnStub);

      assert.equal(genericResponse.address, '');
      assert.isTrue(nextFnStub.called);
    });
  });
});
