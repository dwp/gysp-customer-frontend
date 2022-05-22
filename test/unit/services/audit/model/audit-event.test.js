const { assert } = require('chai');
const AuditEvent = require('../../../../../app/services/audit/model/audit-event');
const AuditEventAttribute = require('../../../../../app/services/audit/model/audit-event-attribute');
const AuditEventAttributeValue = require('../../../../../app/services/audit/model/audit-event-attribute-value');

describe('model: audit-event', () => {
  it('test locationAddress validation null', async () => {
    const auditEvent1 = new AuditEvent(
      'E0900001',
      'SUCCESSFUL_EVENT',
      'USER1',
      null,
      'location name',
      [],
    );
    assert.equal(typeof auditEvent1.locationAddress, 'undefined');
  });

  it('test locationAddress validation below min', async () => {
    const auditEvent1 = new AuditEvent(
      'E0900001',
      'SUCCESSFUL_EVENT',
      'USER1',
      '123456',
      'location name',
      [],
    );
    assert.equal(typeof auditEvent1.locationAddress, 'undefined');
  });

  it('test locationAddress validation above max', async () => {
    const auditEvent1 = new AuditEvent(
      'E0900001',
      'SUCCESSFUL_EVENT',
      'USER1',
      '1234567890123456789012345678901234567890',
      'location name',
      [],
    );
    assert.equal(auditEvent1.locationAddress, '123456789012345678901234567890123456789');
  });

  it('test locationName validation null', async () => {
    const auditEvent1 = new AuditEvent(
      'E0900001',
      'SUCCESSFUL_EVENT',
      'USER1',
      '1234567',
      null,
      [],
    );
    assert.equal(typeof auditEvent1.locationName, 'undefined');
  });

  it('test locationName validation below min', async () => {
    const auditEvent1 = new AuditEvent(
      'E0900001',
      'SUCCESSFUL_EVENT',
      'USER1',
      '1234567',
      '1',
      [],
    );
    assert.equal(typeof auditEvent1.locationName, 'undefined');
  });

  it('test locationName validation above max', async () => {
    const auditEvent1 = new AuditEvent(
      'E0900001',
      'SUCCESSFUL_EVENT',
      'USER1',
      '1234567',
      '12345678901234567890123456789012345678901234567890123456789012345',
      [],
    );
    assert.equal(auditEvent1.locationName, '1234567890123456789012345678901234567890123456789012345678901234');
  });

  it('test getters and setters not covered elsewhere', async () => {
    const auditEvent1 = new AuditEvent(
      'E0900001',
      'SUCCESSFUL_EVENT',
      'USER1',
      '192.0.0.1',
      null,
      [],
    );

    const auditEvent2 = new AuditEvent(
      'E0900001',
      'SUCCESSFUL_EVENT',
      'USER1',
      '192.0.0.1',
      null,
    );
    auditEvent2.setNino('NINO2');
    auditEvent2.setAgentId('AGENT2');
    auditEvent2.setLocationAddress('1234567');
    auditEvent2.setLocationName('LOCNAME2');
    auditEvent2.setOutcome('OUTCOME2');

    const auditEventAttributeValue1 = new AuditEventAttributeValue();
    auditEventAttributeValue1.setType('type1');
    auditEventAttributeValue1.setValue('value1');

    const auditEventAttributeValue2 = new AuditEventAttributeValue('type2');
    auditEventAttributeValue2.setValue('value2');

    const auditEventAttributeValue3 = new AuditEventAttributeValue('type3', 'value2');

    const auditEventAttribute1 = new AuditEventAttribute();
    auditEventAttribute1.setName('name1');
    auditEventAttribute1.setValues([auditEventAttributeValue1]);

    const auditEventAttribute2 = new AuditEventAttribute('name2');
    auditEventAttribute2.setValues([auditEventAttributeValue2]);

    const auditEventAttribute3 = new AuditEventAttribute('name2', [auditEventAttributeValue3]);

    auditEvent1.setAttributes([auditEventAttribute1, auditEventAttribute2, auditEventAttribute3]);

    assert.equal(auditEvent1.getAttributes()[0].getName(), 'name1');
    assert.equal(auditEvent1.getAttributes()[0].getValues().length, 1);

    assert.equal(auditEvent1.getAttributes()[0].getValues()[0].getType(), 'type1');
    assert.equal(auditEvent1.getAttributes()[0].getValues()[0].getValue(), 'value1');

    assert.equal(auditEvent2.getNino(), 'NINO2');
    assert.equal(auditEvent2.getAgentId(), 'AGENT2');
    assert.equal(auditEvent2.getLocationAddress(), '1234567');
    assert.equal(auditEvent2.getLocationName(), 'LOCNAME2');
    assert.equal(auditEvent2.getOutcome(), 'OUTCOME2');
  });
});
