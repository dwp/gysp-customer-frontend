const httpMocks = require('node-mocks-http');
const { assert } = require('chai');
const auditEventUtils = require('../../../../app/services/audit/audit-event-utils');

describe('audit-event-utils: build', () => {
  it('getIpAddressFromRequest: getIpFromRequest, header: x-forwarded-for', async () => {
    const req = httpMocks.createRequest({
      headers: {
        'x-forwarded-for': '192.0.0.1, 192.0.0.2, 192.0.0.3',
      },
    });
    const ip = auditEventUtils.getIpFromRequest(req);
    assert.equal(ip, '192.0.0.1');
  });

  it('getIpAddressFromRequest: getIpFromRequest, req.connection.remoteAddress', async () => {
    const req = httpMocks.createRequest({
      connection: {
        remoteAddress: '192.0.0.4',
      },
    });
    const ip = auditEventUtils.getIpFromRequest(req);
    assert.equal(ip, '192.0.0.4');
  });

  it('getIpAddressFromRequest: getIpFromRequest, req.socket.remoteAddress', async () => {
    const req = httpMocks.createRequest({
      socket: {
        remoteAddress: '192.0.0.5',
      },
    });
    const ip = auditEventUtils.getIpFromRequest(req);
    assert.equal(ip, '192.0.0.5');
  });

  it('getIpAddressFromRequest: getIpFromRequest, req.connection.socket.remoteAddress', async () => {
    const req = httpMocks.createRequest({
      connection: {
        socket: {
          remoteAddress: '192.0.0.6',
        },
      },
    });
    const ip = auditEventUtils.getIpFromRequest(req);
    assert.equal(ip, '192.0.0.6');
  });

  it('getIpAddressFromRequest: getIpFromRequest - failed', async () => {
    const req = httpMocks.createRequest({});
    const ip = auditEventUtils.getIpFromRequest(req);
    assert.equal(ip, null);
  });
});
