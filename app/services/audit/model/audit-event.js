const AuditEventAttribute = require('./audit-event-attribute');
const AuditEventAttributeValue = require('./audit-event-attribute-value');

const ATTRIBUTE_TYPES = require('./attribute-types');

const VALIDATION_CONSTRAINTS = {
  minLocationAddress: 7,
  maxLocationAddress: 39,
  minLocationName: 2,
  maxLocationName: 64,
};

class AuditEvent {
  static getValidationConstraints() {
    return VALIDATION_CONSTRAINTS;
  }

  constructor(eventNumber, outcome, userId, locationAddress, locationName, attributes) {
    this.setEventNumber(eventNumber);
    this.setAgentId(userId);
    this.setOutcome(outcome);
    this.setLocationAddress(locationAddress);
    this.setLocationName(locationName);
    if (attributes) {
      this.setAttributes(attributes);
    }
  }

  addAttributeBeforeAfterPair(attributeName, before, after) {
    if (before || after) {
      if (!this.getAttributes()) {
        this.setAttributes([]);
      }
      const aea = new AuditEventAttribute(attributeName, []);
      if (before) {
        aea.getValues().push(new AuditEventAttributeValue(ATTRIBUTE_TYPES.BEFORE, before));
      }
      if (after) {
        aea.getValues().push(new AuditEventAttributeValue(ATTRIBUTE_TYPES.AFTER, after));
      }
      this.attributes.push(aea);
    }
  }

  setEventNumber(eventNumber) {
    this.eventNumber = eventNumber;
  }

  getEventNumber() {
    return this.eventNumber;
  }

  setNino(nino) {
    this.nino = nino;
  }

  getNino() {
    return this.nino;
  }

  setAgentId(agentId) {
    this.agentId = agentId;
  }

  getAgentId() {
    return this.agentId;
  }

  setLocationAddress(locationAddress) {
    if (locationAddress && locationAddress.length >= AuditEvent.getValidationConstraints().minLocationAddress) {
      if (locationAddress.length > AuditEvent.getValidationConstraints().maxLocationAddress) {
        this.locationAddress = locationAddress.substr(0, AuditEvent.getValidationConstraints().maxLocationAddress);
      } else {
        this.locationAddress = locationAddress;
      }
    } else {
      this.locationAddress = undefined;
    }
  }

  getLocationAddress() {
    return this.locationAddress;
  }

  setLocationName(locationName) {
    if (locationName && locationName.length >= AuditEvent.getValidationConstraints().minLocationName) {
      if (locationName.length > AuditEvent.getValidationConstraints().maxLocationName) {
        this.locationName = locationName.substr(0, AuditEvent.getValidationConstraints().maxLocationName);
      } else {
        this.locationName = locationName;
      }
    } else {
      this.locationName = undefined;
    }
  }

  getLocationName() {
    return this.locationName;
  }

  setOutcome(outcome) {
    this.outcome = outcome;
  }

  getOutcome() {
    return this.outcome;
  }

  setAttributes(attributes) {
    this.attributes = attributes;
  }

  getAttributes() {
    return this.attributes;
  }
}

module.exports = AuditEvent;
