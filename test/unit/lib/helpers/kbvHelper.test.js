/* eslint-disable mocha/no-skipped-tests */
const { assert } = require('chai');
const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../config/i18next');

const helper = require('../../../../lib/helpers/kbvHelper');

const kbvTranslationRequest = require('../../../lib/kvbTranslation/kbvTranslationRequest');
const kbvTranslationResponse = require('../../../lib/kvbTranslation/kbvTranslationResponse');

const validCurrency = [
  '0',
  '1',
  '0.10',
  '1.10',
  '1.10',
  '11.10',
  '999',
  '999.51',
  '1,999',
  '1,999.51',
  '11,999.51',
  '111,999.51',
  '1,999,999.51',
  '11,999,999.51',
  '111,999,999.51',
  '1,111,999,999.51',
];

describe('kbv helper ', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  beforeEach(() => {
    i18next.changeLanguage('en');
  });

  describe('translateQuestion', () => {
    context('KBV1', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV1Request()), kbvTranslationResponse.KBV1Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV1Request(), 'cy'), kbvTranslationResponse.KBV1Response('cy'));
      });
    });

    context('KBV2', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV2Request()), kbvTranslationResponse.KBV2Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV2Request(), 'cy'), kbvTranslationResponse.KBV2Response('cy'));
      });
    });

    context('KBV3', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV3Request()), kbvTranslationResponse.KBV3Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV3Request(), 'cy'), kbvTranslationResponse.KBV3Response('cy'));
      });
    });

    context.skip('KBV4', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV5Request()), kbvTranslationResponse.KBV5Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV4Request(), 'cy'), kbvTranslationResponse.KBV5Response('cy'));
      });
    });

    context('KBV5', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV5Request()), kbvTranslationResponse.KBV5Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV5Request(), 'cy'), kbvTranslationResponse.KBV5Response('cy'));
      });
    });

    context('KBV6', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV6Request()), kbvTranslationResponse.KBV6Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV6Request(), 'cy'), kbvTranslationResponse.KBV6Response('cy'));
      });
    });

    context('KBV7', () => {
      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV7Request()), kbvTranslationResponse.KBV7Response());
      });

      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV7Request(), 'cy'), kbvTranslationResponse.KBV7Response('cy'));
      });
    });

    context('KBV8', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV8Request()), kbvTranslationResponse.KBV8Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV8Request(), 'cy'), kbvTranslationResponse.KBV8Response('cy'));
      });
    });

    context('KBV9', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV9Request()), kbvTranslationResponse.KBV9Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV9Request(), 'cy'), kbvTranslationResponse.KBV9Response('cy'));
      });
    });

    context('KBV10', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV10Request()), kbvTranslationResponse.KBV10Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV10Request(), 'cy'), kbvTranslationResponse.KBV10Response('cy'));
      });
    });

    context('KBV11', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV11Request()), kbvTranslationResponse.KBV11Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV11Request(), 'cy'), kbvTranslationResponse.KBV11Response('cy'));
      });
    });

    context('KBV12', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV12Request()), kbvTranslationResponse.KBV12Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV12Request(), 'cy'), kbvTranslationResponse.KBV12Response('cy'));
      });
    });

    context('KBV13', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV13Request()), kbvTranslationResponse.KBV13Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV13Request(), 'cy'), kbvTranslationResponse.KBV13Response('cy'));
      });
    });

    context('KBV14', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV14Request()), kbvTranslationResponse.KBV14Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV14Request(), 'cy'), kbvTranslationResponse.KBV14Response('cy'));
      });
    });

    context('KBV15', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV15Request()), kbvTranslationResponse.KBV15Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV15Request(), 'cy'), kbvTranslationResponse.KBV15Response('cy'));
      });
    });

    context('KBV16', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV16Request()), kbvTranslationResponse.KBV16Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV16Request(), 'cy'), kbvTranslationResponse.KBV16Response('cy'));
      });
    });

    context('KBV17', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV17Request()), kbvTranslationResponse.KBV17Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV17Request(), 'cy'), kbvTranslationResponse.KBV17Response('cy'));
      });
    });

    context('KBV18', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV18Request()), kbvTranslationResponse.KBV18Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV18Request(), 'cy'), kbvTranslationResponse.KBV18Response('cy'));
      });
    });

    context('KBV19', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV19Request()), kbvTranslationResponse.KBV19Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV19Request(), 'cy'), kbvTranslationResponse.KBV19Response('cy'));
      });
    });

    context('KBV20', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV20Request()), kbvTranslationResponse.KBV20Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV20Request(), 'cy'), kbvTranslationResponse.KBV20Response('cy'));
      });
    });

    context('KBV28', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV21Request()), kbvTranslationResponse.KBV21Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV21Request(), 'cy'), kbvTranslationResponse.KBV21Response('cy'));
      });
    });

    context('KBV22', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV22Request()), kbvTranslationResponse.KBV22Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV22Request(), 'cy'), kbvTranslationResponse.KBV22Response('cy'));
      });
    });

    it.skip('KBV23', () => {
      assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV22Request()), kbvTranslationResponse.KBV22Response());
    });

    it.skip('KBV24', () => {
      assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV22Request()), kbvTranslationResponse.KBV22Response());
    });

    it.skip('KBV25', () => {
      assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV22Request()), kbvTranslationResponse.KBV22Response());
    });

    it.skip('KBV26', () => {
      assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV22Request()), kbvTranslationResponse.KBV22Response());
    });

    it.skip('KBV27', () => {
      assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV22Request()), kbvTranslationResponse.KBV22Response());
    });

    it.skip('KBV28', () => {
      assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV28Request()), kbvTranslationResponse.KBV28Response());
    });

    context('KBV29', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV29Request()), kbvTranslationResponse.KBV29Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV29Request(), 'cy'), kbvTranslationResponse.KBV29Response('cy'));
      });
    });

    context('KBV30', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV30Request()), kbvTranslationResponse.KBV30Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV30Request(), 'cy'), kbvTranslationResponse.KBV30Response('cy'));
      });
    });

    context('KBV31', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV31Request()), kbvTranslationResponse.KBV31Response());
      });
      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV31Request(), 'cy'), kbvTranslationResponse.KBV31Response('cy'));
      });
    });

    context('KBV32', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV32Request()), kbvTranslationResponse.KBV32Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV32Request(), 'cy'), kbvTranslationResponse.KBV32Response('cy'));
      });
    });

    context('KBV33', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV33Request()), kbvTranslationResponse.KBV33Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV33Request(), 'cy'), kbvTranslationResponse.KBV33Response('cy'));
      });
    });

    context('KBV34', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV34Request()), kbvTranslationResponse.KBV34Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV34Request(), 'cy'), kbvTranslationResponse.KBV34Response('cy'));
      });
    });

    context('KBV35', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV35Request()), kbvTranslationResponse.KBV35Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV35Request(), 'cy'), kbvTranslationResponse.KBV35Response('cy'));
      });
    });

    context('KBV36', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV36Request()), kbvTranslationResponse.KBV36Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV36Request(), 'cy'), kbvTranslationResponse.KBV36Response('cy'));
      });
    });

    context('KBV37', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV37Request()), kbvTranslationResponse.KBV37Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV37Request(), 'cy'), kbvTranslationResponse.KBV37Response('cy'));
      });
    });

    context('KBV38', () => {
      it('en', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV38Request()), kbvTranslationResponse.KBV38Response());
      });

      it('cy', () => {
        assert.deepEqual(helper.translateQuestion(kbvTranslationRequest.KBV38Request(), 'cy'), kbvTranslationResponse.KBV38Response('cy'));
      });
    });
  });

  describe('extractMoneyFromString', () => {
    it('should be defined', () => {
      assert.isDefined(helper.extractMoneyFromString);
    });

    it('should be a function', () => {
      assert.isFunction(helper.extractMoneyFromString);
    });

    it('should return blank array when no money in string', () => {
      assert.lengthOf(helper.extractMoneyFromString('This is a string without money'), 0);
    });

    validCurrency.forEach((currency) => {
      it(`should return populated array with 1 item when in format ${currency}`, () => {
        const response = helper.extractMoneyFromString(`This is a string with ${currency} of money`);
        assert.lengthOf(response, 1);
        assert.deepEqual(response, [`${currency}`]);
      });

      it(`should return populated array with 1 item when in format £${currency}`, () => {
        const response = helper.extractMoneyFromString(`This is a string has £${currency} of money`);
        assert.lengthOf(response, 1);
        assert.deepEqual(response, [`£${currency}`]);
      });

      it(`should return populated array with 2 items when two values in string ${currency}`, () => {
        const response = helper.extractMoneyFromString(`This is a string has £${currency} - £${currency} of money`);
        assert.lengthOf(response, 2);
        assert.deepEqual(response, [`£${currency}`, `£${currency}`]);
      });
    });
  });

  describe('translateYesNoOption', () => {
    it('should be defined', () => {
      assert.isDefined(helper.translateYesNoOption);
    });

    it('should be a function', () => {
      assert.isFunction(helper.translateYesNoOption);
    });

    it('should be translate Yes option to Yes in english when language is set as \'en\'', () => {
      assert.equal(helper.translateYesNoOption('Yes'), i18next.getFixedT('en')('kbv-questions:answers.yes.v1'));
    });

    it('should be translate Yes option to Yes in welsh when language is set as \'cy\'', () => {
      i18next.changeLanguage('cy');
      assert.equal(helper.translateYesNoOption('Yes'), i18next.getFixedT('cy')('kbv-questions:answers.yes.v1'));
    });

    it('should be translate Yes option with spaces to Yes in welsh when language is set as \'en\'', () => {
      assert.equal(helper.translateYesNoOption('  Yes '), i18next.getFixedT('en')('kbv-questions:answers.yes.v1'));
    });

    it('should be translate Yes option to Yes v2 in english when language is set as \'en\'', () => {
      assert.equal(helper.translateYesNoOption('Yes', true), i18next.getFixedT('en')('kbv-questions:answers.yes.v2'));
    });

    it('should be translate Yes option to Yes v2 in welsh when language is set as \'cy\'', () => {
      i18next.changeLanguage('cy');
      assert.equal(helper.translateYesNoOption('Yes', true), i18next.getFixedT('cy')('kbv-questions:answers.yes.v2'));
    });

    it('should be translate Yes option with spaces to Yes v2 in welsh when language is set as \'en\'', () => {
      assert.equal(helper.translateYesNoOption('  Yes ', true), i18next.getFixedT('en')('kbv-questions:answers.yes.v2'));
    });

    it('should be translate No option to No in english when language is set as \'en\'', () => {
      assert.equal(helper.translateYesNoOption('No'), i18next.getFixedT('en')('kbv-questions:answers.no'));
    });

    it('should be translate No option to No in welsh when language is set as \'cy\'', () => {
      i18next.changeLanguage('cy');
      assert.equal(helper.translateYesNoOption('No'), i18next.getFixedT('cy')('kbv-questions:answers.no'));
    });

    it('should be translate No option with spaces to No in welsh when language is set as \'en\'', () => {
      assert.equal(helper.translateYesNoOption('  No '), i18next.getFixedT('en')('kbv-questions:answers.no'));
    });

    it('should not translate option when there is no match', () => {
      assert.equal(helper.translateYesNoOption('no match'), 'no match');
    });
  });

  describe('translateExtractMoney', () => {
    it('should be defined', () => {
      assert.isDefined(helper.translateExtractMoney);
    });

    it('should be a function', () => {
      assert.isFunction(helper.translateExtractMoney);
    });

    it('should return less than translation in english when string contain \'Less than\' and language set to \'en\'', () => {
      assert.equal(helper.translateExtractMoney('Less than £1,500'), i18next.getFixedT('en')('kbv-questions:money.lessThan', { FROM_AMOUNT: '£1,500' }));
    });

    it('should return less than translation in welsh when string contain \'Less than\' and language set to \'cy\'', () => {
      i18next.changeLanguage('cy');
      assert.equal(helper.translateExtractMoney('Less than £1,500'), i18next.getFixedT('cy')('kbv-questions:money.lessThan', { FROM_AMOUNT: '£1,500' }));
    });

    it('should return more than translation in english when string contain \'More than\' and language set to \'en\'', () => {
      assert.equal(helper.translateExtractMoney('More than £2,500'), i18next.getFixedT('en')('kbv-questions:money.moreThan', { FROM_AMOUNT: '£2,500' }));
    });

    it('should return more than translation in welsh when string contain \'More than\' and language set to \'cy\'', () => {
      i18next.changeLanguage('cy');
      assert.equal(helper.translateExtractMoney('More than £2,500'), i18next.getFixedT('cy')('kbv-questions:money.moreThan', { FROM_AMOUNT: '£2,500' }));
    });

    it('should return between than translation in english when 2 amounts are included in string and language set to \'en\'', () => {
      assert.equal(helper.translateExtractMoney('Between £2,500 - £5,000'), i18next.getFixedT('en')('kbv-questions:money.between', { FROM_AMOUNT: '£2,500', TO_AMOUNT: '£5,000' }));
    });

    it('should return between than translation in welsh when 2 amounts are included in string and language set to \'cy\'', () => {
      i18next.changeLanguage('cy');
      assert.equal(helper.translateExtractMoney('Between £2,500 - £5,000'), i18next.getFixedT('cy')('kbv-questions:money.between', { FROM_AMOUNT: '£2,500', TO_AMOUNT: '£5,000' }));
    });

    it('should return never translation in english when I don\'t included in string and language set to \'en\'', () => {
      assert.equal(helper.translateExtractMoney('I don\'t have an answer', 'KBV6'), i18next.getFixedT('en')('kbv-questions:KBV6.answers.never'));
    });

    it('should return never translation in welsh when  I don\'t included in string and language set to \'cy\'', () => {
      i18next.changeLanguage('cy');
      assert.equal(helper.translateExtractMoney('I don\'t have an answer', 'KBV6'), i18next.getFixedT('cy')('kbv-questions:KBV6.answers.never'));
    });

    it('should return raw answer when nothing matches', () => {
      assert.equal(helper.translateExtractMoney('No translation'), 'No translation');
    });
  });

  describe('translateExtractYears', () => {
    it('should be defined', () => {
      assert.isDefined(helper.translateExtractYears);
    });

    it('should be a function', () => {
      assert.isFunction(helper.translateExtractYears);
    });

    describe('less than', () => {
      it('should return less than translation in english when string contain \'Less than\' and language set to \'en\'', () => {
        const YEAR_TEXT = i18next.getFixedT('en')('kbv-questions:answers.year');
        assert.equal(helper.translateExtractYears('Less than 1'), i18next.getFixedT('en')('kbv-questions:years.lessThan', { FROM_YEAR: '1', YEAR_TEXT }));
      });

      it('should return less than translation in welsh when string contain \'Less than\' and language set to \'cy\'', () => {
        i18next.changeLanguage('cy');
        const YEAR_TEXT = i18next.getFixedT('cy')('kbv-questions:answers.year');
        assert.equal(helper.translateExtractYears('Less than 1'), i18next.getFixedT('cy')('kbv-questions:years.lessThan', { FROM_YEAR: '1', YEAR_TEXT }));
      });

      it('should return less than translation in english with year when string contain \'Less than\', language set to \'en\' and from year is 1', () => {
        const YEAR_TEXT = i18next.getFixedT('en')('kbv-questions:answers.year');
        assert.equal(helper.translateExtractYears('Less than 1 year'), i18next.getFixedT('en')('kbv-questions:years.lessThan', { FROM_YEAR: '1', YEAR_TEXT }));
      });

      it('should return less than translation in welsh with year when string contain \'Less than\', language set to \'cy\' and from year is 1', () => {
        i18next.changeLanguage('cy');
        const YEAR_TEXT = i18next.getFixedT('cy')('kbv-questions:answers.year');
        assert.equal(helper.translateExtractYears('Less than 1 year'), i18next.getFixedT('cy')('kbv-questions:years.lessThan', { FROM_YEAR: '1', YEAR_TEXT }));
      });

      it('should return less than translation in english with years when string contain \'Less than\', language set to \'en\' and from year is greater than 1', () => {
        const YEAR_TEXT = i18next.getFixedT('en')('kbv-questions:answers.years');
        assert.equal(helper.translateExtractYears('Less than 2 years'), i18next.getFixedT('en')('kbv-questions:years.lessThan', { FROM_YEAR: '2', YEAR_TEXT }));
      });

      it('should return less than translation in welsh with years when string contain \'Less than\', language set to \'cy\' and from year is greater than 1', () => {
        i18next.changeLanguage('cy');
        const YEAR_TEXT = i18next.getFixedT('cy')('kbv-questions:answers.years');
        assert.equal(helper.translateExtractYears('Less than 2 years'), i18next.getFixedT('cy')('kbv-questions:years.lessThan', { FROM_YEAR: '2', YEAR_TEXT }));
      });
    });

    describe('between', () => {
      it('should return between translation in english with from and to years when string contain \'Between\', language set to \'en\'', () => {
        assert.equal(helper.translateExtractYears('Between 1 - 3'), i18next.getFixedT('en')('kbv-questions:years.between', { FROM_YEAR: '1', TO_YEAR: '3' }));
      });

      it('should return between translation in welsh with from and to years when string contain \'Between\', language set to \'cy\'', () => {
        i18next.changeLanguage('cy');
        assert.equal(helper.translateExtractYears('Between 1 - 3'), i18next.getFixedT('cy')('kbv-questions:years.between', { FROM_YEAR: '1', TO_YEAR: '3' }));
      });
    });

    describe('more than', () => {
      it('should return between translation in english with from and to years when string contain \'Between\', language set to \'en\'', () => {
        const YEAR_TEXT = i18next.getFixedT('en')('kbv-questions:answers.years');
        assert.equal(helper.translateExtractYears('More than 3 years'), i18next.getFixedT('en')('kbv-questions:years.moreThan', { FROM_YEAR: '3', YEAR_TEXT }));
      });

      it('should return between translation in welsh with from and to years when string contain \'Between\', language set to \'cy\'', () => {
        i18next.changeLanguage('cy');
        const YEAR_TEXT = i18next.getFixedT('cy')('kbv-questions:answers.years');
        assert.equal(helper.translateExtractYears('More than 3 years'), i18next.getFixedT('cy')('kbv-questions:years.moreThan', { FROM_YEAR: '3', YEAR_TEXT }));
      });
    });
  });
});
