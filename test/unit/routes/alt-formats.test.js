const { assert } = require('chai');
const sinon = require('sinon');
const validator = require('../../../lib/validations/altFormats.js');

const { get, post } = require('../../../app/routes/alt-formats/functions.js');
const responseHelper = require('../../lib/responseHelper');

describe('Alt formats controller', () => {
  describe('get()', () => {
    describe('when landing on the alt-formats page after contact-details page', () => {
      it('should render the html', () => {
        const req = {
          session: {},
        };
        const res = responseHelper.genericResponse();
        get(req, res);

        assert.equal(res.viewName, 'pages/alt-formats.html');
      });
    });

    describe('when landing on the alt-formats page after from check your answers page', () => {
      it('should render the html and edit mode should be set in session', () => {
        const req = {
          session: {
            'alt-formats': 'yes',
          },
          query: {
            edit: 'true',
          },
        };
        const res = responseHelper.genericResponse();
        get(req, res);

        assert.equal(res.viewName, 'pages/alt-formats.html');
        assert.deepEqual(res.data, {
          selection: 'yes',
        });
        assert.equal(req.session.editSection, 'alt-formats');
      });
    });
  });

  describe('post()', () => {
    describe('when sending invalid req.body', () => {
      it('should render /alt-formats page with error', () => {
        const expectedErrorObj = {
          errorSummary: [
            {
              text: 'Select yes if you would like us to send letters to you in another format',
              href: '#altFormat-Yes',
            },
          ],
          fieldLevelErrors: {
            altFormat: {
              text: 'Select yes if you would like us to send letters to you in another format',
              href: '#altFormat-Yes',
            },
          },
        };

        const validationFake = sinon.fake.returns(expectedErrorObj);
        sinon.replace(validator, 'validate', validationFake);

        const req = {
          body: {},
          session: {
            lang: 'en',
          },
        };

        const res = responseHelper.genericResponse();
        post(req, res);

        assert.equal(res.viewName, 'pages/alt-formats.html');
        assert.deepEqual(res.data, expectedErrorObj);
        sinon.restore();
      });
    });

    describe('when sending valid req.body with "yes" as selection', () => {
      it('should redirect user to /alt-formats-choose page', () => {
        const req = {
          body: {
            altFormats: 'yes',
          },
          session: {
          },
        };

        const res = responseHelper.genericResponse();
        post(req, res);
        assert.equal(res.address, 'alt-formats-choose');
        assert.equal(req.session['alt-formats'], 'yes');
      });
    });

    describe('when sending valid req.body with "no" as selection', () => {
      it('should redirect user to /account-details page', () => {
        const req = {
          body: {
            altFormats: 'no',
          },
          session: {
          },
        };

        const res = responseHelper.genericResponse();
        post(req, res);
        assert.equal(res.address, 'account-details');
        assert.equal(req.session['alt-formats'], 'no');
      });
    });

    describe('when sending valid req.body with "yes" as selection and came back from check-your-details page', () => {
      it('should redirect user to /alt-formats-choose page, preserving previous selection in session', () => {
        const req = {
          body: {
            altFormats: 'yes',
          },
          session: {
            editSection: 'alt-formats',
            'alt-formats-choose': 'audioCassette',
            'alt-formats': 'yes',
          },
        };

        const res = responseHelper.genericResponse();
        post(req, res);
        assert.equal(res.address, 'alt-formats-choose');
        assert.equal(req.session['alt-formats'], 'yes');
        assert.equal(req.session['alt-formats-choose'], 'audioCassette');
      });
    });

    describe('when sending valid req.body with "no" as selection and came back from check-your-details page', () => {
      it('should redirect user to /check-your-details page, after clearing previous selection in session', () => {
        const req = {
          body: {
            altFormats: 'no',
          },
          session: {
            editSection: 'alt-formats',
            'alt-formats-choose': 'audioCassette',
            'alt-formats': 'yes',
          },
        };

        const res = responseHelper.genericResponse();
        post(req, res);
        assert.equal(res.address, 'check-your-details');
        assert.equal(req.session['alt-formats'], 'no');
        assert.equal(req.session['alt-formats-choose'], undefined);
      });
    });
  });
});
