const generalHelper = require('../validations/utils/general.js');
const { cleanSortCode } = require('../utils/sortCode.js');

module.exports = {
  bankDetailsToObjectWithCustomerDetails(details, customerDetails, userDetails) {
    let customerDateOfBirth = customerDetails.dob;
    if (userDetails) {
      customerDateOfBirth = `${userDetails.dateYear}-${userDetails.dateMonth}-${userDetails.dateDay}T00:00:00.000Z`;
    }

    const customer = {
      firstName: customerDetails.firstName,
      surname: customerDetails.surname,
      title: customerDetails.title,
      dob: customerDateOfBirth,
      residentialAddress: {
        postCode: customerDetails.residentialAddress.postCode,
      },
    };

    if (customerDetails.residentialAddress.thoroughfareName) {
      customer.residentialAddress.thoroughfareName = customerDetails.residentialAddress.thoroughfareName;
    }

    if (customerDetails.residentialAddress.subBuildingName) {
      customer.residentialAddress.subBuildingName = customerDetails.residentialAddress.subBuildingName;
    }

    if (customerDetails.residentialAddress.buildingNumber) {
      customer.residentialAddress.buildingNumber = customerDetails.residentialAddress.buildingNumber;
    }

    if (customerDetails.residentialAddress.buildingName) {
      customer.residentialAddress.buildingName = customerDetails.residentialAddress.buildingName;
    }
    const accountDetails = this.accountDetailsTransormer(details);

    return Object.assign(accountDetails, customer);
  },
  accountDetailsTransormer(details) {
    if (details.paymentMethod === 'building' && generalHelper.isThisUndefinedOrEmtpy(details.buildingRoll)) {
      return {
        bankData: {
          sortCode: details.bankSortCode,
          accountNumber: details.buildingAccountNumber,
        },
      };
    }
    return {
      bankData: {
        sortCode: cleanSortCode(details.bankSortCode),
        accountNumber: details.bankAccountNumber,
      },
    };
  },
};
