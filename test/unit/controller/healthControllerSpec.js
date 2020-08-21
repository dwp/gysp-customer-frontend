const { assert } = require('chai');
const httpStatus = require('http-status-codes');

const controller = require('../../../app/routes/health/functions');

let genericResponse = {};

const emptyRequest = {};

const status = {
  status: 'UP',
};

const contentType = { 'Content-Type': 'application/json' };

describe('Health controller ', () => {
  beforeEach(() => {
    genericResponse = {
      writeHeadStatus: '',
      writeHeadResponse: '',
      endResponse: '',
      writeHead(headStatus, response) {
        this.writeHeadStatus = headStatus;
        this.writeHeadResponse = response;
      },
      end(response) {
        return response;
      },
    };
  });

  describe('endPoint function (GET /health)', () => {
    it('should return json', (done) => {
      const response = controller.endPoint(emptyRequest, genericResponse);
      assert.equal(response, JSON.stringify(status));
      assert.equal(genericResponse.writeHeadStatus, httpStatus.OK);
      assert.equal(JSON.stringify(genericResponse.writeHeadResponse), JSON.stringify(contentType));
      done();
    });
  });
});
