const { assert } = require('chai');

const i18next = require('i18next');
const i18nextFsBackend = require('i18next-fs-backend');

const i18nextConfig = require('../../../config/i18next');

const checkChangeController = require('../../../app/routes/check-change/functions');
const responseHelper = require('../../lib/responseHelper');

let genericResponse = {};
const populatedSessionGet = { session: { 'contact-details': { homeTelephoneNumber: '000000000' } } };
const emptyRequest = { session: {} };

const populatedSessionRequest = [{
  key: { text: 'Contact details', classes: 'govuk-!-width-one-third' },
  value: { html: 'Home phone<br />000000000' },
  actions: {
    items: [{
      href: '/contact-details?edit=true', text: 'Change', visuallyHiddenText: 'Contact details', attributes: { id: 'contactDetails' },
    }],
  },
}];

describe('Check change controller ', () => {
  before(async () => {
    await i18next
      .use(i18nextFsBackend)
      .init(i18nextConfig);
  });

  beforeEach(() => {
    genericResponse = responseHelper.genericResponse();
  });

  describe(' getCheckChange function (GET /check-your-details)', () => {
    it('should return view name when called with unpopulated response data when session is not populated', async () => {
      await checkChangeController.getCheckChange(emptyRequest, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/check-change');
      assert.equal(JSON.stringify(genericResponse.data.details), '[]');
    });

    it('should return view name when called with populated response data when session is set', async () => {
      await checkChangeController.getCheckChange(populatedSessionGet, genericResponse);
      assert.equal(genericResponse.viewName, 'pages/check-change');
      assert.equal(JSON.stringify(genericResponse.data.details), JSON.stringify(populatedSessionRequest));
    });
  });
});
