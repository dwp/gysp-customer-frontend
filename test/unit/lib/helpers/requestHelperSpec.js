const { assert } = require('chai');

const requestHelper = require('../../../../lib/helpers/requestHelper');

describe('Request helper ', () => {
  describe('generatePostCall  ', () => {
    it('should return valid object when url and body is supplied', () => {
      const postCall = requestHelper.generatePostCall('http://url.com/', { value1: 1 });
      assert.equal(postCall.url, 'http://url.com/');
      assert.equal(postCall.json, true);
      assert.equal(postCall.method, 'POST');
      assert.equal(postCall.body.value1, 1);
      assert.isString(postCall.headers['X-B3-TraceId']);
      assert.isString(postCall.headers['X-B3-SpanId']);
      assert.equal(postCall.headers['User-Agent'], 'customer-frontend');
      assert.equal(postCall.headers['Content-Type'], 'application/json');
    });
  });
  describe('Request helper ', () => {
    describe('generateGetCall  ', () => {
      it('should return valid object when url and body is supplied', () => {
        const getCall = requestHelper.generateGetCall('http://url.com/', { value1: 1 });
        assert.equal(getCall.url, 'http://url.com/');
        assert.equal(getCall.json, true);
        assert.equal(getCall.method, undefined);
        assert.equal(getCall.body.value1, 1);
        assert.isString(getCall.headers['X-B3-TraceId']);
        assert.isString(getCall.headers['X-B3-SpanId']);
        assert.equal(getCall.headers['User-Agent'], 'customer-frontend');
        assert.equal(getCall.headers['Content-Type'], 'application/json');
      });
    });
    describe('getHeaders  ', () => {
      it('should return cert details and addtional headers', () => {
        const headers = requestHelper.getHeaders();
        assert.equal(headers['User-Agent'], 'customer-frontend');
        assert.equal(headers['Content-Type'], 'application/json');
        assert.isString(headers['X-B3-TraceId']);
        assert.isString(headers['X-B3-SpanId']);
        assert.equal(headers.rejectUnauthorized, false);
      });
    });
  });
});
