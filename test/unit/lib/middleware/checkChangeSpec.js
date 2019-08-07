const { assert } = require('chai');
const checkChange = require('../../../../lib/middleware/checkChange');
const responseHelper = require('../../../lib/responseHelper');

let genericResponse = {};
const emptyRequest = { session: {} };

const nextFunction = {
  nextValue: '',
  next() {
    this.nextValue = 'foo';
  },
};

describe('check change middleware', () => {
  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  it('should do nothing as there is an empty request', () => {
    checkChange()(emptyRequest, genericResponse, nextFunction.next);
    assert.equal(genericResponse.address, '');
  });
  it('should redirect when session has a changed marital-select edit section and path is not allowed', () => {
    const request = { session: { editSection: 'marital-select', editSectionChanged: true }, path: '/check-details' };
    checkChange()(request, genericResponse, nextFunction.next);
    assert.equal(genericResponse.address, '/what-is-your-current-marital-status');
  });
  it('should redirect when session has a changed lived-abroad edit section and path is not allowed', () => {
    const request = { session: { editSection: 'lived-abroad', editSectionChanged: true }, path: '/check-details' };
    checkChange()(request, genericResponse, nextFunction.next);
    assert.equal(genericResponse.address, '/have-you-ever-lived-outside-of-the-uk');
  });
  it('should redirect when session has a changed worked-abroad edit section and path is not allowed', () => {
    const request = { session: { editSection: 'worked-abroad', editSectionChanged: true }, path: '/check-details' };
    checkChange()(request, genericResponse, nextFunction.next);
    assert.equal(genericResponse.address, '/have-you-worked-outside-of-the-uk');
  });
  it('should redirect when session has a changed marital-select edit section and path is allowed', () => {
    const request = { session: { editSection: 'marital-select', editSectionChanged: true }, path: '/what-is-your-current-marital-status' };
    checkChange()(request, genericResponse, nextFunction.next);
    assert.equal(genericResponse.address, '');
  });
  it('should redirect when session has a changed lived-abroad edit section and path is allowed', () => {
    const request = { session: { editSection: 'lived-abroad', editSectionChanged: true }, path: '/have-you-ever-lived-outside-of-the-uk' };
    checkChange()(request, genericResponse, nextFunction.next);
    assert.equal(genericResponse.address, '');
  });
  it('should redirect when session has a changed worked-abroad edit section and path is allowed', () => {
    const request = { session: { editSection: 'worked-abroad', editSectionChanged: true }, path: '/have-you-worked-outside-of-the-uk' };
    checkChange()(request, genericResponse, nextFunction.next);
    assert.equal(genericResponse.address, '');
  });
  it('should do nothing as protected section does not match', () => {
    const request = { session: { editSection: 'bob', editSectionChanged: true }, path: '/check-details' };
    checkChange()(request, genericResponse, nextFunction.next);
    assert.equal(genericResponse.address, '');
  });
});
