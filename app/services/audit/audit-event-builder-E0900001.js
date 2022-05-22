const AuditEventE0900001 = require('./model/audit-event-E0900001');
const auditEventUtils = require('./audit-event-utils');

const build = (outcome, req) => {
  const { session = {}, headers = {} } = req;
  const claimData = session['claim-data-for-audit'];
  const ip = auditEventUtils.getIpFromRequest(req);
  if (!claimData) {
    throw new Error('Could not build event E0900001. Claim data not present on the session.');
  } else if (claimData === 'SUBMITTED') {
    throw new Error('Could not build event E0900001. Claim has already been submitted.');
  }
  return new AuditEventE0900001(
    outcome,
    'CITIZEN',
    ip,
    undefined,
    { sessionId: session.id, userAgent: headers['user-agent'], claimData },
  );
};

module.exports = {
  build,
};
