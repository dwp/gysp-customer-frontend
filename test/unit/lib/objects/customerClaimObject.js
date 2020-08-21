const assert = require('assert');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../../config/i18next');

const claimObject = require('../../../../lib/objects/claimObject');

const customerSession = {
  firstName: 'Test 1',
  surname: 'Test 2',
  dob: '10-10-10',
  gender: 'Male',
  statePensionDate: 'test',
  nino: 'AA370773A',
  residentialAddress: {
    thoroughfareName: 'test 2',
  },
  correspondenceAddress: {
    thoroughfareName: 'test 2',
  },
};

const customerDetailsString = {
  firstName: 'Test 1',
  surname: 'Test 2',
  dob: '10-10-10',
  gender: 'Male',
  statePensionDate: 'test',
  nino: 'AA370773A',
  residentialAddress: {
    thoroughfareName: 'test 2',
    thoroughfareNameQ: 'Main street name',
    postCodeQ: 'Post code',
  },
  correspondenceAddress: {
    thoroughfareName: 'test 2',
    thoroughfareNameQ: 'Main street name',
    postCodeQ: 'Post code',
  },
  titleQ: 'Title',
  firstNameQ: 'First Name',
  surnameQ: 'Surname',
  dobQ: 'Date of birth',
  genderQ: 'Gender',
  statePensionDateQ: 'State Pension age',
  ninoQ: 'National Insurance number',
  residentialAddressQ: 'Residential Address - UK',
  correspondenceAddressQ: 'Correspondence Address - UK',
};

describe('Customer claim object ', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  describe(' convertor with createCustomerObject ', () => {
    it('should convert object to valid json and remove country', () => {
      const details = claimObject.createCustomerObject(customerSession);
      assert.equal(JSON.stringify(details), JSON.stringify(customerDetailsString));
    });
  });

  describe(' uk address ', () => {
    describe(' correspondenceAddress ', () => {
      it('should have sub building name when sub building name is supplied and two other fields', () => {
        const details = claimObject.createCustomerObject({ correspondenceAddress: { subBuildingName: 'subBuildingName' } });
        assert.equal(details.correspondenceAddress.subBuildingNameQ, 'Flat number');
        assert.equal(details.correspondenceAddress.subBuildingName, 'subBuildingName');
        assert.equal(Object.keys(details.correspondenceAddress).length, 4);
      });
      it('should have building name when building name is supplied and two other fields', () => {
        const details = claimObject.createCustomerObject({ correspondenceAddress: { buildingName: 'buildingName' } });
        assert.equal(details.correspondenceAddress.buildingNameQ, 'Building name');
        assert.equal(details.correspondenceAddress.buildingName, 'buildingName');
        assert.equal(Object.keys(details.correspondenceAddress).length, 4);
      });
      it('should have building number when building number is supplied and two other fields', () => {
        const details = claimObject.createCustomerObject({ correspondenceAddress: { buildingNumber: 'buildingNumber' } });
        assert.equal(details.correspondenceAddress.buildingNumberQ, 'Building number');
        assert.equal(details.correspondenceAddress.buildingNumber, 'buildingNumber');
        assert.equal(Object.keys(details.correspondenceAddress).length, 4);
      });
      it('should have dependent thoroughfare name when dependent thoroughfare is supplied and two other fields', () => {
        const details = claimObject.createCustomerObject({ correspondenceAddress: { dependentThoroughfareName: 'dependentThoroughfareName' } });
        assert.equal(details.correspondenceAddress.dependentThoroughfareNameQ, 'Sub street name');
        assert.equal(details.correspondenceAddress.dependentThoroughfareName, 'dependentThoroughfareName');
        assert.equal(Object.keys(details.correspondenceAddress).length, 4);
      });
      it('should have dependent locality when dependent locality is supplied and two other fields', () => {
        const details = claimObject.createCustomerObject({ correspondenceAddress: { dependentLocality: 'dependentLocality' } });
        assert.equal(details.correspondenceAddress.dependentLocalityQ, 'Village');
        assert.equal(details.correspondenceAddress.dependentLocality, 'dependentLocality');
        assert.equal(Object.keys(details.correspondenceAddress).length, 4);
      });
      it('should have post town when post town is supplied and two other fields', () => {
        const details = claimObject.createCustomerObject({ correspondenceAddress: { postTown: 'postTown' } });
        assert.equal(details.correspondenceAddress.postTownQ, 'Town');
        assert.equal(details.correspondenceAddress.postTown, 'postTown');
        assert.equal(Object.keys(details.correspondenceAddress).length, 4);
      });
    });

    describe(' residentialAddress ', () => {
      it('should have sub building name when sub building name is supplied and two other fields', () => {
        const details = claimObject.createCustomerObject({ residentialAddress: { subBuildingName: 'subBuildingName' } });
        assert.equal(details.residentialAddress.subBuildingNameQ, 'Flat number');
        assert.equal(details.residentialAddress.subBuildingName, 'subBuildingName');
        assert.equal(Object.keys(details.residentialAddress).length, 4);
      });
      it('should have building name when building name is supplied and two other fields', () => {
        const details = claimObject.createCustomerObject({ residentialAddress: { buildingName: 'buildingName' } });
        assert.equal(details.residentialAddress.buildingNameQ, 'Building name');
        assert.equal(details.residentialAddress.buildingName, 'buildingName');
        assert.equal(Object.keys(details.residentialAddress).length, 4);
      });
      it('should have building number when building number is supplied and two other fields', () => {
        const details = claimObject.createCustomerObject({ residentialAddress: { buildingNumber: 'buildingNumber' } });
        assert.equal(details.residentialAddress.buildingNumberQ, 'Building number');
        assert.equal(details.residentialAddress.buildingNumber, 'buildingNumber');
        assert.equal(Object.keys(details.residentialAddress).length, 4);
      });
      it('should have dependent thoroughfare name when dependent thoroughfare is supplied and two other fields', () => {
        const details = claimObject.createCustomerObject({ residentialAddress: { dependentThoroughfareName: 'dependentThoroughfareName' } });
        assert.equal(details.residentialAddress.dependentThoroughfareNameQ, 'Sub street name');
        assert.equal(details.residentialAddress.dependentThoroughfareName, 'dependentThoroughfareName');
        assert.equal(Object.keys(details.residentialAddress).length, 4);
      });
      it('should have dependent locality when dependent locality is supplied and two other fields', () => {
        const details = claimObject.createCustomerObject({ residentialAddress: { dependentLocality: 'dependentLocality' } });
        assert.equal(details.residentialAddress.dependentLocalityQ, 'Village');
        assert.equal(details.residentialAddress.dependentLocality, 'dependentLocality');
        assert.equal(Object.keys(details.residentialAddress).length, 4);
      });
      it('should have post town when post town is supplied and two other fields', () => {
        const details = claimObject.createCustomerObject({ residentialAddress: { postTown: 'postTown' } });
        assert.equal(details.residentialAddress.postTownQ, 'Town');
        assert.equal(details.residentialAddress.postTown, 'postTown');
        assert.equal(Object.keys(details.residentialAddress).length, 4);
      });
    });
  });

  describe(' overseas address ', () => {
    it('should have line1 when line1 is supplied and three other fields', () => {
      const details = claimObject.createCustomerObject({ overseasAddress: { line1: 'Address line 1' } });
      assert.equal(details.overseasAddressDetail.line1Q, 'Address Line 1');
      assert.equal(details.overseasAddressDetail.line1, 'Address line 1');
      assert.equal(Object.keys(details.overseasAddressDetail).length, 3);
    });

    it('should only have country when country is supplied and three other fields', () => {
      const details = claimObject.createCustomerObject({ overseasAddress: { country: 'Country' } });
      assert.equal(details.overseasAddressDetail.countryQ, 'Country');
      assert.equal(details.overseasAddressDetail.country, 'Country');
      assert.equal(Object.keys(details.overseasAddressDetail).length, 3);
    });
  });
});
