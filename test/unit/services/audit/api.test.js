const nock = require('nock');
const { assert } = require('chai');
const httpStatus = require('http-status-codes');
const api = require('../../../../app/services/audit/api');
const config = require('../../../../config/application');

nock.disableNetConnect();

describe('api audit-adapter calls', () => {
  it('success', async () => {
    const auditEvent = {};
    nock(`${config.application.urls.auditGateway}/audit-adapter`).post('/api/v1/E0900001/audits', { json: auditEvent }).reply(httpStatus.ok, null);
    const response = await api.audit('E0900001', { json: auditEvent });
    assert.equal(response.status, httpStatus.ok);
  });

  it('fail ', async () => {
    const auditEvent = {};
    nock(`${config.application.urls.auditGateway}/audit-adapter`).post('/api/v1/E0900001/audits', { json: auditEvent }).reply(httpStatus.CONFLICT, null);
    try {
      await api.audit('E0900001', { json: auditEvent });
    } catch (err) {
      assert.equal(err.response.statusCode, httpStatus.CONFLICT);
    }
  });
});
