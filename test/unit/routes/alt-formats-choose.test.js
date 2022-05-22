const { assert } = require('chai');
const sinon = require('sinon');
const validator = require('../../../lib/validations/altFormatsChoose');
const { get, post } = require('../../../app/routes/alt-formats-choose/functions');
const responseHelper = require('../../lib/responseHelper');

describe('Alt formats choose controller', () => {
  describe('get()', () => {
    describe('when landing on alt-formats-choose page', () => {
      it('should render the form to pick an option', () => {
        const req = {
          session: {},
        };

        const res = responseHelper.genericResponse();
        get(req, res);

        assert.equal(res.viewName, 'pages/alt-formats-choose.html');
      });
    });

    describe('when landing on alt-formats-choose page with selection in session', () => {
      it('should render the form with the selection passed into the view', () => {
        const req = {
          session: {
            'alt-formats': 'yes',
            'alt-formats-choose': 'audioCassette',
          },
        };

        const res = responseHelper.genericResponse();
        get(req, res);

        assert.equal(res.viewName, 'pages/alt-formats-choose.html');
        assert.deepEqual(res.data, {
          selection: 'audioCassette',
        });
      });
    });
  });

  describe('post', () => {
    describe('when posting req.body with invalid data', () => {
      it('should render the view with errors', () => {
        const expectedErrorObj = {
          errorSummary: [
            {
              text: 'Select how you would like us to send letters to you',
              href: '#audioCassette',
            },
          ],
          fieldLevelErrors: {
            altFormatsChoice: {
              text: 'Select how you would like us to send letters to you',
              href: '#audioCassette',
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

        assert.equal(res.viewName, 'pages/alt-formats-choose.html');
        assert.deepEqual(res.data, expectedErrorObj);
        sinon.restore();
      });
    });

    describe('when posting req.body with valid "audioCd" as selected option', () => {
      it('should redirect the user to account-details page', () => {
        const req = {
          body: {
            altFormatsChoice: 'audioCd',
          },
          session: {
            lang: 'en',
            'alt-formats-choose': 'audioCassette',
          },
        };
        const res = responseHelper.genericResponse();

        post(req, res);

        assert.equal(res.address, 'account-details');
        assert.equal(req.session['alt-formats-choose'], 'audioCd');
      });
    });

    describe('when posting req.body with valid "braille" as selected option and come through to this page after visiting check-your-details page', () => {
      it('should redirect the user to check-your-details page after saving the new selection in session', () => {
        const req = {
          body: {
            altFormatsChoice: 'braille',
          },
          session: {
            lang: 'en',
            editSection: 'alt-formats',
            'alt-formats-choose': 'audioCassette',
          },
        };
        const res = responseHelper.genericResponse();

        post(req, res);

        assert.equal(res.address, 'check-your-details');
        assert.equal(req.session['alt-formats-choose'], 'braille');
      });
    });
  });
});
