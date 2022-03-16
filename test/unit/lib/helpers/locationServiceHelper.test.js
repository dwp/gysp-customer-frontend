const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const nock = require('nock');
const { StatusCodes } = require('http-status-codes');

nock.disableNetConnect();

const { assert } = chai;
chai.use(chaiAsPromised);

const helper = require('../../../../lib/helpers/addressServiceHelper');

const responseHelper = require('../../../lib/responseHelper');

const validBody = { nameNumber: '1', postcode: 'NE1 1ET' };

const addressServiceUrl = '/api/lookup/address';
const addressServiceUrlQuery = {
  searchString: validBody.nameNumber,
  postcode: validBody.postcode,
  excludeBusiness: true,
  showSourceData: true,
};

let genericResponse = {};

describe('addressServiceHelper', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });
  afterEach(() => {
    nock.cleanAll();
  });

  describe('getPostCodeAddressLookup', () => {
    it(`should reject promise when status code is ${StatusCodes.NOT_FOUND}`, () => {
      nock('http://test-url').get(addressServiceUrl).query(addressServiceUrlQuery).reply(StatusCodes.NOT_FOUND, {});
      return assert.isRejected(helper.getPostCodeAddressLookup(genericResponse, validBody.nameNumber, validBody.postcode, true), Error, 'Response code 404 (Not Found)');
    });

    it(`should return info log message when status code is ${StatusCodes.NOT_FOUND}`, async () => {
      nock('http://test-url').get(addressServiceUrl).query(addressServiceUrlQuery).reply(StatusCodes.NOT_FOUND);
      try {
        await helper.getPostCodeAddressLookup(genericResponse, validBody.nameNumber, validBody.postcode, true);
        return new Error();
      } catch (err) {
        return assert.equal(genericResponse.locals.logMessage, `${StatusCodes.NOT_FOUND} - Response code 404 (Not Found) - Requested on ${addressServiceUrl}?searchString=1&postcode=NE1+1ET&excludeBusiness=true&showSourceData=true`);
      }
    });

    it(`should reject promise when status code is ${StatusCodes.BAD_REQUEST}`, () => {
      nock('http://test-url').get(addressServiceUrl).query(addressServiceUrlQuery).reply(StatusCodes.BAD_REQUEST);
      return assert.isRejected(helper.getPostCodeAddressLookup(genericResponse, validBody.nameNumber, validBody.postcode, true), Error, 'Response code 400 (Bad Request)');
    });

    it(`should return error log message when status code is ${StatusCodes.BAD_REQUEST}`, async () => {
      nock('http://test-url').get(addressServiceUrl).query(addressServiceUrlQuery).reply(StatusCodes.BAD_REQUEST);
      try {
        await helper.getPostCodeAddressLookup(genericResponse, validBody.nameNumber, validBody.postcode, true);
        return new Error();
      } catch (err) {
        return assert.equal(genericResponse.locals.logMessage, `${StatusCodes.BAD_REQUEST} - Response code 400 (Bad Request) - Requested on ${addressServiceUrl}?searchString=1&postcode=NE1+1ET&excludeBusiness=true&showSourceData=true`);
      }
    });

    it(`should reject promise when status code is ${StatusCodes.INTERNAL_SERVER_ERROR}`, () => {
      nock('http://test-url').get(addressServiceUrl).query(addressServiceUrlQuery).reply(StatusCodes.INTERNAL_SERVER_ERROR);
      return assert.isRejected(helper.getPostCodeAddressLookup(genericResponse, validBody.nameNumber, validBody.postcode, true), Error);
    });

    it(`should return error log message when status code is ${StatusCodes.INTERNAL_SERVER_ERROR}`, async () => {
      nock('http://test-url').get(addressServiceUrl).query(addressServiceUrlQuery).reply(StatusCodes.INTERNAL_SERVER_ERROR);
      try {
        await helper.getPostCodeAddressLookup(genericResponse, validBody.nameNumber, validBody.postcode, true);
        return new Error();
      } catch (err) {
        return assert.equal(genericResponse.locals.logMessage, `${StatusCodes.INTERNAL_SERVER_ERROR} - Response code 500 (Internal Server Error) - Requested on ${addressServiceUrl}?searchString=1&postcode=NE1+1ET&excludeBusiness=true&showSourceData=true`);
      }
    });

    it('should reject promise when data does not exist', () => {
      nock('http://test-url').get(addressServiceUrl).query(addressServiceUrlQuery).reply(StatusCodes.OK, {});
      return assert.isRejected(helper.getPostCodeAddressLookup(genericResponse, validBody.nameNumber, validBody.postcode, true), Error, 'Address list not returned from address service');
    });

    it('should resolve promise when 200 and data is present', () => {
      nock('http://test-url').get(addressServiceUrl).query(addressServiceUrlQuery).reply(StatusCodes.OK, { data: [{ foo: 'bar' }] });
      return assert.becomes(helper.getPostCodeAddressLookup(genericResponse, validBody.nameNumber, validBody.postcode, true), { data: [{ foo: 'bar' }] });
    });
  });
});
