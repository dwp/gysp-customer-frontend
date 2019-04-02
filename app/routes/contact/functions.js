const dataStore = require('../../../lib/dataStore');
const filterRequest = require('../../../lib/utils/requestHelper');
const validation = require('../../../lib/validations/contactValidation');
const checkChangeHelper = require('../../../lib/utils/checkChangeHelper');

function checked(data, value) {
  if (data === value) {
    return true;
  }
  return false;
}

function contactDetailsGet(req, res) {
  checkChangeHelper.checkAndSetEditMode(req, 'contact-details');
  const formData = dataStore.get(req, 'contact-details');
  res.render('pages/contactdetails', { details: formData, checked });
}

function contactDetailsPost(req, res) {
  const errors = validation.detailsValidation(req.body, req.session.lang);
  if (Object.keys(errors).length > 0) {
    res.render('pages/contactdetails', { errors, details: req.body, checked });
  } else {
    const editMode = checkChangeHelper.isEditMode(req, 'contact-details');
    const filteredRequest = filterRequest.requestFilter(filterRequest.contactDetails(), req.body);
    const details = dataStore.filterContactDetails(filteredRequest);
    dataStore.checkAndSave(req, 'contact-details', details, editMode);
    if (editMode) {
      res.redirect('check-your-details');
    } else {
      res.redirect('account-details');
    }
  }
}

module.exports.contactDetailsGet = contactDetailsGet;
module.exports.contactDetailsPost = contactDetailsPost;
