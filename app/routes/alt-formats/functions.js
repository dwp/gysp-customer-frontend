const dataStore = require('../../../lib/dataStore.js');
const validator = require('../../../lib/validations/altFormats.js');
const checkChangeHelper = require('../../../lib/utils/checkChangeHelper');

const get = (req, res) => {
  checkChangeHelper.checkAndSetEditMode(req, 'alt-formats');
  const errors = checkChangeHelper.setupDataAndShowErrorsMessages(req);
  const selection = dataStore.get(req, 'alt-formats');
  res.render('pages/alt-formats.html', {
    selection,
    ...errors,
  });
};

const post = (req, res) => {
  const { altFormats: selection } = req.body;
  const { errorSummary, fieldLevelErrors } = validator.validate(selection, req.session.lang);

  const hasErrors = errorSummary.length > 0;
  if (hasErrors) {
    res.render('pages/alt-formats.html', {
      errorSummary,
      fieldLevelErrors,
    });
  } else {
    const editMode = checkChangeHelper.isEditMode(req, 'alt-formats');
    dataStore.checkAndSave(req, 'alt-formats', selection, editMode);
    if (selection === 'yes') {
      res.redirect('alt-formats-choose');
    } else if (editMode) {
      checkChangeHelper.clearCheckChange(req);
      dataStore.delete(req, 'alt-formats-choose');
      res.redirect('check-your-details');
    } else {
      res.redirect('account-details');
    }
  }
};

module.exports = {
  get,
  post,
};
