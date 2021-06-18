const httpMocks = require('node-mocks-http');
const { assert } = require('chai');
const sinon = require('sinon');
const auditEventFactory = require('../../../../app/services/audit/audit-event-factory');
const auditEventBuilderE0900001 = require('../../../../app/services/audit/audit-event-builder-E0900001');

const URL_COMPLETE = '/complete';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.79';
const SESSION_ID = 'sessionid';

describe('audit-event-factory', () => {
  afterEach(() => {
    // Unwraps the spy
    auditEventBuilderE0900001.build.restore();
  });

  it('success: E0900001', async () => {
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
    const builderE0900001 = sinon.spy(auditEventBuilderE0900001, 'build');
    auditEventFactory.buildAuditEvent('E0900001', 'SUCCESSFUL_EVENT', req);
    sinon.assert.calledOnce(builderE0900001);
  });

  it('fail: UNKNOWN EVENT', async () => {
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
    const builderE0900001 = sinon.spy(auditEventBuilderE0900001, 'build');
    try {
      auditEventFactory.buildAuditEvent('UNKNOWN', 'SUCCESSFUL_EVENT', req);
    } catch (err) {
      assert.equal(err.message, 'Could not build event. (UNKNOWN) not recognised as a valid event number.');
    }
    sinon.assert.notCalled(builderE0900001);
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
