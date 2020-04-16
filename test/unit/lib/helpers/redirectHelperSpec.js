const assert = require('assert');
const redirectHelper = require('../../../../lib/helpers/redirectHelper');

const validStatus = {
  single: 'single',
  married: 'married',
  civilPartnership: 'civil',
  widowed: 'widowed',
  divorced: 'divorced',
  dissolved: 'dissolved',
};
const validDateUrls = {
  contact: 'contact-details',
  checkChange: 'check-your-details',
  married: 'what-date-did-you-get-married',
  civilPartnership: 'what-date-was-your-civil-partnership-registered',
  divorced: 'what-date-did-you-get-divorced',
  dissolved: 'what-date-was-your-civil-partnership-dissloved',
  widowed: 'what-date-were-you-widowed',
  none: 'what-is-your-current-marital-status',
};

const validPartnerUrls = {
  married: 'about-your-spouse',
  civilPartnership: 'about-your-civil-partner',
  divorced: 'about-your-ex-spouse',
  dissolved: 'about-your-ex-partner',
  widowed: 'about-your-late-spouse',
  none: 'what-is-your-current-marital-status',
};

const editModeTrue = true;

describe('redirect helper ', () => {
  describe('redirectBasedOnStatus  ', () => {
    it('should return contact details page when single is supplied', () => {
      const urlReturn = redirectHelper.redirectBasedOnStatus(validStatus.single);
      assert.equal(urlReturn, validDateUrls.contact);
    });
    it('should return married date url page when married is supplied', () => {
      const urlReturn = redirectHelper.redirectBasedOnStatus(validStatus.married);
      assert.equal(urlReturn, validDateUrls.married);
    });
    it('should return civil partnership date url page when civil is supplied', () => {
      const urlReturn = redirectHelper.redirectBasedOnStatus(validStatus.civilPartnership);
      assert.equal(urlReturn, validDateUrls.civilPartnership);
    });
    it('should return widowed details page when windowed is supplied', () => {
      const urlReturn = redirectHelper.redirectBasedOnStatus(validStatus.widowed);
      assert.equal(urlReturn, validDateUrls.widowed);
    });
    it('should return divorced date url page when divorced is supplied', () => {
      const urlReturn = redirectHelper.redirectBasedOnStatus(validStatus.divorced);
      assert.equal(urlReturn, validDateUrls.divorced);
    });
    it('should return dissolved date url when dissolved is supplied', () => {
      const urlReturn = redirectHelper.redirectBasedOnStatus(validStatus.dissolved);
      assert.equal(urlReturn, validDateUrls.dissolved);
    });
    it('should return orginal url when something is posted that is not a thing is supplied', () => {
      const urlReturn = redirectHelper.redirectBasedOnStatus('kitten');
      assert.equal(urlReturn, validDateUrls.none);
    });
  });
  describe('redirectBasedOnStatusAndEditMode  ', () => {
    it('should return check and change page when single is supplied and in edit mode', () => {
      const urlReturn = redirectHelper.redirectBasedOnStatusAndEditMode(validStatus.single, false, true);
      assert.equal(urlReturn, validDateUrls.checkChange);
    });
    it('should return check and change page when single is supplied, in edit mode and overseas', () => {
      const urlReturn = redirectHelper.redirectBasedOnStatusAndEditMode(validStatus.single, true, true);
      assert.equal(urlReturn, validDateUrls.checkChange);
    });
    it('should return contact page when single is supplied, not in edit mode and not overseas', () => {
      const urlReturn = redirectHelper.redirectBasedOnStatusAndEditMode(validStatus.single, false, false);
      assert.equal(urlReturn, validDateUrls.contact);
    });
    it('should return contact details page when single is supplied, not in edit mode and is overseas', () => {
      const urlReturn = redirectHelper.redirectBasedOnStatusAndEditMode(validStatus.single, true, false);
      assert.equal(urlReturn, validDateUrls.contact);
    });
    it('should return married date url page when married is supplied and in edit mode', () => {
      const urlReturn = redirectHelper.redirectBasedOnStatus(validStatus.married, true);
      assert.equal(urlReturn, validDateUrls.married);
    });
  });
  describe('redirectBasedOnStatusPartner  ', () => {
    it('should return married parter details url when married is supplied', () => {
      const urlReturn = redirectHelper.redirectBasedOnStatusPartner(validStatus.married);
      assert.equal(urlReturn, validPartnerUrls.married);
    });
    it('should return civil partnership details page url when civil is supplied', () => {
      const urlReturn = redirectHelper.redirectBasedOnStatusPartner(validStatus.civilPartnership);
      assert.equal(urlReturn, validPartnerUrls.civilPartnership);
    });
    it('should return divorced details page url when divorced is supplied', () => {
      const urlReturn = redirectHelper.redirectBasedOnStatusPartner(validStatus.divorced);
      assert.equal(urlReturn, validPartnerUrls.divorced);
    });
    it('should return dissolved details page url when dissolved is supplied', () => {
      const urlReturn = redirectHelper.redirectBasedOnStatusPartner(validStatus.dissolved);
      assert.equal(urlReturn, validPartnerUrls.dissolved);
    });
    it('should return widowed details page url when widowed is supplied  ', () => {
      const urlReturn = redirectHelper.redirectBasedOnStatusPartner(validStatus.widowed);
      assert.equal(urlReturn, validPartnerUrls.widowed);
    });
    it('should return orginal url when something is posted that is not a thing is supplied', () => {
      const urlReturn = redirectHelper.redirectBasedOnStatusPartner('kitten');
      assert.equal(urlReturn, validPartnerUrls.none);
    });
  });
  describe('redirectBasedOnLivingAbroad  ', () => {
    it('should return what-countries-have-you-lived-in when yes is supplied', () => {
      const urlReturn = redirectHelper.redirectBasedOnLivingAbroad('yes');
      assert.equal(urlReturn, 'what-countries-have-you-lived-in');
    });
    it('should return have-you-worked-outside-of-the-uk when no is supplied', () => {
      const urlReturn = redirectHelper.redirectBasedOnLivingAbroad('no');
      assert.equal(urlReturn, 'have-you-worked-outside-of-the-uk');
    });
    it('should return have-you-ever-lived-outside-of-the-uk when anything other then yes is supplied', () => {
      const urlReturn = redirectHelper.redirectBasedOnLivingAbroad('yes2');
      assert.equal(urlReturn, 'have-you-ever-lived-outside-of-the-uk');
    });
    it('should return check-your-details when no and edit mode true is supplied', () => {
      const urlReturn = redirectHelper.redirectBasedOnLivingAbroad('no', editModeTrue);
      assert.equal(urlReturn, 'check-your-details');
    });
    it('should return what-countries-have-you-lived-in when yes and edit mode true is supplied', () => {
      const urlReturn = redirectHelper.redirectBasedOnLivingAbroad('yes', editModeTrue);
      assert.equal(urlReturn, 'what-countries-have-you-lived-in');
    });
    it('should return have-you-ever-lived-outside-of-the-uk when anything other then yes and edit mode true is supplied', () => {
      const urlReturn = redirectHelper.redirectBasedOnLivingAbroad('yes2', editModeTrue);
      assert.equal(urlReturn, 'have-you-ever-lived-outside-of-the-uk');
    });
  });
  describe('redirectBasedOnWorkedAbroad  ', () => {
    it('should return what-countries-have-you-worked-in when yes is supplied', () => {
      const urlReturn = redirectHelper.redirectBasedOnWorkedAbroad('yes');
      assert.equal(urlReturn, 'what-countries-have-you-worked-in');
    });
    it('should return what-is-your-current-marital-status when no is supplied', () => {
      const urlReturn = redirectHelper.redirectBasedOnWorkedAbroad('no');
      assert.equal(urlReturn, 'what-is-your-current-marital-status');
    });
    it('should return have-you-worked-outside-of-the-uk when anything other then yes is supplied', () => {
      const urlReturn = redirectHelper.redirectBasedOnWorkedAbroad('yes2');
      assert.equal(urlReturn, 'have-you-worked-outside-of-the-uk');
    });
  });
});
