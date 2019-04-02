module.exports = {
  bankObject(details) {
    const formObject = {};

    if (details.paymentMethod !== undefined) {
      formObject.paymentMethod = details.paymentMethod;
    }
    if (details.accountHolder === undefined) {
      formObject.accountHolder = 'string';
    } else {
      formObject.accountHolder = details.accountHolder;
    }
    if (details.accountNumber === undefined) {
      formObject.accountNumber = '12345678';
    } else {
      formObject.accountNumber = details.accountNumber;
    }
    if (details.sortCode === undefined) {
      formObject.sortCode = '123456';
    } else {
      formObject.sortCode = details.sortCode;
    }
    if (details.buildingAccountHolder === undefined) {
      formObject.buildingAccountHolder = 'string';
    } else {
      formObject.buildingAccountHolder = details.buildingAccountHolder;
    }
    if (details.buildingAccountNumber === undefined) {
      formObject.buildingAccountNumber = '12345678';
    } else {
      formObject.buildingAccountNumber = details.buildingAccountNumber;
    }
    if (details.buildingSortCode === undefined) {
      formObject.buildingSortCode = '123456';
    } else {
      formObject.buildingSortCode = details.buildingSortCode;
    }
    if (details.rollNumber === undefined) {
      formObject.rollNumber = '12345678';
    } else {
      formObject.rollNumber = details.rollNumber;
    }
    return formObject;
  },
  authObject(details) {
    const formObject = {};

    if (details.dobDay === undefined) {
      formObject.dobDay = '10';
    } else {
      formObject.dobDay = details.dobDay;
    }
    if (details.dobMonth === undefined) {
      formObject.dobMonth = '12';
    } else {
      formObject.dobMonth = details.dobMonth;
    }
    if (details.dobYear === undefined) {
      formObject.dobYear = '1945';
    } else {
      formObject.dobYear = details.dobYear;
    }
    if (details.surname === undefined) {
      formObject.surname = 'TestSurname';
    } else {
      formObject.surname = details.surname;
    }
    if (details.value7 === undefined) {
      formObject.value7 = '2';
    } else {
      formObject.value7 = details.value7;
    }
    if (details.value8 === undefined) {
      formObject.value8 = '9';
    } else {
      formObject.value8 = details.value8;
    }

    return formObject;
  },
  maritalDateObject(details) {
    const formObject = {};
    if (details.dateDay === undefined) {
      formObject.datebDay = '10';
    } else {
      formObject.dateDay = details.dateDay;
    }
    if (details.dateMonth === undefined) {
      formObject.dateMonth = '12';
    } else {
      formObject.dateMonth = details.dateMonth;
    }
    if (details.dateYear === undefined) {
      formObject.datYear = '1945';
    } else {
      formObject.dateYear = details.dateYear;
    }
    return formObject;
  },
  partnerDetail(details) {
    const formObject = {};

    if (details.firstName === undefined) {
      formObject.firstName = 'First';
    } else {
      formObject.firstName = details.firstName;
    }

    if (details.surname === undefined) {
      formObject.surname = 'Last';
    } else {
      formObject.surname = details.surname;
    }

    if (details.otherName === undefined) {
      formObject.otherName = '';
    } else {
      formObject.otherName = details.otherName;
    }

    if (details.dobDay === undefined) {
      formObject.dobDay = '10';
    } else {
      formObject.dobDay = details.dobDay;
    }
    if (details.dobMonth === undefined) {
      formObject.dobMonth = '12';
    } else {
      formObject.dobMonth = details.dobMonth;
    }
    if (details.dobYear === undefined) {
      formObject.dobYear = '1945';
    } else {
      formObject.dobYear = details.dobYear;
    }
    return formObject;
  },
};
