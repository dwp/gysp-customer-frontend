const assert = require('assert');

const object = require('../../../../lib/objects/userObject');

const claimFullAddress = {
  residentialAddress: {
    subBuildingName: 'subBuildingName',
    buildingName: 'buildingName',
    buildingNumber: 'buildingNumber',
    dependentThoroughfareName: 'dependentThoroughfareName',
    thoroughfareName: 'thoroughfareName',
    dependentLocality: 'dependentLocality',
    postTown: 'postTown',
    postCode: 'postCode',
  },
  correspondenceAddress: null,
  createdDate: 1550153562360,
  dob: -509328000000,
  firstName: 'Joe',
  gender: 'Male',
  nino: 'AA370773A',
  overseasAddress: null,
  statePensionDate: 1541894400000,
  surname: 'Bloggs',
  title: 'Mr',
  dobVerification: 'V',
  inviteKey: 'BLOG4R6EM6',
  mqpFlag: null,
};

const claimFullAddressResponse = {
  name: 'Joe Bloggs',
  dob: '11 November 1953',
  addressLines: [
    'subBuildingName',
    'buildingName',
    'buildingNumber',
    'dependentThoroughfareName',
    'thoroughfareName',
    'dependentLocality',
    'postTown',
    'postCode',
  ],
};

const claimNoAddress = {
  residentialAddress: {
    subBuildingName: null,
    buildingName: null,
    buildingNumber: null,
    dependentThoroughfareName: null,
    thoroughfareName: null,
    dependentLocality: null,
    postTown: null,
    postCode: null,
  },
  correspondenceAddress: null,
  createdDate: 1550153562360,
  dob: -509328000000,
  firstName: 'Joe',
  gender: 'Male',
  nino: 'AA370773A',
  overseasAddress: null,
  statePensionDate: 1541894400000,
  surname: 'Bloggs',
  title: 'Mr',
  dobVerification: 'V',
  inviteKey: 'BLOG4R6EM6',
  mqpFlag: null,
};

const claimNoAddressResponse = {
  name: 'Joe Bloggs',
  dob: '11 November 1953',
  addressLines: [],
};


describe('User object ', () => {
  describe(' verifyUserObject ', () => {
    it('should convert object to valid json with full address array present', () => {
      const objectValue = object.verifyUserObject(claimFullAddress);
      assert.equal(JSON.stringify(objectValue), JSON.stringify(claimFullAddressResponse));
    });

    it('should convert object to valid json with empty address array present', () => {
      const objectValue = object.verifyUserObject(claimNoAddress);
      assert.equal(JSON.stringify(objectValue), JSON.stringify(claimNoAddressResponse));
    });
  });
});
