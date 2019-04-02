const validation = require('../../../lib/validations/maritalValidation');
const filterRequest = require('../../../lib/utils/requestHelper');
const dataStore = require('../../../lib/dataStore');
const redirectHelper = require('../../../lib/helpers/redirectHelper');
const checkChangeHelper = require('../../../lib/utils/checkChangeHelper');

function checked(data, value) {
  if (data === value) {
    return true;
  }
  return false;
}

function maritalSelectGet(req, res) {
  checkChangeHelper.checkAndSetEditMode(req, 'marital-select');
  const formData = dataStore.get(req, 'marital-select');
  res.render('pages/marital-selection', { details: formData, checked });
}

function maritalSelectPost(req, res) {
  const errors = validation.selectionValidation(req.body, req.session.lang);
  if (Object.keys(errors).length > 0) {
    res.render('pages/marital-selection', { errors, checked });
  } else {
    const editMode = checkChangeHelper.isEditMode(req, 'marital-select');
    const redirectUrl = redirectHelper.redirectBasedOnStatusAndEditMode(req.body.maritalStatus, req.session.isOverseas, editMode);
    const filteredRequest = filterRequest.requestFilter(filterRequest.maritalSelect(), req.body);
    dataStore.checkAndSave(req, 'marital-select', filteredRequest, editMode);
    res.redirect(redirectUrl);
  }
}

function maritalStatusDateGet(req, res) {
  const { maritalStatus } = dataStore.get(req, 'marital-select');
  const formData = dataStore.get(req, `marital-date-${maritalStatus}`);
  res.render('pages/marital-selection-date', {
    formURL: req.route.path,
    maritalStatus,
    details: formData,
  });
}

function maritalStatusDatePost(req, res) {
  const { maritalStatus } = dataStore.get(req, 'marital-select');
  const errors = validation.dateValidator(req.body, maritalStatus, req.session.lang);
  if (Object.keys(errors).length > 0) {
    res.render('pages/marital-selection-date', {
      formURL: req.route.path, maritalStatus, details: req.body, errors,
    });
  } else {
    const editMode = checkChangeHelper.isEditMode(req, 'marital-select');
    const redirectUrl = redirectHelper.redirectBasedOnStatusPartner(maritalStatus);
    const filteredRequest = filterRequest.requestFilter(filterRequest.maritalDate(), req.body);
    dataStore.checkAndSave(req, `marital-date-${maritalStatus}`, filteredRequest, editMode);
    res.redirect(redirectUrl);
  }
}

function maritalPartnerDetailsGet(req, res) {
  checkChangeHelper.checkAndSetEditMode(req, 'marital-partner');
  const { maritalStatus } = dataStore.get(req, 'marital-select');
  const formData = dataStore.get(req, `marital-partner-${maritalStatus}`);
  res.render('pages/marital-selection-partner', {
    formURL: req.route.path,
    maritalStatus,
    details: formData,
  });
}

function maritalPartnerDetailsPost(req, res) {
  const { maritalStatus } = dataStore.get(req, 'marital-select');
  const errors = validation.partnerValidator(req.body, maritalStatus, req.session.lang);
  if (Object.keys(errors).length > 0) {
    res.render('pages/marital-selection-partner', {
      formURL: req.route.path, maritalStatus, details: req.body, errors,
    });
  } else {
    const editMode = checkChangeHelper.isEditMode(req, ['marital-select', 'marital-partner']);
    const filteredRequest = filterRequest.requestFilter(filterRequest.maritalStatusDetail(), req.body);
    dataStore.checkAndSave(req, `marital-partner-${maritalStatus}`, filteredRequest, editMode);
    if (editMode) {
      res.redirect('check-your-details');
    } else if (req.session.isOverseas) {
      res.redirect('contact-details');
    } else {
      res.redirect('are-you-receiving-any-benefits');
    }
  }
}

module.exports.maritalSelectGet = maritalSelectGet;
module.exports.maritalSelectPost = maritalSelectPost;
module.exports.maritalStatusDateGet = maritalStatusDateGet;
module.exports.maritalStatusDatePost = maritalStatusDatePost;
module.exports.maritalPartnerDetailsGet = maritalPartnerDetailsGet;
module.exports.maritalPartnerDetailsPost = maritalPartnerDetailsPost;
