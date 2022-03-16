const validator = require('validator');
const moment = require('moment');

const alphaChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const alphaNumericChars = 'a-zA-Z0-9';
const punctuation = '. \u2019\'-';
const punctuation2 = '., \u2019\'-';

const characterFilterRegEx = `^[${alphaChars}][${alphaChars}.  ’'-]+$`;
const characterFilterRegExAndAmpersand = `^[${alphaChars}][&${alphaChars}.  ’'-]+$`;
// eslint-disable-next-line max-len
const characterFilterRegExMinOne = `^([${alphaChars}]|[${alphaChars}]((?!([${punctuation}]){2})[${alphaChars}${punctuation}]){0,140}[${alphaChars}])$`;
const characterFilterRegExMinTwo = `^[${alphaChars}]((?!([${punctuation}]){2})[${alphaChars}${punctuation}]){0,140}[${alphaChars}]$`;

const validInviteKeyCharacters = '^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$';

// eslint-disable-next-line max-len
const buildingNameNumberRegEx = `^([${alphaNumericChars}]|[${alphaNumericChars}]((?!([${punctuation2}]){2})[${alphaNumericChars}${punctuation2}]){0,140}[${alphaNumericChars}])$`;
const streetRegEx = `^([${alphaChars}]|[${alphaChars}]((?!([${punctuation2}]){2})[${alphaChars}${punctuation2}]){0,140}[${alphaChars}])$`;
const telephoneNumberRegEx = '^[0-9 ]+$';
const rollRegEx = '^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0-9 /\' ’*&().,-]+$';
const yesNoReg = '^(?:yes|no)$';
const validMaritalStatusReg = '^(?:single|married|civil|widowed|divorced|dissolved)$';
const validEaseOfUseReg = '^(?:veryEasy|easy|difficult|veryDifficult)$';
const validHelperReg = '^(?:yourself|someoneElse|onBehalf)$';
const serviceReceivedReg = '^(?:verySatisfied|satisfied|neither|dissatisfied|veryDissatisfied)$';
const validAuthTypeReg = '^(?:invite|verify)$';

const asciiCode32to127 = '^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0-9 \\\\[\\]`!^_"#$%&\'()&+,-./:;<>=?@{|}~*]+$';
const characterLength24 = 24;
const characterLength35 = 35;
const characterLength70 = 70;
const characterLength100 = 100;
const characterLength140 = 140;
const characterLength1200 = 1200;
const yearLength = 4;

const postcodeRegEx = '^(?![QVX])[A-Z]((?![IJZ])[A-Z]\\d((\\d?)|([ABEHMNPRVWXY]?))'
  + '|(\\d(\\d?|[ABCDEFGHJKPSTUW]?))) ?\\d((?![CIKMOV])[A-Z]){2}$|^(BFPO)[ ]?\\d{1,4}$';

module.exports = {
  easeOfUseValidator(string) {
    if (string === undefined) {
      return false;
    }
    const validEaseOfUse = new RegExp(validEaseOfUseReg);
    if (validEaseOfUse.test(string)) {
      return true;
    }
    return false;
  },
  helperInfoValidator(string) {
    if (string === undefined) {
      return false;
    }
    const validHelper = new RegExp(validHelperReg);
    if (validHelper.test(string)) {
      return true;
    }
    return false;
  },
  serviceReceivedValidator(string) {
    if (string === undefined) {
      return false;
    }
    const serviceReceived = new RegExp(serviceReceivedReg);
    if (serviceReceived.test(string)) {
      return true;
    }
    return false;
  },
  checkIfYesOrNo(string) {
    const yesNoCheck = new RegExp(yesNoReg);
    if (yesNoCheck.test(string)) {
      return true;
    }
    return false;
  },
  checkIfGreaterThenTwentyFour(string) {
    if (string.length > characterLength24) {
      return true;
    }
    return false;
  },
  checkIfGreaterThenThirtyFive(string) {
    if (string.length > characterLength35) {
      return true;
    }
    return false;
  },
  checkIfGreaterThenSeventy(string) {
    if (string.length > characterLength70) {
      return true;
    }
    return false;
  },
  checkIfGreaterThenOneHundred(string) {
    if (string.length > characterLength100) {
      return true;
    }
    return false;
  },
  checkIfGreaterThenOneHundredAndForty(string) {
    if (string.length > characterLength140) {
      return true;
    }
    return false;
  },
  checkIfGreaterThenOneThousandTwoHundred(string) {
    if (string.length > characterLength1200) {
      return true;
    }
    return false;
  },
  checkIfValidMaritalStatus(string) {
    const validMaritalStatus = new RegExp(validMaritalStatusReg);
    if (validMaritalStatus.test(string)) {
      return true;
    }
    return false;
  },
  checkIfValidRollNumber(string) {
    const rollCheck = new RegExp(rollRegEx);
    if (rollCheck.test(string)) {
      return true;
    }
    return false;
  },
  checkIfValidAsciiCode32to127(string) {
    const asciiCheck = new RegExp(asciiCode32to127);
    if (asciiCheck.test(string)) {
      return true;
    }
    return false;
  },
  checkFirstNameCharacters(string) {
    const characterCheck = new RegExp(characterFilterRegExMinOne);
    return characterCheck.test(string);
  },
  checkLastNameCharacters(string) {
    const characterCheck = new RegExp(characterFilterRegExMinTwo);
    return characterCheck.test(string);
  },
  checkSurnameCharacters(string) {
    const characteCheck = new RegExp(characterFilterRegEx);
    if (characteCheck.test(string)) {
      return true;
    }
    return false;
  },
  checkSurnameCharactersAndAmpersand(string) {
    const characteCheck = new RegExp(characterFilterRegExAndAmpersand);
    if (characteCheck.test(string)) {
      return true;
    }
    return false;
  },
  checkIfValidTelephoneNumberWithSpaces(string) {
    const telephoneCheck = new RegExp(telephoneNumberRegEx);
    if (telephoneCheck.test(string)) {
      return false;
    }
    return true;
  },
  isDateValid(day, month, year) {
    if ((!validator.isNumeric(`${day}`) || !validator.isNumeric(`${month}`) || !validator.isNumeric(`${year}`))) {
      return false;
    }
    if (year.toString().length !== yearLength) {
      return false;
    }
    if (!validator.isISO8601(`${year}-${this.formatDate(month)}-${this.formatDate(day)}`, { strict: true })) {
      return false;
    }
    return true;
  },
  formatDate(datePart) {
    if (datePart !== undefined && datePart.toString().length === 1) {
      return `0${datePart}`;
    }
    return datePart;
  },
  isValidMonthYear(month, year) {
    if (!validator.isNumeric(`${month}`) || !validator.isNumeric(`${year}`)) {
      return false;
    }
    if (year.toString().length !== yearLength) {
      return false;
    }
    if (Number(month) < 1 || Number(month) > 12) {
      return false;
    }
    return true;
  },
  isFutureMonthYear(month, year) {
    const currentDate = moment();
    const currentMonth = currentDate.format('M');
    const currentYear = currentDate.format('YYYY');
    if (year > currentYear) {
      return true;
    }
    if (year === currentYear && Number(month) > currentMonth) {
      return true;
    }
    return false;
  },
  isDateBeforeToday(day, month, year) {
    let formatMonth = month;
    if (month !== undefined) {
      if (month.length === 1) {
        formatMonth = `0${month}`;
      }
    }
    const dateToday = new Date();
    if (validator.isBefore(`${year}-${formatMonth}-${day}`, dateToday)) {
      return true;
    }
    return false;
  },
  isDateAfterToday(day, month, year) {
    let formatMonth = month;
    if (month !== undefined) {
      if (month.length === 1) {
        formatMonth = `0${month}`;
      }
    }
    const dateToday = new Date();
    if (validator.isAfter(`${year}-${formatMonth}-${day}`, dateToday.toISOString())) {
      return true;
    }
    return false;
  },
  isThisUndefinedOrEmtpy(input) {
    if (input === undefined) {
      return true;
    }
    if (input === '') {
      return true;
    }
    return false;
  },
  isThisDefined(input) {
    if (input === undefined) {
      return false;
    }
    return true;
  },
  isBankOrBuilding(input) {
    if (input === 'bank' || input === 'building') {
      return true;
    }
    return false;
  },
  checkIfStartsWithSpace(text) {
    if (text[0] === ' ') {
      return true;
    }
    return false;
  },
  isValidAuthType(string) {
    const characteCheck = new RegExp(validAuthTypeReg);
    if (characteCheck.test(string)) {
      return true;
    }
    return false;
  },
  checkInviteKeyCharacters(string) {
    const characteCheck = new RegExp(validInviteKeyCharacters);
    if (characteCheck.test(string)) {
      return true;
    }
    return false;
  },
  noWhiteSpace(strings, ...placeholders) {
    // Build the string as normal, combining all the strings and placeholders:
    const withSpace = strings.reduce((result, string, i) => (result + placeholders[i - 1] + string));
    const withoutSpace = withSpace.replace(/\s\s+/g, ' ');
    return withoutSpace;
  },
  isValidUkPostcode(value) {
    const postcodeCheck = new RegExp(postcodeRegEx, 'i');
    return postcodeCheck.test(value);
  },
  checkIfValidBuildingNameNumber(string) {
    const validCharacters = new RegExp(buildingNameNumberRegEx, 'i');
    return validCharacters.test(string);
  },
  checkIfValidStreet(string) {
    const validCharacters = new RegExp(streetRegEx, 'i');
    return validCharacters.test(string);
  },
  checkIfValidTown(string) {
    const validCharacters = new RegExp(characterFilterRegExMinOne, 'i');
    return validCharacters.test(string);
  },
};
