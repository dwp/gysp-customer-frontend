const auditEventFactory = require('../app/services/audit/audit-event-factory');
const config = require('../config/application');
const api = require('../app/services/audit/api');
const log = require('../config/logging')('customer-frontend', config.application.logs);

const fireEvent = (eventNumber, outcome) => async (req, res, next) => {
  if (config.application.feature.auditFeature) {
    const { errors = {} } = req;
    let eventType = outcome;
    if (!eventType) {
      if (Object.keys(errors).length === 0) {
        eventType = 'SUCCESSFUL_EVENT';
      } else {
        eventType = 'INPUT_SUPPLIED_INVALID';
      }
    }
    try {
      const event = auditEventFactory.buildAuditEvent(eventNumber, eventType, req);
      if (event) {
        if (config.application.feature.auditLocalLogFeature) {
          log.info(`Audit event: ${event.eventNumber} - ${eventType}, ${JSON.stringify(event)}`);
        }
        await api.audit(event.eventNumber, event);
      }
    } catch (err) {
      if (err && err.message) {
        if (err.message.includes('Invalid value will be managed by UI')
          || err.message.includes('Claim has already been submitted')) {
          return next();
        }
      }
      log.error(`Error while recording audit event - ${err}`);
      if (eventNumber !== 'E0900001') {
        return next({ status: 500 });
      }
    }
  }
  return next();
};

module.exports = {
  fireEvent,
};
