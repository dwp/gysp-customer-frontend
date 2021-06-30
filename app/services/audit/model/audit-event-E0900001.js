const moment = require('moment');
const AuditEvent = require('./audit-event');
const AuditEventAttribute = require('./audit-event-attribute');
const AuditEventAttributeValue = require('./audit-event-attribute-value');
const ATTRIBUTE_TYPES = require('./attribute-types');

const DATA_KEY_CLAIM_FROM_DATE = 'claimFromDate';
const DATA_KEY_MARITAL_STATUS = 'maritalStatus';
const DATA_KEY_PARTNER_DETAIL = 'partnerDetail';
const DATA_KEY_CONTACT_DETAIL = 'contactDetail';

const DATA_KEY_LIVED_ABROAD = 'livedAbroad';
const DATA_KEY_LIVED_PERIODS_ABROAD = 'livedPeriodsAbroad';
const DATA_KEY_WORKED_ABROAD = 'workedAbroad';
const DATA_KEY_WORKED_PERIODS_ABROAD = 'workedPeriodsAbroad';

const ATTRIB_LIVED_OUTSIDE_UK = 'Lived outside UK Country details';
const ATTRIB_WORKED_OUTSIDE_UK = 'Worked outside UK Country details';

class AuditEventE0900001 extends AuditEvent {
  constructor(outcome, userId, locationAddress, locationName, payload) {
    super('E0900001', outcome, userId, locationAddress, locationName);
    const { sessionId, userAgent, claimData = {} } = payload;
    const { customerRequest = {} } = claimData;
    this.setNino(customerRequest.nino);
    this.setAttributes([]);

    if (userAgent) {
      this.attributes.push(new AuditEventAttribute('Browser Type',
        [new AuditEventAttributeValue(ATTRIBUTE_TYPES.AFTER, userAgent)]));
    }

    if (sessionId) {
      this.attributes.push(new AuditEventAttribute('Session ID',
        [new AuditEventAttributeValue(ATTRIBUTE_TYPES.REFERENCE_DATA, sessionId)]));
    }

    if (claimData.inviteKey !== null) {
      this.attributes.push(new AuditEventAttribute('Invite Key',
        [new AuditEventAttributeValue(ATTRIBUTE_TYPES.REFERENCE_DATA, claimData.inviteKey)]));
    }
    this.addAttributesForClaimDate(claimData);
    this.addAttributesForLivingAndWorkingOutsideTheUK(claimData);
    this.addAttributesForMaritalDetails(claimData);
    this.addAttributesForContactDetails(claimData);
    this.addAttributesForBankDetails(claimData);
  }

  addAttributesForBankDetails(claimData) {
    const { accountDetail = {} } = claimData;
    const { bankDetail = {}, buildingSocietyDetail = {} } = accountDetail;
    const detail = (bankDetail.accountHolder) ? bankDetail : buildingSocietyDetail;
    if (detail.accountHolder) {
      this.attributes.push(new AuditEventAttribute('Account Holder Name',
        [new AuditEventAttributeValue(ATTRIBUTE_TYPES.AFTER, detail.accountHolder)]));
    }
    if (detail.sortCode) {
      this.attributes.push(new AuditEventAttribute('Account Sort Code',
        [new AuditEventAttributeValue(ATTRIBUTE_TYPES.AFTER, detail.sortCode)]));
    }
    if (detail.accountNumber) {
      this.attributes.push(new AuditEventAttribute('Account Number',
        [new AuditEventAttributeValue(ATTRIBUTE_TYPES.AFTER, detail.accountNumber)]));
    }
    if (detail.referenceNumber) {
      this.attributes.push(new AuditEventAttribute('Building Society Roll/Reference',
        [new AuditEventAttributeValue(ATTRIBUTE_TYPES.AFTER, detail.referenceNumber)]));
    }
  }

  addAttributesForContactDetails(claimData) {
    if (claimData[DATA_KEY_CONTACT_DETAIL] && claimData[DATA_KEY_CONTACT_DETAIL].homeTelephoneNumber) {
      this.attributes.push(new AuditEventAttribute('Home Number',
        [new AuditEventAttributeValue(ATTRIBUTE_TYPES.AFTER, claimData[DATA_KEY_CONTACT_DETAIL].homeTelephoneNumber)]));
    }
    if (claimData[DATA_KEY_CONTACT_DETAIL] && claimData[DATA_KEY_CONTACT_DETAIL].mobileTelephoneNumber) {
      this.attributes.push(new AuditEventAttribute('Mobile Number',
        [new AuditEventAttributeValue(ATTRIBUTE_TYPES.AFTER, claimData[DATA_KEY_CONTACT_DETAIL].mobileTelephoneNumber)]));
    }
    if (claimData[DATA_KEY_CONTACT_DETAIL] && claimData[DATA_KEY_CONTACT_DETAIL].workTelephoneNumber) {
      this.attributes.push(new AuditEventAttribute('Work Number',
        [new AuditEventAttributeValue(ATTRIBUTE_TYPES.AFTER, claimData[DATA_KEY_CONTACT_DETAIL].workTelephoneNumber)]));
    }
    if (claimData[DATA_KEY_CONTACT_DETAIL] && claimData[DATA_KEY_CONTACT_DETAIL].email) {
      this.attributes.push(new AuditEventAttribute('Email Address',
        [new AuditEventAttributeValue(ATTRIBUTE_TYPES.AFTER, claimData[DATA_KEY_CONTACT_DETAIL].email)]));
    }
  }

  addAttributesForMaritalDetails(claimData) {
    if (claimData[DATA_KEY_MARITAL_STATUS]) {
      this.attributes.push(new AuditEventAttribute('Marital Status',
        [new AuditEventAttributeValue(ATTRIBUTE_TYPES.AFTER, claimData[DATA_KEY_MARITAL_STATUS])]));
    }

    if (claimData[DATA_KEY_PARTNER_DETAIL] && Object.keys(claimData[DATA_KEY_PARTNER_DETAIL]).length) {
      let mDate;
      if (claimData[DATA_KEY_PARTNER_DETAIL].marriageDate) {
        mDate = moment.utc(claimData[DATA_KEY_PARTNER_DETAIL].marriageDate).format('DD/MM/YYYY');
      } else if (claimData[DATA_KEY_PARTNER_DETAIL].civilPartnershipDate) {
        mDate = moment.utc(claimData[DATA_KEY_PARTNER_DETAIL].civilPartnershipDate).format('DD/MM/YYYY');
      } else if (claimData[DATA_KEY_PARTNER_DETAIL].widowedDate) {
        mDate = moment.utc(claimData[DATA_KEY_PARTNER_DETAIL].widowedDate).format('DD/MM/YYYY');
      } else if (claimData[DATA_KEY_PARTNER_DETAIL].divorcedDate) {
        mDate = moment.utc(claimData[DATA_KEY_PARTNER_DETAIL].divorcedDate).format('DD/MM/YYYY');
      } else if (claimData[DATA_KEY_PARTNER_DETAIL].dissolvedDate) {
        mDate = moment.utc(claimData[DATA_KEY_PARTNER_DETAIL].dissolvedDate).format('DD/MM/YYYY');
      }
      if (mDate) {
        this.attributes.push(new AuditEventAttribute('Marital Status Date',
          [new AuditEventAttributeValue(ATTRIBUTE_TYPES.AFTER, mDate)]));
      }
      if (claimData[DATA_KEY_PARTNER_DETAIL].firstName) {
        this.attributes.push(new AuditEventAttribute('Spouse/Partner first name',
          [new AuditEventAttributeValue(ATTRIBUTE_TYPES.AFTER,
            claimData[DATA_KEY_PARTNER_DETAIL].firstName)]));
      }
      if (claimData[DATA_KEY_PARTNER_DETAIL].surname) {
        this.attributes.push(new AuditEventAttribute('Spouse/Partner last name',
          [new AuditEventAttributeValue(ATTRIBUTE_TYPES.AFTER,
            claimData[DATA_KEY_PARTNER_DETAIL].surname)]));
      }
      if (claimData[DATA_KEY_PARTNER_DETAIL].allOtherNames) {
        this.attributes.push(new AuditEventAttribute('Spouse/Partner any other name',
          [new AuditEventAttributeValue(ATTRIBUTE_TYPES.AFTER,
            claimData[DATA_KEY_PARTNER_DETAIL].allOtherNames)]));
      }
      if (claimData[DATA_KEY_PARTNER_DETAIL].dob) {
        const dte = moment.utc(claimData[DATA_KEY_PARTNER_DETAIL].dob).format('DD/MM/YYYY');
        this.attributes.push(new AuditEventAttribute('Spouse/Partner DoB',
          [new AuditEventAttributeValue(ATTRIBUTE_TYPES.AFTER, dte)]));
      }
    }
  }

  addAttributesForClaimDate(claimData) {
    const { customerRequest = {} } = claimData;
    if (claimData[DATA_KEY_CLAIM_FROM_DATE]) {
      const dte = moment.utc(claimData[DATA_KEY_CLAIM_FROM_DATE]).format('DD/MM/YYYY');
      this.attributes.push(new AuditEventAttribute('Claim from date',
        [new AuditEventAttributeValue(ATTRIBUTE_TYPES.AFTER, dte)]));
    } else if (customerRequest.statePensionDate !== null) {
      const spDate = moment(customerRequest.statePensionDate);
      this.attributes.push(new AuditEventAttribute('Claim from date',
        [new AuditEventAttributeValue(ATTRIBUTE_TYPES.AFTER, spDate.format('DD/MM/YYYY'))]));
    }
  }

  addAttributesForLivingAndWorkingOutsideTheUK(claimData) {
    if (claimData[DATA_KEY_LIVED_ABROAD] && claimData[DATA_KEY_LIVED_PERIODS_ABROAD]) {
      const livedPeriodsAbroad = claimData[DATA_KEY_LIVED_PERIODS_ABROAD];
      let lpaValue = '';
      livedPeriodsAbroad.forEach((lpa) => {
        if (lpa.fromDate && lpa.toDate) {
          lpaValue += `${lpa.country} ${lpa.fromDate.month}/${lpa.fromDate.year} ${lpa.toDate.month}/${lpa.toDate.year} | `;
        } else {
          lpaValue += `${lpa.country} | `;
        }
      });
      if (lpaValue) {
        this.attributes.push(new AuditEventAttribute(ATTRIB_LIVED_OUTSIDE_UK,
          [new AuditEventAttributeValue(ATTRIBUTE_TYPES.AFTER, lpaValue.substr(0, lpaValue.length - 3))]));
      }
    }
    if (claimData[DATA_KEY_WORKED_ABROAD] && claimData[DATA_KEY_WORKED_PERIODS_ABROAD]) {
      const workedPeriodsAbroad = claimData[DATA_KEY_WORKED_PERIODS_ABROAD];
      let wpaValue = '';
      workedPeriodsAbroad.forEach((wpa) => {
        if (wpa.fromDate && wpa.toDate) {
          wpaValue += `${wpa.country} ${wpa.fromDate.month}/${wpa.fromDate.year} ${wpa.toDate.month}/${wpa.toDate.year} | `;
        } else {
          wpaValue += `${wpa.country} | `;
        }
      });
      if (wpaValue) {
        this.attributes.push(new AuditEventAttribute(ATTRIB_WORKED_OUTSIDE_UK,
          [new AuditEventAttributeValue(ATTRIBUTE_TYPES.AFTER, wpaValue.substr(0, wpaValue.length - 3))]));
      }
    }
  }
}

module.exports = AuditEventE0900001;
