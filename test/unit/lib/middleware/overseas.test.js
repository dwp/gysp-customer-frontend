const { assert } = require('chai');
const overseas = require('../../../../lib/middleware/overseas');
const responseHelper = require('../../../lib/responseHelper');

const gbLocation = 'georegion=263,country_code=GB,region_code=MA,city=CAMBRIDGE,dma=50 6,pmsa=1120,areacode=617,county=MIDDLESEX,fips=25017,lat=42.3933,long=-71.1333,timezone=EST,zip=02138-02142+02238-02239,continent=NA ,throughput=vhigh,asnum=21399';
const auLocation = 'georegion=263,country_code=AU,region_code=MA,city=CAMBRIDGE,dma=50 6,pmsa=1120,areacode=617,county=MIDDLESEX,fips=25017,lat=42.3933,long=-71.1333,timezone=EST,zip=02138-02142+02238-02239,continent=NA ,throughput=vhigh,asnum=21399';

let genericResponse = {};
const emptyRequest = { session: {} };
const akamaiEdgescapeHeaderGBRequest = { session: {}, headers: { 'x-akamai-edgescape': gbLocation } };
const akamaiEdgescapeHeaderAURequest = { session: {}, headers: { 'x-akamai-edgescape': auLocation } };
const customerDetailsRequest = { session: { customerDetails: { overseasAddress: { line1: 'Test', line2: 'Test' } } } };
const isOverseasStubRequest = { session: { isOverseasStub: true } };

const validEmptyRequest = { session: { isOverseas: false } };
const validAkamaiEdgescapeHeaderGBRequest = { session: { isOverseas: false }, headers: { 'x-akamai-edgescape': gbLocation } };
const validAkamaiEdgescapeHeaderAURequest = { session: { isOverseas: true }, headers: { 'x-akamai-edgescape': auLocation } };
const validCustomerDetailsRequest = { session: { customerDetails: { overseasAddress: { line1: 'Test', line2: 'Test' } }, isOverseas: true } };
const validIsOverseasStubRequest = { session: { isOverseasStub: true, isOverseas: true } };

describe('overseas middleware', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  it('should set isOverseas session as false as no header, stub or customer data within session', () => {
    overseas()(emptyRequest, genericResponse, () => {
      assert.equal(JSON.stringify(emptyRequest), JSON.stringify(validEmptyRequest));
    });
  });

  it('should set isOverseas session as false as GB header within request', () => {
    overseas()(akamaiEdgescapeHeaderGBRequest, genericResponse, () => {
      assert.equal(JSON.stringify(akamaiEdgescapeHeaderGBRequest), JSON.stringify(validAkamaiEdgescapeHeaderGBRequest));
    });
  });

  it('should set isOverseas session as true as AU header within request', () => {
    overseas()(akamaiEdgescapeHeaderAURequest, genericResponse, () => {
      assert.equal(JSON.stringify(akamaiEdgescapeHeaderAURequest), JSON.stringify(validAkamaiEdgescapeHeaderAURequest));
    });
  });

  it('should set isOverseas session as true as overseas customer within request', () => {
    overseas()(customerDetailsRequest, genericResponse, () => {
      assert.equal(JSON.stringify(customerDetailsRequest), JSON.stringify(validCustomerDetailsRequest));
    });
  });

  it('should set isOverseas session as true as overseas stub within request', () => {
    overseas()(isOverseasStubRequest, genericResponse, () => {
      assert.equal(JSON.stringify(isOverseasStubRequest), JSON.stringify(validIsOverseasStubRequest));
    });
  });
});
