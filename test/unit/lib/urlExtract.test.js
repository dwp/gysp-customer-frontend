const { assert } = require('chai');
const domain = require('../../../lib/urlExtract');

describe('url extract', () => {
  describe('extract', () => {
    it('save should equal local host when supplied with http link', () => {
      assert.equal(domain.extract('http://localhost/'), 'localhost');
    });

    it('save should equal local host when supplied with https link', () => {
      assert.equal(domain.extract('https://localhost/'), 'localhost');
    });

    it('save should equal local host when supplied with no http link', () => {
      assert.equal(domain.extract('localhost'), 'localhost');
    });

    it('should return empty string when nothing is passed', () => {
      assert.equal(domain.extract(), undefined);
    });
  });

  describe('extractPath', () => {
    it('should return null when url is undefined', () => {
      const req = { protocol: 'http', get: () => '' };
      assert.isNull(domain.extractPath(req, undefined, '/'));
    });

    it('should return null when url is null', () => {
      const req = { protocol: 'http', get: () => '' };
      assert.isNull(domain.extractPath(req, null, '/'));
    });

    it('should return null when url is blank', () => {
      const req = { protocol: 'http', get: () => '' };
      assert.isNull(domain.extractPath(req, '', '/'));
    });

    it('should return /foo when url is supplied', () => {
      const req = { protocol: 'http', get: () => 'test.url' };
      assert.equal(domain.extractPath(req, 'http://test.url/foo', '/mount-url'), '/foo');
    });
  });
});
