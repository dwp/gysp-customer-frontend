const AuditEventE0900001 = require('./model/audit-event-E0900001');
const auditEventUtils = require('./audit-event-utils');

const build = (outcome, req) => {
  const { session = {}, headers = {} } = req;
  const claimData = session['claim-data-for-audit'];
  const ip = auditEventUtils.getIpFromRequest(req);
  if (!claimData) {
    throw new Error('Could not build event E0900001. Claim data not present on the session.');
  }
  return new AuditEventE0900001(outcome, 'SELF', ip, undefined,
    { sessionId: session.id, userAgent: headers['user-agent'], claimData });
};

module.exports = {
  build,
};
