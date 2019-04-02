const assert = require('assert');

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
    thoroughfareNameQ: 'customer-details:field_names.address_details.uk.residential_address.thoroughfare_name',
    postCodeQ: 'customer-details:field_names.address_details.uk.residential_address.postcode',
  },
  correspondenceAddress: {
    thoroughfareName: 'test 2',
    thoroughfareNameQ: 'customer-details:field_names.address_details.uk.correspondence_address.thoroughfare_name',
    postCodeQ: 'customer-details:field_names.address_details.uk.correspondence_address.postcode',
  },
  titleQ: 'customer-details:field_names.title',
  firstNameQ: 'customer-details:field_names.firstname',
  surnameQ: 'customer-details:field_names.surname',
  dobQ: 'customer-details:field_names.dob',
  genderQ: 'customer-details:field_names.gender',
  statePensionDateQ: 'customer-details:field_names.state_pension_date',
  ninoQ: 'customer-details:field_names.nino',
  residentialAddressQ: 'customer-details:field_names.address_details.uk.residential_address.address_title - customer-details:field_names.address_details.options.option_uk',
  correspondenceAddressQ: 'customer-details:field_names.address_details.uk.correspondence_address.address_title - customer-details:field_names.address_details.options.option_uk',
};

describe('Customer claim object ', () => {
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
        assert.equal(details.correspondenceAddress.subBuildingNameQ, 'customer-details:field_names.address_details.uk.correspondence_address.sub_building_name');
        assert.equal(details.correspondenceAddress.subBuildingName, 'subBuildingName');
        assert.equal(Object.keys(details.correspondenceAddress).length, 4);
      });
      it('should have building name when building name is supplied and two other fields', () => {
        const details = claimObject.createCustomerObject({ correspondenceAddress: { buildingName: 'buildingName' } });
        assert.equal(details.correspondenceAddress.buildingNameQ, 'customer-details:field_names.address_details.uk.correspondence_address.building_name');
        assert.equal(details.correspondenceAddress.buildingName, 'buildingName');
        assert.equal(Object.keys(details.correspondenceAddress).length, 4);
      });
      it('should have building number when building number is supplied and two other fields', () => {
        const details = claimObject.createCustomerObject({ correspondenceAddress: { buildingNumber: 'buildingNumber' } });
        assert.equal(details.correspondenceAddress.buildingNumberQ, 'customer-details:field_names.address_details.uk.correspondence_address.building_number');
        assert.equal(details.correspondenceAddress.buildingNumber, 'buildingNumber');
        assert.equal(Object.keys(details.correspondenceAddress).length, 4);
      });
      it('should have dependent thoroughfare name when dependent thoroughfare is supplied and two other fields', () => {
        const details = claimObject.createCustomerObject({ correspondenceAddress: { dependentThoroughfareName: 'dependentThoroughfareName' } });
        assert.equal(details.correspondenceAddress.dependentThoroughfareNameQ, 'customer-details:field_names.address_details.uk.correspondence_address.dependent_thoroughfare_name');
        assert.equal(details.correspondenceAddress.dependentThoroughfareName, 'dependentThoroughfareName');
        assert.equal(Object.keys(details.correspondenceAddress).length, 4);
      });
      it('should have dependent locality when dependent locality is supplied and two other fields', () => {
        const details = claimObject.createCustomerObject({ correspondenceAddress: { dependentLocality: 'dependentLocality' } });
        assert.equal(details.correspondenceAddress.dependentLocalityQ, 'customer-details:field_names.address_details.uk.correspondence_address.dependent_locality');
        assert.equal(details.correspondenceAddress.dependentLocality, 'dependentLocality');
        assert.equal(Object.keys(details.correspondenceAddress).length, 4);
      });
      it('should have post town when post town is supplied and two other fields', () => {
        const details = claimObject.createCustomerObject({ correspondenceAddress: { postTown: 'postTown' } });
        assert.equal(details.correspondenceAddress.postTownQ, 'customer-details:field_names.address_details.uk.correspondence_address.post_town');
        assert.equal(details.correspondenceAddress.postTown, 'postTown');
        assert.equal(Object.keys(details.correspondenceAddress).length, 4);
      });
    });

    describe(' residentialAddress ', () => {
      it('should have sub building name when sub building name is supplied and two other fields', () => {
        const details = claimObject.createCustomerObject({ residentialAddress: { subBuildingName: 'subBuildingName' } });
        assert.equal(details.residentialAddress.subBuildingNameQ, 'customer-details:field_names.address_details.uk.residential_address.sub_building_name');
        assert.equal(details.residentialAddress.subBuildingName, 'subBuildingName');
        assert.equal(Object.keys(details.residentialAddress).length, 4);
      });
      it('should have building name when building name is supplied and two other fields', () => {
        const details = claimObject.createCustomerObject({ residentialAddress: { buildingName: 'buildingName' } });
        assert.equal(details.residentialAddress.buildingNameQ, 'customer-details:field_names.address_details.uk.residential_address.building_name');
        assert.equal(details.residentialAddress.buildingName, 'buildingName');
        assert.equal(Object.keys(details.residentialAddress).length, 4);
      });
      it('should have building number when building number is supplied and two other fields', () => {
        const details = claimObject.createCustomerObject({ residentialAddress: { buildingNumber: 'buildingNumber' } });
        assert.equal(details.residentialAddress.buildingNumberQ, 'customer-details:field_names.address_details.uk.residential_address.building_number');
        assert.equal(details.residentialAddress.buildingNumber, 'buildingNumber');
        assert.equal(Object.keys(details.residentialAddress).length, 4);
      });
      it('should have dependent thoroughfare name when dependent thoroughfare is supplied and two other fields', () => {
        const details = claimObject.createCustomerObject({ residentialAddress: { dependentThoroughfareName: 'dependentThoroughfareName' } });
        assert.equal(details.residentialAddress.dependentThoroughfareNameQ, 'customer-details:field_names.address_details.uk.residential_address.dependent_thoroughfare_name');
        assert.equal(details.residentialAddress.dependentThoroughfareName, 'dependentThoroughfareName');
        assert.equal(Object.keys(details.residentialAddress).length, 4);
      });
      it('should have dependent locality when dependent locality is supplied and two other fields', () => {
        const details = claimObject.createCustomerObject({ residentialAddress: { dependentLocality: 'dependentLocality' } });
        assert.equal(details.residentialAddress.dependentLocalityQ, 'customer-details:field_names.address_details.uk.residential_address.dependent_locality');
        assert.equal(details.residentialAddress.dependentLocality, 'dependentLocality');
        assert.equal(Object.keys(details.residentialAddress).length, 4);
      });
      it('should have post town when post town is supplied and two other fields', () => {
        const details = claimObject.createCustomerObject({ residentialAddress: { postTown: 'postTown' } });
        assert.equal(details.residentialAddress.postTownQ, 'customer-details:field_names.address_details.uk.residential_address.post_town');
        assert.equal(details.residentialAddress.postTown, 'postTown');
        assert.equal(Object.keys(details.residentialAddress).length, 4);
      });
    });
  });
  describe(' overseas address ', () => {
    it('should have line1 when line1 is supplied and three other fields', () => {
      const details = claimObject.createCustomerObject({ overseasAddress: { line1: 'Address line 1' } });
      assert.equal(details.overseasAddressDetail.line1Q, 'customer-details:field_names.address_details.overseas.address_line_1');
      assert.equal(details.overseasAddressDetail.line1, 'Address line 1');
      assert.equal(Object.keys(details.overseasAddressDetail).length, 3);
    });
    it('should only have country when country is supplied and three other fields', () => {
      const details = claimObject.createCustomerObject({ overseasAddress: { country: 'Country' } });
      assert.equal(details.overseasAddressDetail.countryQ, 'customer-details:field_names.address_details.overseas.country');
      assert.equal(details.overseasAddressDetail.country, 'Country');
      assert.equal(Object.keys(details.overseasAddressDetail).length, 3);
    });
  });
});
