const assert = require('assert');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../../config/i18next');

const validation = require('../../../../../lib/validations/overseasValidation');

const emptyObject = {
  'country-name[0]': '', 'country-name[1]': '', 'country-name[2]': '', 'country-name[3]': '',
};
const populatedValid = {
  'country-name[0]': 'Afghanistan', 'country-name[1]': 'Albania', 'country-name[2]': 'France', 'country-name[3]': 'Aruba',
};
const populatedValidSecond = {
  'country-name[0]': '', 'country-name[1]': 'Albania', 'country-name[2]': '', 'country-name[3]': '',
};
const populatedNotValid = {
  'country-name[0]': 'France1', 'country-name[1]': 'France2', 'country-name[2]': 'France3', 'country-name[3]': 'France4',
};
const populatedValidMutiple = {
  'country-name[0]': 'Afghanistan', 'country-name[1]': 'Afghanistan', 'country-name[2]': 'France', 'country-name[3]': 'France',
};
const populatedValidMutiple2 = {
  'country-name[0]': 'Afghanistan', 'country-name[1]': 'France', 'country-name[2]': 'France', 'country-name[3]': 'France',
};
const populatedValidMutiple3 = {
  'country-name[0]': 'Afghanistan', 'country-name[1]': 'Germany', 'country-name[2]': 'France', 'country-name[3]': 'Afghanistan',
};
const countryList = [{ name: 'Afghanistan' }, { name: 'Albania' }, { name: 'Aruba' }, { name: 'France' }, { name: 'Germany' }];

describe('countries validation - CY', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  describe('country', () => {
    it('should return error if list is empty', () => {
      const validationResponse = validation.countries(emptyObject, 'lived', countryList, 'cy');
      assert.equal(validationResponse['country-name[0]'].text, 'Rhowch enw gwlad.');
      assert.equal(validationResponse['country-name[1]'], undefined);
      assert.equal(validationResponse['country-name[2]'], undefined);
      assert.equal(validationResponse['country-name[3]'], undefined);
    });

    it('should return error if country supplied is not a valid country', () => {
      const validationResponse = validation.countries(populatedNotValid, 'lived', countryList, 'cy');
      assert.equal(validationResponse['country-name[0]'].text, 'Mae\'n rhaid i enw gwlad ddechrau gyda llythyren a dim ond llythrennau a i z, gofodau, cysylltnodau neu gromfachau.');
      assert.equal(validationResponse['country-name[1]'].text, 'Mae\'n rhaid i enw gwlad ddechrau gyda llythyren a dim ond llythrennau a i z, gofodau, cysylltnodau neu gromfachau.');
      assert.equal(validationResponse['country-name[2]'].text, 'Mae\'n rhaid i enw gwlad ddechrau gyda llythyren a dim ond llythrennau a i z, gofodau, cysylltnodau neu gromfachau.');
      assert.equal(validationResponse['country-name[3]'].text, 'Mae\'n rhaid i enw gwlad ddechrau gyda llythyren a dim ond llythrennau a i z, gofodau, cysylltnodau neu gromfachau.');
      assert.equal(validationResponse['country-name[0]'].visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse['country-name[1]'].visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse['country-name[2]'].visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse['country-name[3]'].visuallyHiddenText, 'Gwall');
    });

    it('should return errors if valid country supplied but appears twice', () => {
      const validationResponse = validation.countries(populatedValidMutiple, 'lived', countryList, 'cy');
      assert.equal(validationResponse['country-name[0]'], undefined);
      assert.equal(validationResponse['country-name[1]'].text, 'Rhowch bob gwlad unwaith.');
      assert.equal(validationResponse['country-name[2]'], undefined);
      assert.equal(validationResponse['country-name[3]'].text, 'Rhowch bob gwlad unwaith.');
      assert.equal(validationResponse['country-name[1]'].visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse['country-name[3]'].visuallyHiddenText, 'Gwall');

      const validationResponse2 = validation.countries(populatedValidMutiple2, 'lived', countryList, 'cy');
      assert.equal(validationResponse2['country-name[0]'], undefined);
      assert.equal(validationResponse2['country-name[1]'], undefined);
      assert.equal(validationResponse2['country-name[2]'].text, 'Rhowch bob gwlad unwaith.');
      assert.equal(validationResponse2['country-name[3]'].text, 'Rhowch bob gwlad unwaith.');
      assert.equal(validationResponse2['country-name[2]'].visuallyHiddenText, 'Gwall');
      assert.equal(validationResponse2['country-name[3]'].visuallyHiddenText, 'Gwall');

      const validationResponse3 = validation.countries(populatedValidMutiple3, 'lived', countryList, 'cy');
      assert.equal(validationResponse3['country-name[0]'], undefined);
      assert.equal(validationResponse3['country-name[1]'], undefined);
      assert.equal(validationResponse3['country-name[2]'], undefined);
      assert.equal(validationResponse3['country-name[3]'].text, 'Rhowch bob gwlad unwaith.');
      assert.equal(validationResponse3['country-name[3]'].visuallyHiddenText, 'Gwall');
    });

    it('should return no error if valid country supplied', () => {
      const validationResponse = validation.countries(populatedValid, 'lived', countryList, 'cy');
      assert.equal(validationResponse['country-name[0]'], undefined);
      assert.equal(validationResponse['country-name[1]'], undefined);
      assert.equal(validationResponse['country-name[2]'], undefined);
      assert.equal(validationResponse['country-name[3]'], undefined);

      const validationResponse2 = validation.countries(populatedValidSecond, 'lived', countryList, 'cy');
      assert.equal(validationResponse2['country-name[0]'], undefined);
      assert.equal(validationResponse2['country-name[1]'], undefined);
      assert.equal(validationResponse2['country-name[2]'], undefined);
      assert.equal(validationResponse2['country-name[3]'], undefined);
    });
  });
});
