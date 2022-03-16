const { assert } = require('chai');

const locationHelper = require('../../../../lib/helpers/locationHelper');

const englandPostcode = 'NE1 3RT';
const postCodeStartingWith1 = '1NE1 3RT';
const NorthenIrelandPostcode = ['BT1 3RT', 'Bt1 3tr', 'bt134', ' b t 1 3 r t', 'B T 1 3 R T'];
const crownDependencyPostcodes = ['JE2 3GX', 'GY1 1BA', 'IM1 1ER'];

const gbLocation = 'georegion=263,country_code=GB,region_code=MA,city=CAMBRIDGE,dma=50 6,pmsa=1120,areacode=617,county=MIDDLESEX,fips=25017,lat=42.3933,long=-71.1333,timezone=EST,zip=02138-02142+02238-02239,continent=NA ,throughput=vhigh,asnum=21399';
const auLocation = 'georegion=263,country_code=AU,region_code=MA,city=CAMBRIDGE,dma=50 6,pmsa=1120,areacode=617,county=MIDDLESEX,fips=25017,lat=42.3933,long=-71.1333,timezone=EST,zip=02138-02142+02238-02239,continent=NA ,throughput=vhigh,asnum=21399';

describe('Location helper ', () => {
  describe('isNorthenIreland', () => {
    it('should return false when none Northern Ireland postcode supplied', () => {
      assert.equal(locationHelper.isNorthernIreland(englandPostcode), false);
    });

    it('should return no error if post code starts with a number', () => {
      assert.equal(locationHelper.isNorthernIreland(postCodeStartingWith1), false);
    });

    NorthenIrelandPostcode.forEach((postcode) => {
      it(`should return true when Northern Ireland postcode (${postcode}) supplied`, () => {
        assert.equal(locationHelper.isNorthernIreland(postcode), true);
      });
    });

    it('should return false when undefined supplied', () => {
      assert.equal(locationHelper.isNorthernIreland(undefined), false);
    });
  });

  describe('isOverseas', () => {
    it('should return false as country code is GB', () => {
      assert.equal(locationHelper.isOverseas(gbLocation), false);
    });

    it('should return true as country code is AU', () => {
      assert.equal(locationHelper.isOverseas(auLocation), true);
    });
  });

  describe('isCrownDependency', () => {
    it('should return false when postcode is not a crown dependency', () => {
      assert.isFalse(locationHelper.isCrownDependency(englandPostcode));
    });

    crownDependencyPostcodes.forEach((postcode) => {
      it('should return true when postcode is a crown dependency', () => {
        assert.isTrue(locationHelper.isCrownDependency(postcode));
      });
    });
  });
});
