const { assert } = require('chai');
const languageHelper = require('../../../../lib/helpers/languageHelper');

const welshISO = 'cy';
const englishISO = 'en';
let genericRequest = { session: {} };

describe('Language helper ', () => {
  describe('setLocale', () => {
    beforeEach(() => {
      genericRequest = {
        session: {},
        lang: '',
        i18n: {
          setLng: (lang) => {
            genericRequest.lang = lang;
          },
        },
      };
    });

    it('should set session to welsh when cy supplied as language', () => {
      languageHelper.setLocale(genericRequest, welshISO);
      assert.equal(genericRequest.session.lang, 'cy-GB');
      assert.equal(genericRequest.lang, 'cy-GB');
    });

    it('should set session to english when en supplied as language', () => {
      languageHelper.setLocale(genericRequest, englishISO);
      assert.equal(genericRequest.session.lang, 'en-GB');
      assert.equal(genericRequest.lang, 'en-GB');
    });

    it('should set session to english when an unknown language supplied', () => {
      languageHelper.setLocale(genericRequest, englishISO);
      assert.equal(genericRequest.session.lang, 'en-GB');
      assert.equal(genericRequest.lang, 'en-GB');
    });
  });
});
