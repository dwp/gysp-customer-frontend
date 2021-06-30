const httpMocks = require('node-mocks-http');
const { assert, fail } = require('chai');
const sinon = require('sinon');
const auditEventUtils = require('../../../../app/services/audit/audit-event-utils');
const auditEventBuilderE0900001 = require('../../../../app/services/audit/audit-event-builder-E0900001');

const ATTRIB_BROWSER_TYPE = 'Browser Type';
const ATTRIB_SESSION_ID = 'Session ID';
const ATTRIB_INVITE_KEY = 'Invite Key';
const ATTRIB_CLAIM_FROM_DATE = 'Claim from date';
const ATTRIB_LIVED_OUTSIDE_UK = 'Lived outside UK Country details';
const ATTRIB_WORKED_OUTSIDE_UK = 'Worked outside UK Country details';
const ATTRIB_MARITAL_STATUS = 'Marital Status';
const ATTRIB_MARITAL_STATUS_DATE = 'Marital Status Date';
const ATTRIB_SPOUSE_FIRST_NAME = 'Spouse/Partner first name';
const ATTRIB_SPOUSE_LAST_NAME = 'Spouse/Partner last name';
const ATTRIB_SPOUSE_OTHER_NAMES = 'Spouse/Partner any other name';
const ATTRIB_SPOUSE_DOB = 'Spouse/Partner DoB';
const ATTRIB_MOBILE_TEL = 'Mobile Number';
const ATTRIB_WORK_TEL = 'Work Number';
const ATTRIB_HOME_TEL = 'Home Number';
const ATTRIB_EMAIL = 'Email Address';
const ATTRIB_ACC_HOLDER_NAME = 'Account Holder Name';
const ATTRIB_ACC_SORT_CODE = 'Account Sort Code';
const ATTRIB_ACC_NUMBER = 'Account Number';
const ATTRIB_BS_REF = 'Building Society Roll/Reference';

const ATTRIB_TYPE_REF_DATA = 'REFERENCE_DATA';
const ATTRIB_TYPE_AFTER_DATA = 'AFTER';
const URL_COMPLETE = '/complete';

const EMAIL_ADDRESS = 'me@here.com';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.79';
const SESSION_ID = 'sessionid';

describe('audit-event-builder-E0900001: build', () => {
  afterEach(() => {
    // Unwraps the spy
    auditEventUtils.getIpFromRequest.restore();
  });

  it('success - 1. Claim from date is spa', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: URL_COMPLETE,
      headers: {
        'user-agent': USER_AGENT,
      },
      session: {
        id: SESSION_ID,
        // eslint-disable-next-line no-use-before-define
        'claim-data-for-audit': claimData1,
      },
    });
    sinon.stub(auditEventUtils, 'getIpFromRequest').returns('127.1.2.3');
    const auditEvent = auditEventBuilderE0900001.build('SUCCESSFUL_EVENT', req);
    assert.equal(auditEvent.getNino(), 'AA111134A');
    assert.equal(auditEvent.getAgentId(), 'CITIZEN');
    assert.equal(auditEvent.getOutcome(), 'SUCCESSFUL_EVENT');
    assert.equal(auditEvent.getLocationAddress(), '127.1.2.3');
    assert.isUndefined(auditEvent.getLocationName());
    const [browserType, sessionId, inviteKey, claimFromDate, homeTelNo, mobileTelNo, workTelNo, email,
      accountHolder, accountSortCode, accountNumber] = auditEvent.getAttributes();
    assert.equal(browserType.name, ATTRIB_BROWSER_TYPE);
    assert.equal(browserType.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(browserType.values[0].value, USER_AGENT);
    assert.equal(sessionId.name, ATTRIB_SESSION_ID);
    assert.equal(sessionId.values[0].type, ATTRIB_TYPE_REF_DATA);
    assert.equal(sessionId.values[0].value, SESSION_ID);
    assert.equal(inviteKey.name, ATTRIB_INVITE_KEY);
    assert.equal(inviteKey.values[0].type, ATTRIB_TYPE_REF_DATA);
    assert.equal(inviteKey.values[0].value, 'FOR3P6FW6R');
    assert.equal(claimFromDate.name, ATTRIB_CLAIM_FROM_DATE);
    assert.equal(claimFromDate.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(claimFromDate.values[0].value, '01/08/2021');
    assert.equal(homeTelNo.name, ATTRIB_HOME_TEL);
    assert.equal(homeTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(homeTelNo.values[0].value, '0191 4890000');
    assert.equal(mobileTelNo.name, ATTRIB_MOBILE_TEL);
    assert.equal(mobileTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(mobileTelNo.values[0].value, '07779000000');
    assert.equal(workTelNo.name, ATTRIB_WORK_TEL);
    assert.equal(workTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(workTelNo.values[0].value, '0111000000');
    assert.equal(email.name, ATTRIB_EMAIL);
    assert.equal(email.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(email.values[0].value, EMAIL_ADDRESS);
    assert.equal(accountHolder.name, ATTRIB_ACC_HOLDER_NAME);
    assert.equal(accountHolder.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountHolder.values[0].value, 'Mr M Ford');
    assert.equal(accountSortCode.name, ATTRIB_ACC_SORT_CODE);
    assert.equal(accountSortCode.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountSortCode.values[0].value, '000000');
    assert.equal(accountNumber.name, ATTRIB_ACC_NUMBER);
    assert.equal(accountNumber.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountNumber.values[0].value, '12345678');
  });

  it('success - 2. Claim from date is NOT spa / Building Society', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: URL_COMPLETE,
      headers: {
        'user-agent': USER_AGENT,
      },
      session: {
        id: SESSION_ID,
        // eslint-disable-next-line no-use-before-define
        'claim-data-for-audit': claimData2,
      },
    });
    sinon.stub(auditEventUtils, 'getIpFromRequest').returns('127.1.2.3');
    const auditEvent = auditEventBuilderE0900001.build('SUCCESSFUL_EVENT', req);
    assert.equal(auditEvent.getNino(), 'AA111134A');
    assert.equal(auditEvent.getAgentId(), 'CITIZEN');
    assert.equal(auditEvent.getOutcome(), 'SUCCESSFUL_EVENT');
    assert.equal(auditEvent.getLocationAddress(), '127.1.2.3');
    assert.isUndefined(auditEvent.getLocationName());
    const [browserType, sessionId, inviteKey, claimFromDate, homeTelNo, mobileTelNo, workTelNo, email,
      accountHolder, accountSortCode, accountNumber, accountRef] = auditEvent.getAttributes();
    assert.equal(browserType.name, ATTRIB_BROWSER_TYPE);
    assert.equal(browserType.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(browserType.values[0].value, USER_AGENT);
    assert.equal(sessionId.name, ATTRIB_SESSION_ID);
    assert.equal(sessionId.values[0].type, ATTRIB_TYPE_REF_DATA);
    assert.equal(sessionId.values[0].value, SESSION_ID);
    assert.equal(inviteKey.name, ATTRIB_INVITE_KEY);
    assert.equal(inviteKey.values[0].type, ATTRIB_TYPE_REF_DATA);
    assert.equal(inviteKey.values[0].value, 'FOR3P6FW6R');
    assert.equal(claimFromDate.name, ATTRIB_CLAIM_FROM_DATE);
    assert.equal(claimFromDate.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(claimFromDate.values[0].value, '01/09/2021');
    assert.equal(homeTelNo.name, ATTRIB_HOME_TEL);
    assert.equal(homeTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(homeTelNo.values[0].value, '0191 4890000');
    assert.equal(mobileTelNo.name, ATTRIB_MOBILE_TEL);
    assert.equal(mobileTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(mobileTelNo.values[0].value, '07779000000');
    assert.equal(workTelNo.name, ATTRIB_WORK_TEL);
    assert.equal(workTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(workTelNo.values[0].value, '0111000000');
    assert.equal(email.name, ATTRIB_EMAIL);
    assert.equal(email.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(email.values[0].value, EMAIL_ADDRESS);
    assert.equal(accountHolder.name, ATTRIB_ACC_HOLDER_NAME);
    assert.equal(accountHolder.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountHolder.values[0].value, 'Mr M Ford');
    assert.equal(accountSortCode.name, ATTRIB_ACC_SORT_CODE);
    assert.equal(accountSortCode.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountSortCode.values[0].value, '000000');
    assert.equal(accountNumber.name, ATTRIB_ACC_NUMBER);
    assert.equal(accountNumber.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountNumber.values[0].value, '12345678');
    assert.equal(accountRef.name, ATTRIB_BS_REF);
    assert.equal(accountRef.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountRef.values[0].value, 'bsref1');
  });

  it('success - 3a. Married', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: URL_COMPLETE,
      headers: {
        'user-agent': USER_AGENT,
      },
      session: {
        id: SESSION_ID,
        // eslint-disable-next-line no-use-before-define
        'claim-data-for-audit': claimData3a,
      },
    });
    sinon.stub(auditEventUtils, 'getIpFromRequest').returns('127.1.2.3');
    const auditEvent = auditEventBuilderE0900001.build('SUCCESSFUL_EVENT', req);
    assert.equal(auditEvent.getNino(), 'AA111134A');
    assert.equal(auditEvent.getAgentId(), 'CITIZEN');
    assert.equal(auditEvent.getOutcome(), 'SUCCESSFUL_EVENT');
    assert.equal(auditEvent.getLocationAddress(), '127.1.2.3');
    assert.isUndefined(auditEvent.getLocationName());
    const [browserType, sessionId, inviteKey, claimFromDate, maritalStatus, maritalStatusDate, spouseFirstName, spouseLastName,
      spouseOtherNames, spouseDob, homeTelNo, mobileTelNo, workTelNo, email, accountHolder, accountSortCode,
      accountNumber] = auditEvent.getAttributes();
    assert.equal(browserType.name, ATTRIB_BROWSER_TYPE);
    assert.equal(browserType.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(browserType.values[0].value, USER_AGENT);
    assert.equal(sessionId.name, ATTRIB_SESSION_ID);
    assert.equal(sessionId.values[0].type, ATTRIB_TYPE_REF_DATA);
    assert.equal(sessionId.values[0].value, SESSION_ID);
    assert.equal(inviteKey.name, ATTRIB_INVITE_KEY);
    assert.equal(inviteKey.values[0].type, ATTRIB_TYPE_REF_DATA);
    assert.equal(inviteKey.values[0].value, 'FOR3P6FW6R');
    assert.equal(claimFromDate.name, ATTRIB_CLAIM_FROM_DATE);
    assert.equal(claimFromDate.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(claimFromDate.values[0].value, '01/08/2021');
    assert.equal(maritalStatus.name, ATTRIB_MARITAL_STATUS);
    assert.equal(maritalStatus.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(maritalStatus.values[0].value, 'Married');
    assert.equal(maritalStatusDate.name, ATTRIB_MARITAL_STATUS_DATE);
    assert.equal(maritalStatusDate.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(maritalStatusDate.values[0].value, '01/02/2003');
    assert.equal(spouseFirstName.name, ATTRIB_SPOUSE_FIRST_NAME);
    assert.equal(spouseFirstName.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(spouseFirstName.values[0].value, 'Jacca');
    assert.equal(spouseLastName.name, ATTRIB_SPOUSE_LAST_NAME);
    assert.equal(spouseLastName.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(spouseLastName.values[0].value, 'Ford');
    assert.equal(spouseOtherNames.name, ATTRIB_SPOUSE_OTHER_NAMES);
    assert.equal(spouseOtherNames.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(spouseOtherNames.values[0].value, 'Midname');
    assert.equal(spouseDob.name, ATTRIB_SPOUSE_DOB);
    assert.equal(spouseDob.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(spouseDob.values[0].value, '01/03/1956');
    assert.equal(homeTelNo.name, ATTRIB_HOME_TEL);
    assert.equal(homeTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(homeTelNo.values[0].value, '0191 4890000');
    assert.equal(mobileTelNo.name, ATTRIB_MOBILE_TEL);
    assert.equal(mobileTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(mobileTelNo.values[0].value, '07779000000');
    assert.equal(workTelNo.name, ATTRIB_WORK_TEL);
    assert.equal(workTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(workTelNo.values[0].value, '0111000000');
    assert.equal(email.name, ATTRIB_EMAIL);
    assert.equal(email.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(email.values[0].value, EMAIL_ADDRESS);
    assert.equal(accountHolder.name, ATTRIB_ACC_HOLDER_NAME);
    assert.equal(accountHolder.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountHolder.values[0].value, 'Mr M Ford');
    assert.equal(accountSortCode.name, ATTRIB_ACC_SORT_CODE);
    assert.equal(accountSortCode.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountSortCode.values[0].value, '000000');
    assert.equal(accountNumber.name, ATTRIB_ACC_NUMBER);
    assert.equal(accountNumber.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountNumber.values[0].value, '12345678');
  });

  it('success - 3b. Civil partnership', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: URL_COMPLETE,
      headers: {
        'user-agent': USER_AGENT,
      },
      session: {
        id: SESSION_ID,
        // eslint-disable-next-line no-use-before-define
        'claim-data-for-audit': claimData3b,
      },
    });
    sinon.stub(auditEventUtils, 'getIpFromRequest').returns('127.1.2.3');
    const auditEvent = auditEventBuilderE0900001.build('SUCCESSFUL_EVENT', req);
    assert.equal(auditEvent.getNino(), 'AA111134A');
    assert.equal(auditEvent.getAgentId(), 'CITIZEN');
    assert.equal(auditEvent.getOutcome(), 'SUCCESSFUL_EVENT');
    assert.equal(auditEvent.getLocationAddress(), '127.1.2.3');
    assert.isUndefined(auditEvent.getLocationName());
    const [browserType, sessionId, inviteKey, claimFromDate, maritalStatus, maritalStatusDate, spouseFirstName, spouseLastName,
      spouseOtherNames, spouseDob, homeTelNo, mobileTelNo, workTelNo, email, accountHolder, accountSortCode,
      accountNumber] = auditEvent.getAttributes();
    assert.equal(browserType.name, ATTRIB_BROWSER_TYPE);
    assert.equal(browserType.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(browserType.values[0].value, USER_AGENT);
    assert.equal(sessionId.name, ATTRIB_SESSION_ID);
    assert.equal(sessionId.values[0].type, ATTRIB_TYPE_REF_DATA);
    assert.equal(sessionId.values[0].value, SESSION_ID);
    assert.equal(inviteKey.name, ATTRIB_INVITE_KEY);
    assert.equal(inviteKey.values[0].type, ATTRIB_TYPE_REF_DATA);
    assert.equal(inviteKey.values[0].value, 'FOR3P6FW6R');
    assert.equal(claimFromDate.name, ATTRIB_CLAIM_FROM_DATE);
    assert.equal(claimFromDate.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(claimFromDate.values[0].value, '01/08/2021');
    assert.equal(maritalStatus.name, ATTRIB_MARITAL_STATUS);
    assert.equal(maritalStatus.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(maritalStatus.values[0].value, 'Civil Partnership');
    assert.equal(maritalStatusDate.name, ATTRIB_MARITAL_STATUS_DATE);
    assert.equal(maritalStatusDate.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(maritalStatusDate.values[0].value, '01/03/2006');
    assert.equal(spouseFirstName.name, ATTRIB_SPOUSE_FIRST_NAME);
    assert.equal(spouseFirstName.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(spouseFirstName.values[0].value, 'Jacca');
    assert.equal(spouseLastName.name, ATTRIB_SPOUSE_LAST_NAME);
    assert.equal(spouseLastName.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(spouseLastName.values[0].value, 'Ford');
    assert.equal(spouseOtherNames.name, ATTRIB_SPOUSE_OTHER_NAMES);
    assert.equal(spouseOtherNames.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(spouseOtherNames.values[0].value, 'Scullion');
    assert.equal(spouseDob.name, ATTRIB_SPOUSE_DOB);
    assert.equal(spouseDob.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(spouseDob.values[0].value, '02/03/1956');
    assert.equal(homeTelNo.name, ATTRIB_HOME_TEL);
    assert.equal(homeTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(homeTelNo.values[0].value, '0191 4890000');
    assert.equal(mobileTelNo.name, ATTRIB_MOBILE_TEL);
    assert.equal(mobileTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(mobileTelNo.values[0].value, '07779000000');
    assert.equal(workTelNo.name, ATTRIB_WORK_TEL);
    assert.equal(workTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(workTelNo.values[0].value, '0111000000');
    assert.equal(email.name, ATTRIB_EMAIL);
    assert.equal(email.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(email.values[0].value, EMAIL_ADDRESS);
    assert.equal(accountHolder.name, ATTRIB_ACC_HOLDER_NAME);
    assert.equal(accountHolder.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountHolder.values[0].value, 'Mr M Ford');
    assert.equal(accountSortCode.name, ATTRIB_ACC_SORT_CODE);
    assert.equal(accountSortCode.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountSortCode.values[0].value, '000000');
    assert.equal(accountNumber.name, ATTRIB_ACC_NUMBER);
    assert.equal(accountNumber.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountNumber.values[0].value, '12345678');
  });

  it('success - 3c. Widowed', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: URL_COMPLETE,
      headers: {
        'user-agent': USER_AGENT,
      },
      session: {
        id: SESSION_ID,
        // eslint-disable-next-line no-use-before-define
        'claim-data-for-audit': claimData3c,
      },
    });
    sinon.stub(auditEventUtils, 'getIpFromRequest').returns('127.1.2.3');
    const auditEvent = auditEventBuilderE0900001.build('SUCCESSFUL_EVENT', req);
    assert.equal(auditEvent.getNino(), 'AA111134A');
    assert.equal(auditEvent.getAgentId(), 'CITIZEN');
    assert.equal(auditEvent.getOutcome(), 'SUCCESSFUL_EVENT');
    assert.equal(auditEvent.getLocationAddress(), '127.1.2.3');
    assert.isUndefined(auditEvent.getLocationName());
    const [browserType, sessionId, inviteKey, claimFromDate, maritalStatus, maritalStatusDate, spouseFirstName, spouseLastName,
      mobileTelNo, email, accountHolder, accountSortCode,
      accountNumber] = auditEvent.getAttributes();
    assert.equal(browserType.name, ATTRIB_BROWSER_TYPE);
    assert.equal(browserType.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(browserType.values[0].value, USER_AGENT);
    assert.equal(sessionId.name, ATTRIB_SESSION_ID);
    assert.equal(sessionId.values[0].type, ATTRIB_TYPE_REF_DATA);
    assert.equal(sessionId.values[0].value, SESSION_ID);
    assert.equal(inviteKey.name, ATTRIB_INVITE_KEY);
    assert.equal(inviteKey.values[0].type, ATTRIB_TYPE_REF_DATA);
    assert.equal(inviteKey.values[0].value, 'FOR3P6FW6R');
    assert.equal(claimFromDate.name, ATTRIB_CLAIM_FROM_DATE);
    assert.equal(claimFromDate.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(claimFromDate.values[0].value, '01/08/2021');
    assert.equal(maritalStatus.name, ATTRIB_MARITAL_STATUS);
    assert.equal(maritalStatus.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(maritalStatus.values[0].value, 'Widowed');
    assert.equal(maritalStatusDate.name, ATTRIB_MARITAL_STATUS_DATE);
    assert.equal(maritalStatusDate.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(maritalStatusDate.values[0].value, '12/10/1999');
    assert.equal(spouseFirstName.name, ATTRIB_SPOUSE_FIRST_NAME);
    assert.equal(spouseFirstName.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(spouseFirstName.values[0].value, 'Jacca');
    assert.equal(spouseLastName.name, ATTRIB_SPOUSE_LAST_NAME);
    assert.equal(spouseLastName.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(spouseLastName.values[0].value, 'Ford');
    assert.equal(mobileTelNo.name, ATTRIB_MOBILE_TEL);
    assert.equal(mobileTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(mobileTelNo.values[0].value, '07779000000');
    assert.equal(email.name, ATTRIB_EMAIL);
    assert.equal(email.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(email.values[0].value, EMAIL_ADDRESS);
    assert.equal(accountHolder.name, ATTRIB_ACC_HOLDER_NAME);
    assert.equal(accountHolder.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountHolder.values[0].value, 'Mr M Ford');
    assert.equal(accountSortCode.name, ATTRIB_ACC_SORT_CODE);
    assert.equal(accountSortCode.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountSortCode.values[0].value, '000000');
    assert.equal(accountNumber.name, ATTRIB_ACC_NUMBER);
    assert.equal(accountNumber.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountNumber.values[0].value, '12345678');
  });

  it('success - 3d. Divorced', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: URL_COMPLETE,
      headers: {
        'user-agent': USER_AGENT,
      },
      session: {
        id: SESSION_ID,
        // eslint-disable-next-line no-use-before-define
        'claim-data-for-audit': claimData3d,
      },
    });
    sinon.stub(auditEventUtils, 'getIpFromRequest').returns('127.1.2.3');
    const auditEvent = auditEventBuilderE0900001.build('SUCCESSFUL_EVENT', req);
    assert.equal(auditEvent.getNino(), 'AA111134A');
    assert.equal(auditEvent.getAgentId(), 'CITIZEN');
    assert.equal(auditEvent.getOutcome(), 'SUCCESSFUL_EVENT');
    assert.equal(auditEvent.getLocationAddress(), '127.1.2.3');
    assert.isUndefined(auditEvent.getLocationName());
    const [browserType, sessionId, inviteKey, claimFromDate, maritalStatus, maritalStatusDate, spouseFirstName, spouseLastName,
      mobileTelNo, email, accountHolder, accountSortCode,
      accountNumber] = auditEvent.getAttributes();
    assert.equal(browserType.name, ATTRIB_BROWSER_TYPE);
    assert.equal(browserType.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(browserType.values[0].value, USER_AGENT);
    assert.equal(sessionId.name, ATTRIB_SESSION_ID);
    assert.equal(sessionId.values[0].type, ATTRIB_TYPE_REF_DATA);
    assert.equal(sessionId.values[0].value, SESSION_ID);
    assert.equal(inviteKey.name, ATTRIB_INVITE_KEY);
    assert.equal(inviteKey.values[0].type, ATTRIB_TYPE_REF_DATA);
    assert.equal(inviteKey.values[0].value, 'FOR3P6FW6R');
    assert.equal(claimFromDate.name, ATTRIB_CLAIM_FROM_DATE);
    assert.equal(claimFromDate.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(claimFromDate.values[0].value, '01/08/2021');
    assert.equal(maritalStatus.name, ATTRIB_MARITAL_STATUS);
    assert.equal(maritalStatus.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(maritalStatus.values[0].value, 'Divorced');
    assert.equal(maritalStatusDate.name, ATTRIB_MARITAL_STATUS_DATE);
    assert.equal(maritalStatusDate.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(maritalStatusDate.values[0].value, '11/12/1998');
    assert.equal(spouseFirstName.name, ATTRIB_SPOUSE_FIRST_NAME);
    assert.equal(spouseFirstName.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(spouseFirstName.values[0].value, 'Jacca');
    assert.equal(spouseLastName.name, ATTRIB_SPOUSE_LAST_NAME);
    assert.equal(spouseLastName.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(spouseLastName.values[0].value, 'Ford');
    assert.equal(mobileTelNo.name, ATTRIB_MOBILE_TEL);
    assert.equal(mobileTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(mobileTelNo.values[0].value, '07779000000');
    assert.equal(email.name, ATTRIB_EMAIL);
    assert.equal(email.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(email.values[0].value, EMAIL_ADDRESS);
    assert.equal(accountHolder.name, ATTRIB_ACC_HOLDER_NAME);
    assert.equal(accountHolder.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountHolder.values[0].value, 'Mr M Ford');
    assert.equal(accountSortCode.name, ATTRIB_ACC_SORT_CODE);
    assert.equal(accountSortCode.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountSortCode.values[0].value, '000000');
    assert.equal(accountNumber.name, ATTRIB_ACC_NUMBER);
    assert.equal(accountNumber.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountNumber.values[0].value, '12345678');
  });

  it('success - 3d. Dissolved', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: URL_COMPLETE,
      headers: {
        'user-agent': USER_AGENT,
      },
      session: {
        id: SESSION_ID,
        // eslint-disable-next-line no-use-before-define
        'claim-data-for-audit': claimData3e,
      },
    });
    sinon.stub(auditEventUtils, 'getIpFromRequest').returns('127.1.2.3');
    const auditEvent = auditEventBuilderE0900001.build('SUCCESSFUL_EVENT', req);
    assert.equal(auditEvent.getNino(), 'AA111134A');
    assert.equal(auditEvent.getAgentId(), 'CITIZEN');
    assert.equal(auditEvent.getOutcome(), 'SUCCESSFUL_EVENT');
    assert.equal(auditEvent.getLocationAddress(), '127.1.2.3');
    assert.isUndefined(auditEvent.getLocationName());
    const [browserType, sessionId, inviteKey, claimFromDate, maritalStatus, maritalStatusDate, spouseFirstName, spouseLastName,
      mobileTelNo, email, accountHolder, accountSortCode,
      accountNumber] = auditEvent.getAttributes();
    assert.equal(browserType.name, ATTRIB_BROWSER_TYPE);
    assert.equal(browserType.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(browserType.values[0].value, USER_AGENT);
    assert.equal(sessionId.name, ATTRIB_SESSION_ID);
    assert.equal(sessionId.values[0].type, ATTRIB_TYPE_REF_DATA);
    assert.equal(sessionId.values[0].value, SESSION_ID);
    assert.equal(inviteKey.name, ATTRIB_INVITE_KEY);
    assert.equal(inviteKey.values[0].type, ATTRIB_TYPE_REF_DATA);
    assert.equal(inviteKey.values[0].value, 'FOR3P6FW6R');
    assert.equal(claimFromDate.name, ATTRIB_CLAIM_FROM_DATE);
    assert.equal(claimFromDate.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(claimFromDate.values[0].value, '01/08/2021');
    assert.equal(maritalStatus.name, ATTRIB_MARITAL_STATUS);
    assert.equal(maritalStatus.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(maritalStatus.values[0].value, 'Dissolved');
    assert.equal(maritalStatusDate.name, ATTRIB_MARITAL_STATUS_DATE);
    assert.equal(maritalStatusDate.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(maritalStatusDate.values[0].value, '01/09/1985');
    assert.equal(spouseFirstName.name, ATTRIB_SPOUSE_FIRST_NAME);
    assert.equal(spouseFirstName.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(spouseFirstName.values[0].value, 'Jacca');
    assert.equal(spouseLastName.name, ATTRIB_SPOUSE_LAST_NAME);
    assert.equal(spouseLastName.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(spouseLastName.values[0].value, 'Ford');
    assert.equal(mobileTelNo.name, ATTRIB_MOBILE_TEL);
    assert.equal(mobileTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(mobileTelNo.values[0].value, '07779000000');
    assert.equal(email.name, ATTRIB_EMAIL);
    assert.equal(email.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(email.values[0].value, EMAIL_ADDRESS);
    assert.equal(accountHolder.name, ATTRIB_ACC_HOLDER_NAME);
    assert.equal(accountHolder.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountHolder.values[0].value, 'Mr M Ford');
    assert.equal(accountSortCode.name, ATTRIB_ACC_SORT_CODE);
    assert.equal(accountSortCode.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountSortCode.values[0].value, '000000');
    assert.equal(accountNumber.name, ATTRIB_ACC_NUMBER);
    assert.equal(accountNumber.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountNumber.values[0].value, '12345678');
  });

  it('success - 4a. Lived Abroad', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: URL_COMPLETE,
      headers: {
        'user-agent': USER_AGENT,
      },
      session: {
        id: SESSION_ID,
        // eslint-disable-next-line no-use-before-define
        'claim-data-for-audit': claimData4,
      },
    });
    sinon.stub(auditEventUtils, 'getIpFromRequest').returns('127.1.2.3');
    const auditEvent = auditEventBuilderE0900001.build('SUCCESSFUL_EVENT', req);
    assert.equal(auditEvent.getNino(), 'AA111134A');
    assert.equal(auditEvent.getAgentId(), 'CITIZEN');
    assert.equal(auditEvent.getOutcome(), 'SUCCESSFUL_EVENT');
    assert.equal(auditEvent.getLocationAddress(), '127.1.2.3');
    assert.isUndefined(auditEvent.getLocationName());
    const [browserType, sessionId, inviteKey, claimFromDate, livedOutsideUk, homeTelNo, mobileTelNo, workTelNo,
      email, accountHolder, accountSortCode, accountNumber] = auditEvent.getAttributes();
    assert.equal(browserType.name, ATTRIB_BROWSER_TYPE);
    assert.equal(browserType.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(browserType.values[0].value, USER_AGENT);
    assert.equal(sessionId.name, ATTRIB_SESSION_ID);
    assert.equal(sessionId.values[0].type, ATTRIB_TYPE_REF_DATA);
    assert.equal(sessionId.values[0].value, SESSION_ID);
    assert.equal(inviteKey.name, ATTRIB_INVITE_KEY);
    assert.equal(inviteKey.values[0].type, ATTRIB_TYPE_REF_DATA);
    assert.equal(inviteKey.values[0].value, 'FOR3P6FW6R');
    assert.equal(claimFromDate.name, ATTRIB_CLAIM_FROM_DATE);
    assert.equal(claimFromDate.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(claimFromDate.values[0].value, '01/08/2021');
    assert.equal(livedOutsideUk.name, ATTRIB_LIVED_OUTSIDE_UK);
    assert.equal(livedOutsideUk.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(livedOutsideUk.values[0].value, 'Spain 01/1990 03/1990 | Germany 04/1990 07/1990');
    assert.equal(homeTelNo.name, ATTRIB_HOME_TEL);
    assert.equal(homeTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(homeTelNo.values[0].value, '0191 4890000');
    assert.equal(mobileTelNo.name, ATTRIB_MOBILE_TEL);
    assert.equal(mobileTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(mobileTelNo.values[0].value, '07779000000');
    assert.equal(workTelNo.name, ATTRIB_WORK_TEL);
    assert.equal(workTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(workTelNo.values[0].value, '0111000000');
    assert.equal(email.name, ATTRIB_EMAIL);
    assert.equal(email.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(email.values[0].value, EMAIL_ADDRESS);
    assert.equal(accountHolder.name, ATTRIB_ACC_HOLDER_NAME);
    assert.equal(accountHolder.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountHolder.values[0].value, 'Mr M Ford');
    assert.equal(accountSortCode.name, ATTRIB_ACC_SORT_CODE);
    assert.equal(accountSortCode.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountSortCode.values[0].value, '000000');
    assert.equal(accountNumber.name, ATTRIB_ACC_NUMBER);
    assert.equal(accountNumber.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountNumber.values[0].value, '12345678');
  });

  it('success - 4b. Lived Abroad outside EU', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: URL_COMPLETE,
      headers: {
        'user-agent': USER_AGENT,
      },
      session: {
        id: SESSION_ID,
        // eslint-disable-next-line no-use-before-define
        'claim-data-for-audit': claimData4b,
      },
    });
    sinon.stub(auditEventUtils, 'getIpFromRequest').returns('127.1.2.3');
    const auditEvent = auditEventBuilderE0900001.build('SUCCESSFUL_EVENT', req);
    assert.equal(auditEvent.getNino(), 'AA111134A');
    assert.equal(auditEvent.getAgentId(), 'CITIZEN');
    assert.equal(auditEvent.getOutcome(), 'SUCCESSFUL_EVENT');
    assert.equal(auditEvent.getLocationAddress(), '127.1.2.3');
    assert.isUndefined(auditEvent.getLocationName());
    const [browserType, sessionId, inviteKey, claimFromDate, livedOutsideUk, homeTelNo, mobileTelNo, workTelNo,
      email, accountHolder, accountSortCode, accountNumber] = auditEvent.getAttributes();
    assert.equal(browserType.name, ATTRIB_BROWSER_TYPE);
    assert.equal(browserType.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(browserType.values[0].value, USER_AGENT);
    assert.equal(sessionId.name, ATTRIB_SESSION_ID);
    assert.equal(sessionId.values[0].type, ATTRIB_TYPE_REF_DATA);
    assert.equal(sessionId.values[0].value, SESSION_ID);
    assert.equal(inviteKey.name, ATTRIB_INVITE_KEY);
    assert.equal(inviteKey.values[0].type, ATTRIB_TYPE_REF_DATA);
    assert.equal(inviteKey.values[0].value, 'FOR3P6FW6R');
    assert.equal(claimFromDate.name, ATTRIB_CLAIM_FROM_DATE);
    assert.equal(claimFromDate.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(claimFromDate.values[0].value, '01/08/2021');
    assert.equal(livedOutsideUk.name, ATTRIB_LIVED_OUTSIDE_UK);
    assert.equal(livedOutsideUk.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(livedOutsideUk.values[0].value, 'Japan | Germany 04/1990 07/1990');
    assert.equal(homeTelNo.name, ATTRIB_HOME_TEL);
    assert.equal(homeTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(homeTelNo.values[0].value, '0191 4890000');
    assert.equal(mobileTelNo.name, ATTRIB_MOBILE_TEL);
    assert.equal(mobileTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(mobileTelNo.values[0].value, '07779000000');
    assert.equal(workTelNo.name, ATTRIB_WORK_TEL);
    assert.equal(workTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(workTelNo.values[0].value, '0111000000');
    assert.equal(email.name, ATTRIB_EMAIL);
    assert.equal(email.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(email.values[0].value, EMAIL_ADDRESS);
    assert.equal(accountHolder.name, ATTRIB_ACC_HOLDER_NAME);
    assert.equal(accountHolder.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountHolder.values[0].value, 'Mr M Ford');
    assert.equal(accountSortCode.name, ATTRIB_ACC_SORT_CODE);
    assert.equal(accountSortCode.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountSortCode.values[0].value, '000000');
    assert.equal(accountNumber.name, ATTRIB_ACC_NUMBER);
    assert.equal(accountNumber.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountNumber.values[0].value, '12345678');
  });

  it('success - 5a. Worked Abroad', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: URL_COMPLETE,
      headers: {
        'user-agent': USER_AGENT,
      },
      session: {
        id: SESSION_ID,
        // eslint-disable-next-line no-use-before-define
        'claim-data-for-audit': claimData5,
      },
    });
    sinon.stub(auditEventUtils, 'getIpFromRequest').returns('127.1.2.3');
    const auditEvent = auditEventBuilderE0900001.build('SUCCESSFUL_EVENT', req);
    assert.equal(auditEvent.getNino(), 'AA111134A');
    assert.equal(auditEvent.getAgentId(), 'CITIZEN');
    assert.equal(auditEvent.getOutcome(), 'SUCCESSFUL_EVENT');
    assert.equal(auditEvent.getLocationAddress(), '127.1.2.3');
    assert.isUndefined(auditEvent.getLocationName());
    const [browserType, sessionId, inviteKey, claimFromDate, workedOutsideUk, homeTelNo, mobileTelNo, workTelNo,
      email, accountHolder, accountSortCode, accountNumber] = auditEvent.getAttributes();
    assert.equal(browserType.name, ATTRIB_BROWSER_TYPE);
    assert.equal(browserType.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(browserType.values[0].value, USER_AGENT);
    assert.equal(sessionId.name, ATTRIB_SESSION_ID);
    assert.equal(sessionId.values[0].type, ATTRIB_TYPE_REF_DATA);
    assert.equal(sessionId.values[0].value, SESSION_ID);
    assert.equal(inviteKey.name, ATTRIB_INVITE_KEY);
    assert.equal(inviteKey.values[0].type, ATTRIB_TYPE_REF_DATA);
    assert.equal(inviteKey.values[0].value, 'FOR3P6FW6R');
    assert.equal(claimFromDate.name, ATTRIB_CLAIM_FROM_DATE);
    assert.equal(claimFromDate.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(claimFromDate.values[0].value, '01/08/2021');
    assert.equal(workedOutsideUk.name, ATTRIB_WORKED_OUTSIDE_UK);
    assert.equal(workedOutsideUk.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(workedOutsideUk.values[0].value, 'Spain 01/1999 03/1999 | Portugal 05/1999 08/1999');
    assert.equal(homeTelNo.name, ATTRIB_HOME_TEL);
    assert.equal(homeTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(homeTelNo.values[0].value, '0191 4890000');
    assert.equal(mobileTelNo.name, ATTRIB_MOBILE_TEL);
    assert.equal(mobileTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(mobileTelNo.values[0].value, '07779000000');
    assert.equal(workTelNo.name, ATTRIB_WORK_TEL);
    assert.equal(workTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(workTelNo.values[0].value, '0111000000');
    assert.equal(email.name, ATTRIB_EMAIL);
    assert.equal(email.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(email.values[0].value, EMAIL_ADDRESS);
    assert.equal(accountHolder.name, ATTRIB_ACC_HOLDER_NAME);
    assert.equal(accountHolder.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountHolder.values[0].value, 'Mr M Ford');
    assert.equal(accountSortCode.name, ATTRIB_ACC_SORT_CODE);
    assert.equal(accountSortCode.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountSortCode.values[0].value, '000000');
    assert.equal(accountNumber.name, ATTRIB_ACC_NUMBER);
    assert.equal(accountNumber.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountNumber.values[0].value, '12345678');
  });

  it('success - 5b. Worked Abroad outside EU', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: URL_COMPLETE,
      headers: {
        'user-agent': USER_AGENT,
      },
      session: {
        id: SESSION_ID,
        // eslint-disable-next-line no-use-before-define
        'claim-data-for-audit': claimData5b,
      },
    });
    sinon.stub(auditEventUtils, 'getIpFromRequest').returns('127.1.2.3');
    const auditEvent = auditEventBuilderE0900001.build('SUCCESSFUL_EVENT', req);
    assert.equal(auditEvent.getNino(), 'AA111134A');
    assert.equal(auditEvent.getAgentId(), 'CITIZEN');
    assert.equal(auditEvent.getOutcome(), 'SUCCESSFUL_EVENT');
    assert.equal(auditEvent.getLocationAddress(), '127.1.2.3');
    assert.isUndefined(auditEvent.getLocationName());
    const [browserType, sessionId, inviteKey, claimFromDate, workedOutsideUk, homeTelNo, mobileTelNo, workTelNo,
      email, accountHolder, accountSortCode, accountNumber] = auditEvent.getAttributes();
    assert.equal(browserType.name, ATTRIB_BROWSER_TYPE);
    assert.equal(browserType.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(browserType.values[0].value, USER_AGENT);
    assert.equal(sessionId.name, ATTRIB_SESSION_ID);
    assert.equal(sessionId.values[0].type, ATTRIB_TYPE_REF_DATA);
    assert.equal(sessionId.values[0].value, SESSION_ID);
    assert.equal(inviteKey.name, ATTRIB_INVITE_KEY);
    assert.equal(inviteKey.values[0].type, ATTRIB_TYPE_REF_DATA);
    assert.equal(inviteKey.values[0].value, 'FOR3P6FW6R');
    assert.equal(claimFromDate.name, ATTRIB_CLAIM_FROM_DATE);
    assert.equal(claimFromDate.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(claimFromDate.values[0].value, '01/08/2021');
    assert.equal(workedOutsideUk.name, ATTRIB_WORKED_OUTSIDE_UK);
    assert.equal(workedOutsideUk.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(workedOutsideUk.values[0].value, 'Spain 01/1999 03/1999 | Japan');
    assert.equal(homeTelNo.name, ATTRIB_HOME_TEL);
    assert.equal(homeTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(homeTelNo.values[0].value, '0191 4890000');
    assert.equal(mobileTelNo.name, ATTRIB_MOBILE_TEL);
    assert.equal(mobileTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(mobileTelNo.values[0].value, '07779000000');
    assert.equal(workTelNo.name, ATTRIB_WORK_TEL);
    assert.equal(workTelNo.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(workTelNo.values[0].value, '0111000000');
    assert.equal(email.name, ATTRIB_EMAIL);
    assert.equal(email.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(email.values[0].value, EMAIL_ADDRESS);
    assert.equal(accountHolder.name, ATTRIB_ACC_HOLDER_NAME);
    assert.equal(accountHolder.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountHolder.values[0].value, 'Mr M Ford');
    assert.equal(accountSortCode.name, ATTRIB_ACC_SORT_CODE);
    assert.equal(accountSortCode.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountSortCode.values[0].value, '000000');
    assert.equal(accountNumber.name, ATTRIB_ACC_NUMBER);
    assert.equal(accountNumber.values[0].type, ATTRIB_TYPE_AFTER_DATA);
    assert.equal(accountNumber.values[0].value, '12345678');
  });

  it('fail: data missing', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: URL_COMPLETE,
      session: {},
    });
    sinon.stub(auditEventUtils, 'getIpFromRequest').returns('127.1.2.3');
    try {
      auditEventBuilderE0900001.build('SUCCESSFUL_EVENT', req);
      fail();
    } catch (err) {
      assert.equal(err.message, 'Could not build event E0900001. Claim data not present on the session.');
    }
  });
});

const bankAccountDetail1 = {
  bankDetail: {
    result: 'Fail',
    resultQ: 'Bank Authentication result',
    messages: [
      'BV3:Validation Failure INVALID - Sortcode',
    ],
    messagesQ: 'Warnings',
    accountHolder: 'Mr M Ford',
    accountHolderQ: 'Account holder name',
    accountNumber: '12345678',
    accountNumberQ: 'Account number',
    sortCode: '000000',
    sortCodeQ: 'Sort code',
  },
  bankDetailQ: 'Bank account',
  paymentMethodQ: 'How would you like to be paid?',
};

const bsAccountDetail1 = {
  buildingSocietyDetail: {
    result: 'Not checked - Building Society',
    resultQ: 'Bank Authentication result',
    accountHolder: 'Mr M Ford',
    accountHolderQ: 'Account holder name',
    accountNumber: '12345678',
    accountNumberQ: 'Account number',
    referenceNumber: 'bsref1',
    referenceNumberQ: 'Building society roll or reference number',
    sortCode: '000000',
    sortCodeQ: 'Sort code',
  },
  buildingSocietyDetailQ: 'Building society account',
  paymentMethodQ: 'How would you like to be paid?',
};

const claimData1 = {
  inviteKey: 'FOR3P6FW6R',
  inviteKeyQ: 'What is your invitation code?',
  contactDetail: {
    homeTelephoneNumber: '0191 4890000',
    homeTelephoneNumberQ: 'Home phone number',
    mobileTelephoneNumber: '07779000000',
    mobileTelephoneNumberQ: 'Mobile phone number',
    workTelephoneNumber: '0111000000',
    workTelephoneNumberQ: 'Work phone number',
    email: 'me@here.com',
    emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  accountDetail: bankAccountDetail1,
  accountDetailQ: 'How would you like to be paid?',
  customerRequest: {
    residentialAddress: {
      subBuildingName: null,
      buildingName: null,
      buildingNumber: '77',
      dependentThoroughfareName: null,
      thoroughfareName: 'Sullivan Walk',
      dependentLocality: null,
      postTown: 'Hebburn',
      postCode: 'NE31 1YW',
      uprn: null,
      singleLine: null,
      thoroughfareNameQ: 'Main street name',
      postCodeQ: 'Post code',
      buildingNumberQ: 'Building number',
      postTownQ: 'Town',
    },
    correspondenceAddress: null,
    createdDate: 1623845776579,
    dob: -455047200000,
    firstName: 'Mark',
    gender: 'Male',
    nino: 'AA111134A',
    statePensionDate: 1627797600000,
    surname: 'Ford',
    title: 'Mr',
    mqpFlag: null,
    titleQ: 'Title',
    firstNameQ: 'First Name',
    surnameQ: 'Surname',
    dobQ: 'Date of birth',
    genderQ: 'Gender',
    statePensionDateQ: 'State Pension age',
    ninoQ: 'National Insurance number',
    residentialAddressQ: 'Residential Address - UK',
  },
};

const claimData2 = {
  inviteKey: 'FOR3P6FW6R',
  inviteKeyQ: 'What is your invitation code?',
  contactDetail: {
    homeTelephoneNumber: '0191 4890000',
    homeTelephoneNumberQ: 'Home phone number',
    mobileTelephoneNumber: '07779000000',
    mobileTelephoneNumberQ: 'Mobile phone number',
    workTelephoneNumber: '0111000000',
    workTelephoneNumberQ: 'Work phone number',
    email: 'me@here.com',
    emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  accountDetail: bsAccountDetail1,
  accountDetailQ: 'How would you like to be paid?',
  claimFromDate: '2021-09-01T00:00:00.000Z',
  claimFromDateQ: 'What date do you want to get your State Pension?',
  customerRequest: {
    residentialAddress: {
      subBuildingName: null,
      buildingName: null,
      buildingNumber: '77',
      dependentThoroughfareName: null,
      thoroughfareName: 'Sullivan Walk',
      dependentLocality: null,
      postTown: 'Hebburn',
      postCode: 'NE31 1YW',
      uprn: null,
      singleLine: null,
      thoroughfareNameQ: 'Main street name',
      postCodeQ: 'Post code',
      buildingNumberQ: 'Building number',
      postTownQ: 'Town',
    },
    correspondenceAddress: null,
    createdDate: 1623845776579,
    dob: -455047200000,
    firstName: 'Mark',
    gender: 'Male',
    nino: 'AA111134A',
    statePensionDate: 1627797600000,
    surname: 'Ford',
    title: 'Mr',
    mqpFlag: null,
    titleQ: 'Title',
    firstNameQ: 'First Name',
    surnameQ: 'Surname',
    dobQ: 'Date of birth',
    genderQ: 'Gender',
    statePensionDateQ: 'State Pension age',
    ninoQ: 'National Insurance number',
    residentialAddressQ: 'Residential Address - UK',
  },
};

const claimData3a = {
  inviteKey: 'FOR3P6FW6R',
  inviteKeyQ: 'What is your invitation code?',
  contactDetail: {
    homeTelephoneNumber: '0191 4890000',
    homeTelephoneNumberQ: 'Home phone number',
    mobileTelephoneNumber: '07779000000',
    mobileTelephoneNumberQ: 'Mobile phone number',
    workTelephoneNumber: '0111000000',
    workTelephoneNumberQ: 'Work phone number',
    email: 'me@here.com',
    emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Married',
  maritalStatusQ: 'What is your current marital status?',
  partnerDetail: {
    marriageDate: '2003-02-01T00:00:00.000Z',
    marriageDateQ: 'What date did you get married?',
    aboutYourPartnerQ: 'About your spouse',
    firstName: 'Jacca',
    firstNameQ: 'Their first name',
    surname: 'Ford',
    surnameQ: 'Their surname',
    allOtherNames: 'Midname',
    allOtherNamesQ: 'All other names they have been known by',
    dob: '1956-03-01T00:00:00.000Z',
    dobQ: 'Their date of birth (optional)',
  },
  accountDetail: bankAccountDetail1,
  accountDetailQ: 'How would you like to be paid?',
  customerRequest: {
    residentialAddress: {
      subBuildingName: null,
      buildingName: null,
      buildingNumber: '77',
      dependentThoroughfareName: null,
      thoroughfareName: 'Sullivan Walk',
      dependentLocality: null,
      postTown: 'Hebburn',
      postCode: 'NE31 1YW',
      uprn: null,
      singleLine: null,
      thoroughfareNameQ: 'Main street name',
      postCodeQ: 'Post code',
      buildingNumberQ: 'Building number',
      postTownQ: 'Town',
    },
    correspondenceAddress: null,
    createdDate: 1623845776579,
    dob: -455047200000,
    firstName: 'Mark',
    gender: 'Male',
    nino: 'AA111134A',
    statePensionDate: 1627797600000,
    surname: 'Ford',
    title: 'Mr',
    mqpFlag: null,
    titleQ: 'Title',
    firstNameQ: 'First Name',
    surnameQ: 'Surname',
    dobQ: 'Date of birth',
    genderQ: 'Gender',
    statePensionDateQ: 'State Pension age',
    ninoQ: 'National Insurance number',
    residentialAddressQ: 'Residential Address - UK',
  },
};

const claimData3b = {
  inviteKey: 'FOR3P6FW6R',
  inviteKeyQ: 'What is your invitation code?',
  contactDetail: {
    homeTelephoneNumber: '0191 4890000',
    homeTelephoneNumberQ: 'Home phone number',
    mobileTelephoneNumber: '07779000000',
    mobileTelephoneNumberQ: 'Mobile phone number',
    workTelephoneNumber: '0111000000',
    workTelephoneNumberQ: 'Work phone number',
    email: 'me@here.com',
    emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Civil Partnership',
  maritalStatusQ: 'What is your current marital status?',
  partnerDetail: {
    civilPartnershipDate: '2006-03-01T00:00:00.000Z',
    civilPartnershipDateQ: 'What date was your civil partnership registered?',
    aboutYourPartnerQ: 'About your civil partner',
    firstName: 'Jacca',
    firstNameQ: 'Their first name',
    surname: 'Ford',
    surnameQ: 'Their surname',
    allOtherNames: 'Scullion',
    allOtherNamesQ: 'All other names they have been known by',
    dob: '1956-03-02T00:00:00.000Z',
    dobQ: 'Their date of birth (optional)',
  },
  accountDetail: bankAccountDetail1,
  accountDetailQ: 'How would you like to be paid?',
  customerRequest: {
    residentialAddress: {
      subBuildingName: null,
      buildingName: null,
      buildingNumber: '77',
      dependentThoroughfareName: null,
      thoroughfareName: 'Sullivan Walk',
      dependentLocality: null,
      postTown: 'Hebburn',
      postCode: 'NE31 1YW',
      uprn: null,
      singleLine: null,
      thoroughfareNameQ: 'Main street name',
      postCodeQ: 'Post code',
      buildingNumberQ: 'Building number',
      postTownQ: 'Town',
    },
    correspondenceAddress: null,
    createdDate: 1623845776579,
    dob: -455047200000,
    firstName: 'Mark',
    gender: 'Male',
    nino: 'AA111134A',
    statePensionDate: 1627797600000,
    surname: 'Ford',
    title: 'Mr',
    mqpFlag: null,
    titleQ: 'Title',
    firstNameQ: 'First Name',
    surnameQ: 'Surname',
    dobQ: 'Date of birth',
    genderQ: 'Gender',
    statePensionDateQ: 'State Pension age',
    ninoQ: 'National Insurance number',
    residentialAddressQ: 'Residential Address - UK',
  },
};

const claimData3c = {
  inviteKey: 'FOR3P6FW6R',
  inviteKeyQ: 'What is your invitation code?',
  contactDetail: {
    mobileTelephoneNumber: '07779000000',
    mobileTelephoneNumberQ: 'Mobile phone number',
    email: 'me@here.com',
    emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Widowed',
  maritalStatusQ: 'What is your current marital status?',
  partnerDetail: {
    widowedDate: '1999-10-12T00:00:00.000Z',
    widowedDateQ: 'What date were you widowed?',
    aboutYourPartnerQ: 'About your late spouse',
    firstName: 'Jacca',
    firstNameQ: 'Their first name',
    surname: 'Ford',
    surnameQ: 'Their surname',
  },
  accountDetail: bankAccountDetail1,
  accountDetailQ: 'How would you like to be paid?',
  customerRequest: {
    residentialAddress: {
      subBuildingName: null,
      buildingName: null,
      buildingNumber: '77',
      dependentThoroughfareName: null,
      thoroughfareName: 'Sullivan Walk',
      dependentLocality: null,
      postTown: 'Hebburn',
      postCode: 'NE31 1YW',
      uprn: null,
      singleLine: null,
      thoroughfareNameQ: 'Main street name',
      postCodeQ: 'Post code',
      buildingNumberQ: 'Building number',
      postTownQ: 'Town',
    },
    correspondenceAddress: null,
    createdDate: 1623845776579,
    dob: -455047200000,
    firstName: 'Mark',
    gender: 'Male',
    nino: 'AA111134A',
    statePensionDate: 1627797600000,
    surname: 'Ford',
    title: 'Mr',
    mqpFlag: null,
    titleQ: 'Title',
    firstNameQ: 'First Name',
    surnameQ: 'Surname',
    dobQ: 'Date of birth',
    genderQ: 'Gender',
    statePensionDateQ: 'State Pension age',
    ninoQ: 'National Insurance number',
    residentialAddressQ: 'Residential Address - UK',
  },
};

const claimData3d = {
  inviteKey: 'FOR3P6FW6R',
  inviteKeyQ: 'What is your invitation code?',
  contactDetail: {
    mobileTelephoneNumber: '07779000000',
    mobileTelephoneNumberQ: 'Mobile phone number',
    email: 'me@here.com',
    emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Divorced',
  maritalStatusQ: 'What is your current marital status?',
  partnerDetail: {
    divorcedDate: '1998-12-11T00:00:00.000Z',
    divorcedDateQ: 'What date did you get divorced?',
    aboutYourPartnerQ: 'About your ex-spouse',
    firstName: 'Jacca',
    firstNameQ: 'Their first name',
    surname: 'Ford',
    surnameQ: 'Their surname',
  },
  accountDetail: bankAccountDetail1,
  accountDetailQ: 'How would you like to be paid?',
  customerRequest: {
    residentialAddress: {
      subBuildingName: null,
      buildingName: null,
      buildingNumber: '77',
      dependentThoroughfareName: null,
      thoroughfareName: 'Sullivan Walk',
      dependentLocality: null,
      postTown: 'Hebburn',
      postCode: 'NE31 1YW',
      uprn: null,
      singleLine: null,
      thoroughfareNameQ: 'Main street name',
      postCodeQ: 'Post code',
      buildingNumberQ: 'Building number',
      postTownQ: 'Town',
    },
    correspondenceAddress: null,
    createdDate: 1623845776579,
    dob: -455047200000,
    firstName: 'Mark',
    gender: 'Male',
    nino: 'AA111134A',
    statePensionDate: 1627797600000,
    surname: 'Ford',
    title: 'Mr',
    mqpFlag: null,
    titleQ: 'Title',
    firstNameQ: 'First Name',
    surnameQ: 'Surname',
    dobQ: 'Date of birth',
    genderQ: 'Gender',
    statePensionDateQ: 'State Pension age',
    ninoQ: 'National Insurance number',
    residentialAddressQ: 'Residential Address - UK',
  },
};

const claimData3e = {
  inviteKey: 'FOR3P6FW6R',
  inviteKeyQ: 'What is your invitation code?',
  contactDetail: {
    mobileTelephoneNumber: '07779000000',
    mobileTelephoneNumberQ: 'Mobile phone number',
    email: 'me@here.com',
    emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  maritalStatus: 'Dissolved',
  maritalStatusQ: 'What is your current marital status?',
  partnerDetail: {
    dissolvedDate: '1985-09-01T00:00:00.000Z',
    dissolvedDateQ: 'What date was your civil partnership dissolved?',
    aboutYourPartnerQ: 'About your ex-partner',
    firstName: 'Jacca',
    firstNameQ: 'Their first name',
    surname: 'Ford',
    surnameQ: 'Their surname',
  },
  accountDetail: bankAccountDetail1,
  accountDetailQ: 'How would you like to be paid?',
  customerRequest: {
    residentialAddress: {
      subBuildingName: null,
      buildingName: null,
      buildingNumber: '77',
      dependentThoroughfareName: null,
      thoroughfareName: 'Sullivan Walk',
      dependentLocality: null,
      postTown: 'Hebburn',
      postCode: 'NE31 1YW',
      uprn: null,
      singleLine: null,
      thoroughfareNameQ: 'Main street name',
      postCodeQ: 'Post code',
      buildingNumberQ: 'Building number',
      postTownQ: 'Town',
    },
    correspondenceAddress: null,
    createdDate: 1623845776579,
    dob: -455047200000,
    firstName: 'Mark',
    gender: 'Male',
    nino: 'AA111134A',
    statePensionDate: 1627797600000,
    surname: 'Ford',
    title: 'Mr',
    mqpFlag: null,
    titleQ: 'Title',
    firstNameQ: 'First Name',
    surnameQ: 'Surname',
    dobQ: 'Date of birth',
    genderQ: 'Gender',
    statePensionDateQ: 'State Pension age',
    ninoQ: 'National Insurance number',
    residentialAddressQ: 'Residential Address - UK',
  },
};

const claimData4 = {
  inviteKey: 'FOR3P6FW6R',
  inviteKeyQ: 'What is your invitation code?',
  livedAbroad: true,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  livedPeriodsAbroad: [
    {
      countryQ: 'Country name',
      country: 'Spain',
      countryStatusQ: 'When did you live in Spain?',
      fromDateQ: 'From',
      fromDate: {
        month: '01',
        year: '1990',
      },
      toDateQ: 'To',
      toDate: {
        month: '03',
        year: '1990',
      },
    },
    {
      countryQ: 'Country name',
      country: 'Germany',
      countryStatusQ: 'When did you live in Germany?',
      fromDateQ: 'From',
      fromDate: {
        month: '04',
        year: '1990',
      },
      toDateQ: 'To',
      toDate: {
        month: '07',
        year: '1990',
      },
    },
  ],
  livedPeriodsAbroadQ: 'What countries have you lived in?',
  contactDetail: {
    homeTelephoneNumber: '0191 4890000',
    homeTelephoneNumberQ: 'Home phone number',
    mobileTelephoneNumber: '07779000000',
    mobileTelephoneNumberQ: 'Mobile phone number',
    workTelephoneNumber: '0111000000',
    workTelephoneNumberQ: 'Work phone number',
    email: 'me@here.com',
    emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  accountDetail: bankAccountDetail1,
  accountDetailQ: 'How would you like to be paid?',
  customerRequest: {
    residentialAddress: {
      subBuildingName: null,
      buildingName: null,
      buildingNumber: '77',
      dependentThoroughfareName: null,
      thoroughfareName: 'Sullivan Walk',
      dependentLocality: null,
      postTown: 'Hebburn',
      postCode: 'NE31 1YW',
      uprn: null,
      singleLine: null,
      thoroughfareNameQ: 'Main street name',
      postCodeQ: 'Post code',
      buildingNumberQ: 'Building number',
      postTownQ: 'Town',
    },
    correspondenceAddress: null,
    createdDate: 1623845776579,
    dob: -455047200000,
    firstName: 'Mark',
    gender: 'Male',
    nino: 'AA111134A',
    statePensionDate: 1627797600000,
    surname: 'Ford',
    title: 'Mr',
    mqpFlag: null,
    titleQ: 'Title',
    firstNameQ: 'First Name',
    surnameQ: 'Surname',
    dobQ: 'Date of birth',
    genderQ: 'Gender',
    statePensionDateQ: 'State Pension age',
    ninoQ: 'National Insurance number',
    residentialAddressQ: 'Residential Address - UK',
  },
};

const claimData4b = {
  inviteKey: 'FOR3P6FW6R',
  inviteKeyQ: 'What is your invitation code?',
  livedAbroad: true,
  livedAbroadQ: 'Have you ever lived outside of the UK?',
  livedPeriodsAbroad: [
    {
      countryQ: 'Country name',
      country: 'Japan',
      countryStatusQ: 'When did you live in Spain?',
    },
    {
      countryQ: 'Country name',
      country: 'Germany',
      countryStatusQ: 'When did you live in Germany?',
      fromDateQ: 'From',
      fromDate: {
        month: '04',
        year: '1990',
      },
      toDateQ: 'To',
      toDate: {
        month: '07',
        year: '1990',
      },
    },
  ],
  livedPeriodsAbroadQ: 'What countries have you lived in?',
  contactDetail: {
    homeTelephoneNumber: '0191 4890000',
    homeTelephoneNumberQ: 'Home phone number',
    mobileTelephoneNumber: '07779000000',
    mobileTelephoneNumberQ: 'Mobile phone number',
    workTelephoneNumber: '0111000000',
    workTelephoneNumberQ: 'Work phone number',
    email: 'me@here.com',
    emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  accountDetail: bankAccountDetail1,
  accountDetailQ: 'How would you like to be paid?',
  customerRequest: {
    residentialAddress: {
      subBuildingName: null,
      buildingName: null,
      buildingNumber: '77',
      dependentThoroughfareName: null,
      thoroughfareName: 'Sullivan Walk',
      dependentLocality: null,
      postTown: 'Hebburn',
      postCode: 'NE31 1YW',
      uprn: null,
      singleLine: null,
      thoroughfareNameQ: 'Main street name',
      postCodeQ: 'Post code',
      buildingNumberQ: 'Building number',
      postTownQ: 'Town',
    },
    correspondenceAddress: null,
    createdDate: 1623845776579,
    dob: -455047200000,
    firstName: 'Mark',
    gender: 'Male',
    nino: 'AA111134A',
    statePensionDate: 1627797600000,
    surname: 'Ford',
    title: 'Mr',
    mqpFlag: null,
    titleQ: 'Title',
    firstNameQ: 'First Name',
    surnameQ: 'Surname',
    dobQ: 'Date of birth',
    genderQ: 'Gender',
    statePensionDateQ: 'State Pension age',
    ninoQ: 'National Insurance number',
    residentialAddressQ: 'Residential Address - UK',
  },
};

const claimData5 = {
  inviteKey: 'FOR3P6FW6R',
  inviteKeyQ: 'What is your invitation code?',
  workedAbroad: true,
  workedAbroadQ: 'Have you worked outside of the UK?',
  workedPeriodsAbroad: [
    {
      countryQ: 'Country name',
      country: 'Spain',
      countryStatusQ: 'When did you work in Spain?',
      fromDateQ: 'From',
      fromDate: {
        month: '01',
        year: '1999',
      },
      toDateQ: 'To',
      toDate: {
        month: '03',
        year: '1999',
      },
      referenceNumberQ: 'What was the equivalent of your National Insurance number here?',
      referenceNumber: 'ASPANISHNI',
    },
    {
      countryQ: 'Country name',
      country: 'Portugal',
      countryStatusQ: 'When did you work in Portugal?',
      fromDateQ: 'From',
      fromDate: {
        month: '05',
        year: '1999',
      },
      toDateQ: 'To',
      toDate: {
        month: '08',
        year: '1999',
      },
      referenceNumberQ: 'What was the equivalent of your National Insurance number here?',
      referenceNumber: 'PORTUGALNI',
    },
  ],
  workedPeriodsAbroadQ: 'What countries have you worked in?',
  contactDetail: {
    homeTelephoneNumber: '0191 4890000',
    homeTelephoneNumberQ: 'Home phone number',
    mobileTelephoneNumber: '07779000000',
    mobileTelephoneNumberQ: 'Mobile phone number',
    workTelephoneNumber: '0111000000',
    workTelephoneNumberQ: 'Work phone number',
    email: 'me@here.com',
    emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  accountDetail: bankAccountDetail1,
  accountDetailQ: 'How would you like to be paid?',
  customerRequest: {
    residentialAddress: {
      subBuildingName: null,
      buildingName: null,
      buildingNumber: '77',
      dependentThoroughfareName: null,
      thoroughfareName: 'Sullivan Walk',
      dependentLocality: null,
      postTown: 'Hebburn',
      postCode: 'NE31 1YW',
      uprn: null,
      singleLine: null,
      thoroughfareNameQ: 'Main street name',
      postCodeQ: 'Post code',
      buildingNumberQ: 'Building number',
      postTownQ: 'Town',
    },
    correspondenceAddress: null,
    createdDate: 1623845776579,
    dob: -455047200000,
    firstName: 'Mark',
    gender: 'Male',
    nino: 'AA111134A',
    statePensionDate: 1627797600000,
    surname: 'Ford',
    title: 'Mr',
    mqpFlag: null,
    titleQ: 'Title',
    firstNameQ: 'First Name',
    surnameQ: 'Surname',
    dobQ: 'Date of birth',
    genderQ: 'Gender',
    statePensionDateQ: 'State Pension age',
    ninoQ: 'National Insurance number',
    residentialAddressQ: 'Residential Address - UK',
  },
};

const claimData5b = {
  inviteKey: 'FOR3P6FW6R',
  inviteKeyQ: 'What is your invitation code?',
  workedAbroad: true,
  workedAbroadQ: 'Have you worked outside of the UK?',
  workedPeriodsAbroad: [
    {
      countryQ: 'Country name',
      country: 'Spain',
      countryStatusQ: 'When did you work in Spain?',
      fromDateQ: 'From',
      fromDate: {
        month: '01',
        year: '1999',
      },
      toDateQ: 'To',
      toDate: {
        month: '03',
        year: '1999',
      },
      referenceNumberQ: 'What was the equivalent of your National Insurance number here?',
      referenceNumber: 'ASPANISHNI',
    },
    {
      countryQ: 'Country name',
      country: 'Japan',
    },
  ],
  workedPeriodsAbroadQ: 'What countries have you worked in?',
  contactDetail: {
    homeTelephoneNumber: '0191 4890000',
    homeTelephoneNumberQ: 'Home phone number',
    mobileTelephoneNumber: '07779000000',
    mobileTelephoneNumberQ: 'Mobile phone number',
    workTelephoneNumber: '0111000000',
    workTelephoneNumberQ: 'Work phone number',
    email: 'me@here.com',
    emailQ: 'Email address',
  },
  contactDetailQ: 'How would you like to be contacted?',
  accountDetail: bankAccountDetail1,
  accountDetailQ: 'How would you like to be paid?',
  customerRequest: {
    residentialAddress: {
      subBuildingName: null,
      buildingName: null,
      buildingNumber: '77',
      dependentThoroughfareName: null,
      thoroughfareName: 'Sullivan Walk',
      dependentLocality: null,
      postTown: 'Hebburn',
      postCode: 'NE31 1YW',
      uprn: null,
      singleLine: null,
      thoroughfareNameQ: 'Main street name',
      postCodeQ: 'Post code',
      buildingNumberQ: 'Building number',
      postTownQ: 'Town',
    },
    correspondenceAddress: null,
    createdDate: 1623845776579,
    dob: -455047200000,
    firstName: 'Mark',
    gender: 'Male',
    nino: 'AA111134A',
    statePensionDate: 1627797600000,
    surname: 'Ford',
    title: 'Mr',
    mqpFlag: null,
    titleQ: 'Title',
    firstNameQ: 'First Name',
    surnameQ: 'Surname',
    dobQ: 'Date of birth',
    genderQ: 'Gender',
    statePensionDateQ: 'State Pension age',
    ninoQ: 'National Insurance number',
    residentialAddressQ: 'Residential Address - UK',
  },
};
