const { assert } = require('chai');
const nock = require('nock');
const { StatusCodes } = require('http-status-codes');

nock.disableNetConnect();

const controller = require('../../../../app/routes/request-invitation/check-details/functions');
const responseHelper = require('../../../lib/responseHelper');

let genericResponse = {};

const emptyRequest = { session: {} };
const validRequest = {
  session: {
    addressLookup: [{
      uprn: '123456',
      singleLine: '1 Test Street, Newcastle, NE1 2RT',
      street: ['Test Street'],
      sourceData: {
        thoroughfare: 'Test Street',
        dependentThoroughfare: null,
      },
    }],
    'request-invitation-name': { firstName: 'Jeff', lastName: 'Banks' },
    'request-invitation-dob': { dateYear: '1956', dateMonth: '5', dateDay: '1' },
    'request-invitation-address-choose': { uprn: '123456' },
  },
};

const requestInvitationUrl = '/api/customer/request-invitation';

describe('request invitation check details controller', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe('get function (GET /request-invitation/check-details)', () => {
    it('should return view without data when session is not populated', () => {
      controller.get(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/request-invitation/check-details');
      assert.isArray(genericResponse.data.details);
    });
  });

  describe('post function (POST /request-invitation/your-name)', () => {
    it(`should save data and redirect when post request is valid and API return ${StatusCodes.CREATED}`, async () => {
      const request = JSON.parse(JSON.stringify(validRequest));
      nock('http://test-url').post(requestInvitationUrl).reply(StatusCodes.CREATED, {});
      await controller.post(request, genericResponse);
      assert.deepEqual(request.session, {
        userHasCompletedInviteRequest: true,
        userHasCompletedInviteRequestRedirectUrl: '/request-invitation-code/code-requested',
      });
      assert.equal(genericResponse.address, '/request-invitation-code/code-requested');
    });

    it(`should clear session and redirect when post request is valid but the API return ${StatusCodes.CONFLICT}`, async () => {
      const request = JSON.parse(JSON.stringify(validRequest));
      nock('http://test-url').post(requestInvitationUrl).reply(StatusCodes.CONFLICT, {});
      await controller.post(request, genericResponse);
      assert.deepEqual(request.session, {
        userHasCompletedInviteRequest: true,
        userHasCompletedInviteRequestRedirectUrl: '/request-invitation-code/cannot-send-code',
      });
      assert.equal(genericResponse.address, '/request-invitation-code/cannot-send-code');
    });

    it(`should clear session and redirect when post request is valid but the API return ${StatusCodes.INTERNAL_SERVER_ERROR}`, async () => {
      const request = JSON.parse(JSON.stringify(validRequest));
      nock('http://test-url').post(requestInvitationUrl).reply(StatusCodes.INTERNAL_SERVER_ERROR, {});
      await controller.post(request, genericResponse);
      assert.deepEqual(request.session, {
        userHasCompletedInviteRequest: true,
        userHasCompletedInviteRequestRedirectUrl: '/request-invitation-code/problem-with-the-service',
      });
      assert.equal(genericResponse.address, '/request-invitation-code/problem-with-the-service');
    });
  });
});
