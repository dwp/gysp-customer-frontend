const { assert } = require('chai');

const maritalController = require('../../../app/routes/marital/functions');
const responseHelper = require('../../lib/responseHelper');

let genericResponse = {};
const emptyRequest = { session: {}, body: {} };
const sessionRequestSelect = { session: { 'marital-select': true }, body: {} };
const requestNoPost = { route: {}, session: { 'marital-select': { maritalStatus: 'married' } }, body: {} };
const populatedRequest = { session: {}, body: { maritalStatus: 'single' } };
const populatedRequestEdit = { session: { editSection: 'marital-select' }, body: { maritalStatus: 'single' } };
const populatedRequestMarried = { session: {}, body: { maritalStatus: 'married' } };
const populatedRequestMarriedEdit = { session: {}, body: { maritalStatus: 'married' } };
const populatedRequestMoreFields = { session: {}, body: { kittens: true, maritalStatus: 'married' } };

const populatedDateRequest = { route: {}, session: { 'marital-select': { maritalStatus: 'married' } }, body: {} };
const populatedDateRequestWithSessionData = { route: {}, session: { 'marital-select': { maritalStatus: 'married' }, 'marital-date-married': true }, body: {} };
const populatedRequestMarriedPostDate = { route: {}, session: { 'marital-select': { maritalStatus: 'married' } }, body: { dateDay: '01', dateMonth: '01', dateYear: '1990' } };
const populatedRequestMarriedPostDateMoreFields = {
  route: {},
  session: { 'marital-select': { maritalStatus: 'married' } },
  body: {
    kittens: true, dateDay: '01', dateMonth: '01', dateYear: '1990',
  },
};

const populatedPartnerRequest = {
  route: {},
  session: { 'marital-select': { maritalStatus: 'married' } },
  body: {
    firstName: '', surname: '', otherName: '', dobDay: '', dobMonth: '', dobYear: '',
  },
};
const populatedPartnerRequestWithSession = {
  route: {},
  session: { 'marital-select': { maritalStatus: 'married' }, 'marital-date-married': true, 'marital-partner-married': true },
  body: {
    firstName: '', surname: '', otherName: '', dobDay: '', dobMonth: '', dobYear: '',
  },
};
const populatedRequestPartnerPostDate = {
  route: {},
  session: { 'marital-select': { maritalStatus: 'married' } },
  body: {
    firstName: 'First', surname: 'Last', otherName: 'Other', dobDay: '01', dobMonth: '01', dobYear: '1990',
  },
};
const populatedRequestPartnerPostDateOverseas = {
  route: {},
  session: { isOverseas: true, 'marital-select': { maritalStatus: 'married' } },
  body: {
    firstName: 'First', surname: 'Last', otherName: 'Other', dobDay: '01', dobMonth: '01', dobYear: '1990',
  },
};
const populatedRequestPartnerPostDateEdit = {
  route: {},
  session: { editSection: 'marital-partner', 'marital-select': { maritalStatus: 'married' } },
  body: {
    firstName: 'First', surname: 'Last', otherName: 'Other', dobDay: '01', dobMonth: '01', dobYear: '1990',
  },
};
const populatedRequestPartnerPostDateMoreFields = {
  route: {},
  session: { 'marital-select': { maritalStatus: 'married' } },
  body: {
    kittens: true, firstName: 'First', surname: 'Last', otherName: 'Other', dobDay: '01', dobMonth: '01', dobYear: '1990',
  },
};
const populatedRequestPartnerPostDateMoreFieldsOverseas = {
  route: {},
  session: { isOverseas: true, 'marital-select': { maritalStatus: 'married' } },
  body: {
    kittens: true, firstName: 'First', surname: 'Last', otherName: 'Other', dobDay: '01', dobMonth: '01', dobYear: '1990',
  },
};

describe('Marital controller ', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe(' maritalSelectGet function (GET /what-is-your-current-marital-status)', () => {
    it('should return view name when called with no session data when session is not populated', (done) => {
      maritalController.maritalSelectGet(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/marital-selection');
      assert.equal(genericResponse.data.details, undefined);
      done();
    });

    it('should return view name when called with session data when session is populated', (done) => {
      maritalController.maritalSelectGet(sessionRequestSelect, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/marital-selection');
      assert.isTrue(genericResponse.data.details);
      done();
    });
  });

  describe(' maritalSelectPost function (POST /what-is-your-current-marital-status)', () => {
    it('should return default view name when called', (done) => {
      maritalController.maritalSelectPost(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/marital-selection');
      done();
    });

    it('should return redirect to contact when called with valid object which is single', (done) => {
      maritalController.maritalSelectPost(populatedRequest, genericResponse);
      assert.equal(genericResponse.address, 'contact-details');
      assert.equal(populatedRequest.session['marital-select'].maritalStatus, 'single');
      done();
    });

    it('should return redirect to check and change when called with valid object which is single and in edit mode', (done) => {
      maritalController.maritalSelectPost(populatedRequestEdit, genericResponse);
      assert.equal(genericResponse.address, 'check-your-details');
      assert.equal(populatedRequest.session['marital-select'].maritalStatus, 'single');
      done();
    });

    it('should return redirect to what-date-did-you-get-married when called with valid object which is married', (done) => {
      maritalController.maritalSelectPost(populatedRequestMarried, genericResponse);
      assert.equal(genericResponse.address, 'what-date-did-you-get-married');
      assert.equal(populatedRequestMarried.session['marital-select'].maritalStatus, 'married');
      done();
    });

    it('should return redirect to what-date-did-you-get-married when called with valid object which is married and in edit mode', (done) => {
      maritalController.maritalSelectPost(populatedRequestMarriedEdit, genericResponse);
      assert.equal(genericResponse.address, 'what-date-did-you-get-married');
      assert.equal(populatedRequestMarried.session['marital-select'].maritalStatus, 'married');
      done();
    });

    it('should filter out any post items that are not allowed', (done) => {
      maritalController.maritalSelectPost(populatedRequestMoreFields, genericResponse);
      assert.equal(genericResponse.address, 'what-date-did-you-get-married');
      assert.equal(populatedRequestMarried.session['marital-select'].kittens, undefined);
      done();
    });
  });

  describe(' maritalStatusDateGet function ( GET /what-date-did-you-get-married)', () => {
    it('should return view name when called with no session data when none have been supplied', (done) => {
      maritalController.maritalStatusDateGet(populatedDateRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/marital-selection-date');
      assert.isUndefined(genericResponse.data.details);
      done();
    });

    it('should return view name when called with session data when some has been supplied', (done) => {
      maritalController.maritalStatusDateGet(populatedDateRequestWithSessionData, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/marital-selection-date');
      assert.isTrue(genericResponse.data.details);
      done();
    });
  });

  describe(' maritalStatusDateGet function ( POST /what-date-did-you-get-married)', () => {
    it('should return default view name when called with empty post object due to error', (done) => {
      maritalController.maritalStatusDatePost(requestNoPost, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/marital-selection-date');
      done();
    });

    it('should return redirect when called with valid date object', (done) => {
      maritalController.maritalStatusDatePost(populatedRequestMarriedPostDate, genericResponse);
      assert.equal(genericResponse.address, 'about-your-spouse');
      assert.equal(populatedRequestMarriedPostDate.session['marital-date-married'].dateDay, '01');
      assert.equal(populatedRequestMarriedPostDate.session['marital-date-married'].dateMonth, '01');
      assert.equal(populatedRequestMarriedPostDate.session['marital-date-married'].dateYear, '1990');
      done();
    });

    it('should filter out any post items that are not allowed', (done) => {
      maritalController.maritalStatusDatePost(populatedRequestMarriedPostDateMoreFields, genericResponse);
      assert.equal(genericResponse.address, 'about-your-spouse');
      assert.isUndefined(populatedRequestMarriedPostDate.session['marital-date-married'].kittens);
      assert.equal(populatedRequestMarriedPostDate.session['marital-date-married'].dateDay, '01');
      assert.equal(populatedRequestMarriedPostDate.session['marital-date-married'].dateMonth, '01');
      assert.equal(populatedRequestMarriedPostDate.session['marital-date-married'].dateYear, '1990');
      done();
    });
  });

  describe(' maritalPartnerDetailsGet function ( GET /about-your-spouse)', () => {
    it('should return view name with undefined details  when called', (done) => {
      maritalController.maritalPartnerDetailsGet(populatedDateRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/marital-selection-partner');
      assert.isUndefined(genericResponse.data.details, undefined);
      done();
    });

    it('should return view name with detail when called', (done) => {
      maritalController.maritalPartnerDetailsGet(populatedPartnerRequestWithSession, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/marital-selection-partner');
      assert.isTrue(genericResponse.data.details);
      done();
    });
  });

  describe(' maritalPartnerDetailsPost function ( POST /about-your-spouse)', () => {
    it('should return default view name when called with empty post object due to error', (done) => {
      maritalController.maritalPartnerDetailsPost(populatedPartnerRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/marital-selection-partner');
      done();
    });

    it('should return redirect to contact when called with valid overseas post object', (done) => {
      maritalController.maritalPartnerDetailsPost(populatedRequestPartnerPostDateOverseas, genericResponse);
      assert.isDefined(populatedRequestPartnerPostDateOverseas.session['marital-partner-married']);
      assert.equal(genericResponse.address, 'contact-details');
      done();
    });

    it('should return redirect to benefits when called with valid post object', (done) => {
      maritalController.maritalPartnerDetailsPost(populatedRequestPartnerPostDate, genericResponse);
      assert.isDefined(populatedRequestPartnerPostDate.session['marital-partner-married']);
      assert.equal(genericResponse.address, 'contact-details');
      done();
    });

    it('should return redirect to check and change when called with valid post object and in edit mode', (done) => {
      maritalController.maritalPartnerDetailsPost(populatedRequestPartnerPostDateEdit, genericResponse);
      assert.isDefined(populatedRequestPartnerPostDate.session['marital-partner-married']);
      assert.equal(genericResponse.address, 'check-your-details');
      done();
    });

    it('should filter out any post items that are not allowed and return a redirect', (done) => {
      maritalController.maritalPartnerDetailsPost(populatedRequestPartnerPostDateMoreFields, genericResponse);
      assert.isUndefined(populatedRequestMarriedPostDate.session['marital-date-married'].kittens);
      assert.isDefined(populatedRequestPartnerPostDate.session['marital-partner-married']);
      assert.equal(genericResponse.address, 'contact-details');
      done();
    });

    it('should filter out any post items that are not allowed and return a redirect for overseas', (done) => {
      maritalController.maritalPartnerDetailsPost(populatedRequestPartnerPostDateMoreFieldsOverseas, genericResponse);
      assert.isUndefined(populatedRequestMarriedPostDate.session['marital-date-married'].kittens);
      assert.isDefined(populatedRequestPartnerPostDate.session['marital-partner-married']);
      assert.equal(genericResponse.address, 'contact-details');
      done();
    });
  });
});
