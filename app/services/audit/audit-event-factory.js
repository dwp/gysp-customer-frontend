const auditEventBuilderE0900001 = require('./audit-event-builder-E0900001');

const buildAuditEvent = (eventNumber, outcome, req) => {
  let event;
  if (eventNumber === 'E0900001') {
    event = auditEventBuilderE0900001.build(outcome, req);
  } else {
    throw new Error(`Could not build event. (${eventNumber}) not recognised as a valid event number.`);
  }
  return event;
};

module.exports = {
  buildAuditEvent,
};
