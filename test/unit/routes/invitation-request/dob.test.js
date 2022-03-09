const { assert } = require('chai');
const nock = require('nock');
const mockdate = require('mockdate');
const { StatusCodes } = require('http-status-codes');

nock.disableNetConnect();

const controller = require('../../../../app/routes/request-invitation/dob/functions');
const responseHelper = require('../../../lib/responseHelper');

let genericResponse = {};

const validBody = { dateYear: '1956', dateMonth: '03', dateDay: '04' };
const beforeEqualisationBody = { dateYear: '1953', dateMonth: '10', dateDay: '05' };
const emptyRequest = { session: {} };
const validRequest = { session: {}, body: { ...validBody } };
const validFilterRequest = { session: {}, body: { ...validBody, foo: 'bar' } };
const populatedRequest = { session: { 'request-invitation-dob': { ...validBody } } };

const recalculateSpaDateUrl = '/api/customer/recalculateSpaDate';

const HOME_ADDRESS_URL = 'home-address';
const CANNOT_REQUEST_CODE_URL = 'cannot-request-code';

describe('request invitation dob controller', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  afterEach(() => mockdate.reset());

  describe('get function (GET /request-invitation/date-of-birth)', () => {
    it('should return view without data when session is not populated', () => {
      controller.get(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/request-invitation/dob');
      assert.isUndefined(genericResponse.data.details);
    });

    it('should return view with data when session is populated', () => {
      controller.get(populatedRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/request-invitation/dob');
      assert.deepEqual(genericResponse.data.details, populatedRequest.session['request-invitation-dob']);
    });
  });

  describe('post function (POST /request-invitation/date-of-birth)', () => {
    it('should return view with error when post request is empty', async () => {
      await controller.post(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/request-invitation/dob');
      assert.lengthOf(Object.keys(genericResponse.data.errors), 5);
      assert.isUndefined(genericResponse.data.details);
    });

    it('should save data and redirect to home-address when post request is valid and within 3 month of SPa', async () => {
      mockdate.set(new Date('2022-03-01'));
      const body = { spaDate: 1649656800000 }; // 2022-04-11
      nock('http://test-url').post(recalculateSpaDateUrl).reply(200, body);
      await controller.post(validRequest, genericResponse);
      assert.deepEqual(validRequest.session.newStatePensionDate, { redirectURL: 'home-address', statePensionDate: body.spaDate });
      assert.deepEqual(validRequest.session['request-invitation-dob'], validBody);
      assert.equal(genericResponse.address, 'home-address');
    });

    it('should save data and redirect to home-address when post request is valid with extra data and within 3 month of SPa', async () => {
      mockdate.set(new Date('2022-03-01'));
      const body = { spaDate: 1649656800000 }; // 2022-04-11
      nock('http://test-url').post(recalculateSpaDateUrl).reply(200, body);
      await controller.post(validFilterRequest, genericResponse);
      assert.deepEqual(validFilterRequest.session.newStatePensionDate, { redirectURL: 'home-address', statePensionDate: body.spaDate });
      assert.deepEqual(validFilterRequest.session['request-invitation-dob'], validBody);
      assert.equal(genericResponse.address, 'home-address');
    });

    it('should return error when api returns 404', async () => {
      nock('http://test-url').post(recalculateSpaDateUrl).reply(404);
      await controller.post(validFilterRequest, genericResponse);
      assert.equal(genericResponse.statusCode, StatusCodes.INTERNAL_SERVER_ERROR);
      assert.equal(genericResponse.viewName, 'pages/error');
    });
  });

  describe('getNewStatePensionDate function', () => {
    it('should resolve promise and return home-address url when date is before earliest date supported', async () => {
      mockdate.set(new Date('2022-03-01'));
      const promise = controller.getNewStatePensionDate({ body: beforeEqualisationBody }, genericResponse);
      return assert.eventually.deepEqual(promise, {
        redirectURL: HOME_ADDRESS_URL,
        statePensionDate: null,
      });
    });

    it('should resolve promise and return cannot request url when api returns 200 and spaDate is null', async () => {
      mockdate.set(new Date('2022-03-01'));
      const body = { spaDate: null };
      nock('http://test-url').post(recalculateSpaDateUrl).reply(200, body);
      const promise = controller.getNewStatePensionDate({ body: validBody }, genericResponse);
      return assert.eventually.deepEqual(promise, {
        redirectURL: CANNOT_REQUEST_CODE_URL,
        statePensionDate: null,
      });
    });

    it('should resolve promise and return cannot request url when api returns 200 and spaDate more than 3 month in future', async () => {
      mockdate.set(new Date('2022-01-01'));
      const body = { spaDate: 1649656800000 }; // 2022-04-11
      nock('http://test-url').post(recalculateSpaDateUrl).reply(200, body);
      const promise = controller.getNewStatePensionDate({ body: validBody }, genericResponse);
      return assert.eventually.deepEqual(promise, {
        redirectURL: CANNOT_REQUEST_CODE_URL,
        statePensionDate: body.spaDate,
      });
    });

    it('should resolve promise and return home address url when api returns 200 and spaDate less than 3 month in future', () => {
      mockdate.set(new Date('2022-02-01'));
      const body = { spaDate: 1649656800000 }; // 2022-04-11
      nock('http://test-url').post(recalculateSpaDateUrl).reply(200, body);
      const promise = controller.getNewStatePensionDate({ body: validBody }, genericResponse);
      return assert.eventually.deepEqual(promise, {
        redirectURL: HOME_ADDRESS_URL,
        statePensionDate: body.spaDate,
      });
    });

    it('should reject promise when api returns 404', async () => {
      mockdate.set(new Date('2022-02-01'));
      const body = { spaDate: 1649656800000 }; // 2022-04-11
      nock('http://test-url').post(recalculateSpaDateUrl).reply(404, body);
      try {
        await controller.getNewStatePensionDate({ body: validBody }, genericResponse);
        return new Error();
      } catch (err) {
        return assert.equal(genericResponse.locals.logMessage, '404 - Response code 404 (Not Found) - Requested on /api/customer/recalculateSpaDate');
      }
    });
  });
});
