const httpMocks = require('node-mocks-http');
const sinon = require('sinon');
const auditAdapter = require('../../../middleware/auditAdapter');
const auditEventFactory = require('../../../app/services/audit/audit-event-factory');
const api = require('../../../app/services/audit/api');

const log = {
  error: (err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  },
  info: (msg) => {
    // eslint-disable-next-line no-console
    console.log(msg);
  },
};

describe('middleware: auditAdapter.fireEvent', () => {
  afterEach(() => {
    // Unwraps the spy
    auditEventFactory.buildAuditEvent.restore();
    api.audit.restore();
  });

  it('success', async () => {
    const req = httpMocks.createRequest({
      log,
    });
    const res = httpMocks.createResponse({ status: 200 });
    const next = sinon.spy();
    sinon.stub(auditEventFactory, 'buildAuditEvent').returns({});
    sinon.stub(api, 'audit').resolves({});
    await auditAdapter.fireEvent('E0900001', 'SUCCESSFUL_EVENT')(req, res, next);
    sinon.assert.calledOnce(next);
  });

  it('build event fails', async () => {
    const req = httpMocks.createRequest({
      log,
    });
    const res = httpMocks.createResponse({ status: 400 });
    const next = sinon.spy();
    sinon.stub(auditEventFactory, 'buildAuditEvent').throws(new Error('Error'));
    const audit = sinon.spy(api, 'audit');
    await auditAdapter.fireEvent('E0900001', 'SUCCESSFUL_EVENT')(req, res, next);
    sinon.assert.notCalled(audit);
    sinon.assert.calledOnce(next);
  });

  it('api call fails', async () => {
    const req = httpMocks.createRequest({
      log,
    });
    const res = httpMocks.createResponse({ status: 400 });
    const next = sinon.spy();
    sinon.stub(auditEventFactory, 'buildAuditEvent').returns({
      event: {},
    });
    sinon.stub(api, 'audit').rejects(res);
    await auditAdapter.fireEvent('E0900001', 'SUCCESSFUL_EVENT')(req, res, next);
    sinon.assert.calledOnce(next);
  });
});
