const validation = require('../../../lib/validations/benefitsValidation');
const dataStore = require('../../../lib/dataStore');
const checkChangeHelper = require('../../../lib/utils/checkChangeHelper');

const nextPage = '/contact-details';

function getBenefits(req, res) {
  checkChangeHelper.checkAndSetEditMode(req, 'benefits');
  const details = dataStore.get(req, 'benefits');
  res.render('pages/benefits', { details });
}

function postBenefits(req, res) {
  const details = req.body;
  const editMode = checkChangeHelper.isEditMode(req, 'benefits');
  const errors = validation.benefitsValidation(req.body, req.session.lang);
  if (Object.keys(errors).length > 0) {
    res.render('pages/benefits', { details: req.body, errors });
  } else {
    dataStore.checkAndSave(req, 'benefits', details, editMode);
    if (editMode) {
      res.redirect('/check-your-details');
    } else {
      res.redirect(nextPage);
    }
  }
}

module.exports.getBenefits = getBenefits;
module.exports.postBenefits = postBenefits;
