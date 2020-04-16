const i18n = require('i18next');
const moment = require('moment');
const generalHelper = require('../validations/utils/general.js');
const countryHelper = require('../utils/countriesHelper.js');

i18n.init({ sendMissingTo: 'fallback' });

function formatDate(year, month, day) {
  return `${year}-${month}-${day}T00:00:00.000Z`;
}

module.exports = {
  createCustomerObject(customerDetails) {
    const customerQuestions = {
      titleQ: i18n.t('customer-details:field_names.title'),
      firstNameQ: i18n.t('customer-details:field_names.firstname'),
      surnameQ: i18n.t('customer-details:field_names.surname'),
      dobQ: i18n.t('customer-details:field_names.dob'),
      genderQ: i18n.t('customer-details:field_names.gender'),
      statePensionDateQ: i18n.t('customer-details:field_names.state_pension_date'),
      ninoQ: i18n.t('customer-details:field_names.nino'),
    };

    if (customerDetails.overseasAddress) {
      customerQuestions.overseasAddressDetailQ = i18n.t('customer-details:field_names.address_title').concat(
        ' - ',
        i18n.t('customer-details:field_names.address_details.options.option_overseas'),
      );
      const addressOverseaQuestions = {
        line1Q: i18n.t('customer-details:field_names.address_details.overseas.address_line_1'),
        countryQ: i18n.t('customer-details:field_names.address_details.overseas.country'),
      };
      if (customerDetails.overseasAddress.line2) {
        addressOverseaQuestions.line2Q = i18n.t('customer-details:field_names.address_details.overseas.address_line_2');
      }
      if (customerDetails.overseasAddress.line3) {
        addressOverseaQuestions.line3Q = i18n.t('customer-details:field_names.address_details.overseas.address_line_3');
      }
      if (customerDetails.overseasAddress.line4) {
        addressOverseaQuestions.line4Q = i18n.t('customer-details:field_names.address_details.overseas.address_line_4');
      }
      if (customerDetails.overseasAddress.line5) {
        addressOverseaQuestions.line5Q = i18n.t('customer-details:field_names.address_details.overseas.address_line_5');
      }
      if (customerDetails.overseasAddress.line6) {
        addressOverseaQuestions.line6Q = i18n.t('customer-details:field_names.address_details.overseas.address_line_6');
      }
      if (customerDetails.overseasAddress.line7) {
        addressOverseaQuestions.line7Q = i18n.t('customer-details:field_names.address_details.overseas.address_line_7');
      }
      customerQuestions.overseasAddressDetail = Object.assign(customerDetails.overseasAddress, addressOverseaQuestions);
    } else {
      if (customerDetails.residentialAddress) {
        customerQuestions.residentialAddressQ = ''.concat(
          i18n.t('customer-details:field_names.address_details.uk.residential_address.address_title'),
          ' - ',
          i18n.t('customer-details:field_names.address_details.options.option_uk'),
        );
        const residentialAddressUKQuestions = this.residentialAddressObject(customerDetails);
        customerQuestions.residentialAddress = Object.assign(customerDetails.residentialAddress, residentialAddressUKQuestions);
      }
      if (customerDetails.correspondenceAddress) {
        customerQuestions.correspondenceAddressQ = ''.concat(
          i18n.t('customer-details:field_names.address_details.uk.correspondence_address.address_title'),
          ' - ',
          i18n.t('customer-details:field_names.address_details.options.option_uk'),
        );
        const correspondenceAddressUKQuestions = this.correspondenceAddressObject(customerDetails);
        customerQuestions.correspondenceAddress = Object.assign(customerDetails.correspondenceAddress, correspondenceAddressUKQuestions);
      }
    }
    const CustomerObject = Object.assign({}, customerDetails, customerQuestions);
    if (CustomerObject.dobVerification) {
      delete CustomerObject.dobVerification;
    }
    if (CustomerObject.inviteKey) {
      delete CustomerObject.inviteKey;
    }
    if (CustomerObject.overseasAddress !== undefined) {
      delete CustomerObject.overseasAddress;
    }
    return CustomerObject;
  },
  maritalStatusDate(martialStatus, martialStatusDate) {
    switch (martialStatus) {
    case 'civil':
      return {
        civilPartnershipDate: formatDate(martialStatusDate.dateYear, martialStatusDate.dateMonth, martialStatusDate.dateDay),
        civilPartnershipDateQ: i18n.t('marital-date:header.civil'),
      };
    case 'dissolved':
      return {
        dissolvedDate: formatDate(martialStatusDate.dateYear, martialStatusDate.dateMonth, martialStatusDate.dateDay),
        dissolvedDateQ: i18n.t('marital-date:header.dissolved'),
      };
    case 'married':
      return {
        marriageDate: formatDate(martialStatusDate.dateYear, martialStatusDate.dateMonth, martialStatusDate.dateDay),
        marriageDateQ: i18n.t('marital-date:header.married'),
      };
    case 'divorced':
      return {
        divorcedDate: formatDate(martialStatusDate.dateYear, martialStatusDate.dateMonth, martialStatusDate.dateDay),
        divorcedDateQ: i18n.t('marital-date:header.divorced'),
      };
    case 'widowed':
      return {
        widowedDate: formatDate(martialStatusDate.dateYear, martialStatusDate.dateMonth, martialStatusDate.dateDay),
        widowedDateQ: i18n.t('marital-date:header.widowed'),
      };
    default:
      return undefined;
    }
  },
  maritalStatusTransformer(martialStatus) {
    switch (martialStatus) {
    case 'single':
      return 'Single';
    case 'civil':
      return 'Civil Partnership';
    case 'dissolved':
      return 'Dissolved';
    case 'married':
      return 'Married';
    case 'divorced':
      return 'Divorced';
    case 'widowed':
      return 'Widowed';
    default:
      return undefined;
    }
  },
  countryDetailsTransformer(country, countryDetails, questionPreFix, pagePrefix) {
    const periodsAbroad = [];
    if (country !== undefined) {
      Object.keys(country).forEach((key) => {
        if (country[key] !== '') {
          const obj = { countryQ: i18n.t('countries:fields.country.label'), country: country[key] };
          if (countryDetails !== undefined) {
            const countryIndex = countryHelper.returnIndexOfCountryByName(country[key], countryDetails);
            if (countryIndex !== -1) {
              obj.countryStatusQ = i18n.t(`${questionPreFix}-abroad-country:header.title${pagePrefix}`, { COUNTRY: country[key] });
              obj.fromDateQ = i18n.t('lived-abroad-country:fields.dateFrom.legend');
              obj.fromDate = {
                month: countryDetails[countryIndex].data.dateFromMonth,
                year: countryDetails[countryIndex].data.dateFromYear,
              };
              obj.toDateQ = i18n.t('lived-abroad-country:fields.dateTo.legend');
              obj.toDate = { month: countryDetails[countryIndex].data.dateToMonth, year: countryDetails[countryIndex].data.dateToYear };
              if (!generalHelper.isThisUndefinedOrEmtpy(countryDetails[countryIndex].data.referenceNumber)) {
                obj.referenceNumberQ = i18n.t('worked-abroad-country:fields.referenceNumber.label', { COUNTRY: country[key] });
                obj.referenceNumber = countryDetails[countryIndex].data.referenceNumber;
              }
            }
          }
          periodsAbroad.push(obj);
        }
      });
    }
    return periodsAbroad;
  },
  accountDetailsTransformer(accountDetails, accountStatus) {
    const account = {};
    let details = {};
    const sortCode = '';

    account.result = accountStatus.result;
    account.resultQ = i18n.t('account:fields.result');

    if (accountStatus.messages) {
      account.messages = accountStatus.messages;
      account.messagesQ = i18n.t('account:fields.messages');
    }

    if (accountDetails.paymentMethod === 'bank') {
      account.accountHolder = accountDetails.bankAccountHolder;
      account.accountHolderQ = i18n.t('account:fields.accountHolder.label');
      account.accountNumber = accountDetails.bankAccountNumber;
      account.accountNumberQ = i18n.t('account:fields.accountNumber.label');
      account.sortCode = sortCode.concat(
        accountDetails.bankSortCodeField1,
        accountDetails.bankSortCodeField2,
        accountDetails.bankSortCodeField3,
      );
      account.sortCodeQ = i18n.t('account:fields.sortCode.label');
      account.validated = accountDetails.validated;
      details = {
        bankDetail: account,
        bankDetailQ: i18n.t('account:fields.paymentMethod.options.bank'),
        paymentMethodQ: i18n.t('account:fields.paymentMethod.fieldset'),
      };
    } else {
      account.accountHolder = accountDetails.buildingAccountHolder;
      account.accountHolderQ = i18n.t('account:fields.accountHolder.label');
      account.accountNumber = accountDetails.buildingAccountNumber;
      account.accountNumberQ = i18n.t('account:fields.accountNumber.label');
      if (!generalHelper.isThisUndefinedOrEmtpy(accountDetails.buildingRoll)) {
        account.referenceNumber = accountDetails.buildingRoll;
        account.referenceNumberQ = i18n.t('account:fields.buildingRoll.label');
      }
      account.sortCode = sortCode.concat(
        accountDetails.buildingSortCodeField1,
        accountDetails.buildingSortCodeField2,
        accountDetails.buildingSortCodeField3,
      );
      account.sortCodeQ = i18n.t('account:fields.sortCode.label');
      details = {
        buildingSocietyDetail: account,
        buildingSocietyDetailQ: i18n.t('account:fields.paymentMethod.options.building'),
        paymentMethodQ: i18n.t('account:fields.paymentMethod.fieldset'),
      };
    }
    return details;
  },
  accountDetailsOverseasTransformer(accountDetails, accountStatus) {
    return {
      accountHolder: accountDetails.accountHolder,
      accountHolderQ: i18n.t('account-overseas:fields.accountHolder.label'),
      accountNumber: accountDetails.accountNumber,
      accountNumberQ: i18n.t('account-overseas:fields.accountNumber.label'),
      accountCode: accountDetails.accountCode,
      accountCodeQ: i18n.t('account-overseas:fields.accountCode.label'),
      result: accountStatus.result,
      resultQ: i18n.t('account-overseas:fields.result'),
    };
  },
  sessionToObject(details, accountStatus, language) {
    i18n.setLng(language);
    let livedAboard = false;
    let livedPeriodsAbroad = [];
    if (details.isOverseas) {
      livedPeriodsAbroad = this.countryDetailsTransformer(
        details['lived-abroad-countries'],
        details['lived-abroad-countries-details'],
        'lived',
        '-overseas',
      );
    } else if (details['lived-abroad'].livedAbroad === 'yes') {
      livedAboard = true;
      livedPeriodsAbroad = this.countryDetailsTransformer(
        details['lived-abroad-countries'],
        details['lived-abroad-countries-details'],
        'lived',
        '',
      );
    }

    let workedAbroad = false;
    let workedPeriodsAbroad = [];
    if (details['worked-abroad'].workedAbroad === 'yes') {
      workedAbroad = true;
      workedPeriodsAbroad = this.countryDetailsTransformer(
        details['worked-abroad-countries'],
        details['worked-abroad-countries-details'],
        'worked',
        '',
      );
    }
    const contactDetail = {};

    const { maritalStatus } = details['marital-select'];

    if (!generalHelper.isThisUndefinedOrEmtpy(details['contact-details'].homeTelephoneNumber)) {
      contactDetail.homeTelephoneNumber = details['contact-details'].homeTelephoneNumber;
      contactDetail.homeTelephoneNumberQ = i18n.t('contact:fields.homeTelephoneNumber.label');
    }

    if (!generalHelper.isThisUndefinedOrEmtpy(details['contact-details'].workTelephoneNumber)) {
      contactDetail.workTelephoneNumber = details['contact-details'].workTelephoneNumber;
      contactDetail.workTelephoneNumberQ = i18n.t('contact:fields.workTelephoneNumber.label');
    }

    if (!generalHelper.isThisUndefinedOrEmtpy(details['contact-details'].mobileTelephoneNumber)) {
      contactDetail.mobileTelephoneNumber = details['contact-details'].mobileTelephoneNumber;
      contactDetail.mobileTelephoneNumberQ = i18n.t('contact:fields.mobileTelephoneNumber.label');
    }

    if (!generalHelper.isThisUndefinedOrEmtpy(details['contact-details'].email)) {
      contactDetail.email = details['contact-details'].email;
      contactDetail.emailQ = i18n.t('contact:fields.email.label');
    }

    let overseasPrefix = '';
    if (details.isOverseas) {
      overseasPrefix = '-overseas';
    }

    const json = {
      livedAbroad: livedAboard,
      livedAbroadQ: i18n.t('lived-abroad:header'),
      livedPeriodsAbroad,
      livedPeriodsAbroadQ: i18n.t(`countries:lived.header${overseasPrefix}`),
      workedAbroad,
      workedAbroadQ: i18n.t('worked-abroad:header'),
      workedPeriodsAbroad,
      workedPeriodsAbroadQ: i18n.t('countries:worked.header'),
      contactDetail,
      contactDetailQ: i18n.t('contact:header'),
      maritalStatus: this.maritalStatusTransformer(maritalStatus),
      maritalStatusQ: i18n.t('marital-select:header'),
    };

    if (details.isOverseas) {
      delete json.livedAbroad;
      delete json.livedAbroadQ;
    }

    if (!generalHelper.isThisUndefinedOrEmtpy(details['personal-data'])
      && !generalHelper.isThisUndefinedOrEmtpy(details['personal-data'].personalDataPermission)) {
      json.personalDataPermission = true;
      json.personalDataPermissionQ = i18n.t('personal-data:fields.personalDataPermission.legend');
    }

    if (maritalStatus !== 'single') {
      json.partnerDetail = this.maritalStatusDate(maritalStatus, details[`marital-date-${maritalStatus}`]);

      json.partnerDetail.aboutYourPartnerQ = i18n.t(`marital-details:header.${maritalStatus}`);

      json.partnerDetail.firstName = details[`marital-partner-${maritalStatus}`].firstName;
      json.partnerDetail.firstNameQ = i18n.t('marital-details:fields.firstName.label');

      json.partnerDetail.surname = details[`marital-partner-${maritalStatus}`].surname;
      json.partnerDetail.surnameQ = i18n.t('marital-details:fields.surname.label');

      if (!generalHelper.isThisUndefinedOrEmtpy(details[`marital-partner-${maritalStatus}`].otherName)) {
        json.partnerDetail.allOtherNames = details[`marital-partner-${maritalStatus}`].otherName;
        json.partnerDetail.allOtherNamesQ = i18n.t('marital-details:fields.otherName.label');
      }

      if (details[`marital-partner-${maritalStatus}`].dobYear !== ''
      && details[`marital-partner-${maritalStatus}`].dobMonth !== ''
      && details[`marital-partner-${maritalStatus}`].dobDay !== '') {
        const partnerDob = details[`marital-partner-${maritalStatus}`];
        json.partnerDetail.dob = formatDate(partnerDob.dobYear, partnerDob.dobMonth, partnerDob.dobDay);
        json.partnerDetail.dobQ = i18n.t('marital-details:fields.dob.legend');
      }
    }

    if (details.isOverseas) {
      json.overseasAccountDetail = this.accountDetailsOverseasTransformer(details['account-details-overseas'], accountStatus);
      json.overseasAccountDetailQ = i18n.t('account-overseas:header');
    } else {
      json.accountDetail = this.accountDetailsTransformer(details['account-details'], accountStatus);
      json.accountDetailQ = i18n.t('account:header');
    }

    json.inviteKey = details.inviteKey;
    json.inviteKeyQ = i18n.t('auth:fields.inviteKey.label');

    json.confirmedAddress = true;
    if (!generalHelper.isThisUndefinedOrEmtpy(details['verify-details'])
    && !generalHelper.isThisUndefinedOrEmtpy(details['verify-details'].address)) {
      json.confirmedAddressQ = i18n.t('verify-your-details:fields.address.legend');
    } else if (details.isOverseas) {
      json.confirmedAddressQ = i18n.t('auth:fields.address-overseas.legend');
    } else {
      json.confirmedAddressQ = i18n.t('auth:fields.address.legend');
    }

    json.declaration = true;
    json.declarationQ = i18n.t('declaration:header');

    if (json.livedPeriodsAbroad.length === 0) {
      delete json.livedPeriodsAbroad;
      delete json.livedPeriodsAbroadQ;
    }

    if (json.workedPeriodsAbroad.length === 0) {
      delete json.workedPeriodsAbroad;
      delete json.workedPeriodsAbroadQ;
    }

    if (details.userDateOfBirthInfo.newDobVerification) {
      json.dobVerification = details.userDateOfBirthInfo.newDobVerification;
      json.dobVerificationQ = i18n.t('app:pdf.userVerficationStatus');
    } else {
      json.dobVerification = details.customerDetails.dobVerification;
      json.dobVerificationQ = i18n.t('app:pdf.verficationStatus');
    }

    if (details['dob-details']) {
      json.userAssertedDob = formatDate(details['dob-details'].dateYear, details['dob-details'].dateMonth, details['dob-details'].dateDay);
      json.userAssertedDobQ = i18n.t('app:pdf.userDOB');

      if (details.userDateOfBirthInfo.newStatePensionDate) {
        json.reCalculatedSpaDate = details.userDateOfBirthInfo.newStatePensionDate;
        json.reCalculatedSpaDateQ = i18n.t('app:pdf.statePensionAge');
      }
    }

    json.claimFromDate = null;
    json.claimFromDateQ = null;
    if (details.claimFromDate) {
      const claimFromDate = moment(
        `${details.claimFromDate.dateYear}-${details.claimFromDate.dateMonth}-${details.claimFromDate.dateDay}`,
        'YYYY-MM-DD',
      ).startOf('day');
      let statePensionDate = moment(details.customerDetails.statePensionDate, 'x').startOf('day');
      if (details.userDateOfBirthInfo.newStatePensionDate && details.userDateOfBirthInfo.newDobVerification !== 'V') {
        statePensionDate = moment(details.userDateOfBirthInfo.newStatePensionDate, 'x').startOf('day');
      }
      if (statePensionDate.isSame(claimFromDate) === false) {
        json.claimFromDate = formatDate(details.claimFromDate.dateYear, details.claimFromDate.dateMonth, details.claimFromDate.dateDay);

        if (details.isBeforeSpa) {
          json.claimFromDateQ = i18n.t('pension-start-date:beforeSpa.fields.claimFromDate.legend');
        } else {
          json.claimFromDateQ = i18n.t('pension-start-date:afterSpa.fields.claimFromDate.legend');
        }
      }
    }

    json.welshIndicator = false;
    if (language === 'cy-GB') {
      json.welshIndicator = true;
    }
    return json;
  },
  residentialAddressObject(customerDetails) {
    const residentialAddressUKQuestions = {
      thoroughfareNameQ: i18n.t('customer-details:field_names.address_details.uk.residential_address.thoroughfare_name'),
      postCodeQ: i18n.t('customer-details:field_names.address_details.uk.residential_address.postcode'),
    };
    const questions = {
      subBuildingNameQ: 'customer-details:field_names.address_details.uk.residential_address.sub_building_name',
      buildingNameQ: 'customer-details:field_names.address_details.uk.residential_address.building_name',
      buildingNumberQ: 'customer-details:field_names.address_details.uk.residential_address.building_number',
      dependentThoroughfareNameQ: 'customer-details:field_names.address_details.uk.residential_address.dependent_thoroughfare_name',
      dependentLocalityQ: 'customer-details:field_names.address_details.uk.residential_address.dependent_locality',
      postTownQ: 'customer-details:field_names.address_details.uk.residential_address.post_town',
    };

    if (customerDetails.residentialAddress.subBuildingName) {
      residentialAddressUKQuestions.subBuildingNameQ = i18n.t(questions.subBuildingNameQ);
    }
    if (customerDetails.residentialAddress.buildingName) {
      residentialAddressUKQuestions.buildingNameQ = i18n.t(questions.buildingNameQ);
    }
    if (customerDetails.residentialAddress.buildingNumber) {
      residentialAddressUKQuestions.buildingNumberQ = i18n.t(questions.buildingNumberQ);
    }
    if (customerDetails.residentialAddress.dependentThoroughfareName) {
      residentialAddressUKQuestions.dependentThoroughfareNameQ = i18n.t(questions.dependentThoroughfareNameQ);
    }
    if (customerDetails.residentialAddress.dependentLocality) {
      residentialAddressUKQuestions.dependentLocalityQ = i18n.t(questions.dependentLocalityQ);
    }
    if (customerDetails.residentialAddress.postTown) {
      residentialAddressUKQuestions.postTownQ = i18n.t(questions.postTownQ);
    }

    return residentialAddressUKQuestions;
  },
  correspondenceAddressObject(customerDetails) {
    const correspondenceAddressUKQuestions = {
      thoroughfareNameQ: i18n.t('customer-details:field_names.address_details.uk.correspondence_address.thoroughfare_name'),
      postCodeQ: i18n.t('customer-details:field_names.address_details.uk.correspondence_address.postcode'),
    };

    const questions = {
      subBuildingNameQ: 'customer-details:field_names.address_details.uk.correspondence_address.sub_building_name',
      buildingNameQ: 'customer-details:field_names.address_details.uk.correspondence_address.building_name',
      buildingNumberQ: 'customer-details:field_names.address_details.uk.correspondence_address.building_number',
      dependentThoroughfareNameQ: 'customer-details:field_names.address_details.uk.correspondence_address.dependent_thoroughfare_name',
      dependentLocalityQ: 'customer-details:field_names.address_details.uk.correspondence_address.dependent_locality',
      postTownQ: 'customer-details:field_names.address_details.uk.correspondence_address.post_town',
    };

    if (customerDetails.correspondenceAddress.subBuildingName) {
      correspondenceAddressUKQuestions.subBuildingNameQ = i18n.t(questions.subBuildingNameQ);
    }
    if (customerDetails.correspondenceAddress.buildingName) {
      correspondenceAddressUKQuestions.buildingNameQ = i18n.t(questions.buildingNameQ);
    }
    if (customerDetails.correspondenceAddress.buildingNumber) {
      correspondenceAddressUKQuestions.buildingNumberQ = i18n.t(questions.buildingNumberQ);
    }
    if (customerDetails.correspondenceAddress.dependentThoroughfareName) {
      correspondenceAddressUKQuestions.dependentThoroughfareNameQ = i18n.t(questions.dependentThoroughfareNameQ);
    }
    if (customerDetails.correspondenceAddress.dependentLocality) {
      correspondenceAddressUKQuestions.dependentLocalityQ = i18n.t(questions.dependentLocalityQ);
    }
    if (customerDetails.correspondenceAddress.postTown) {
      correspondenceAddressUKQuestions.postTownQ = i18n.t(questions.postTownQ);
    }

    return correspondenceAddressUKQuestions;
  },
};
