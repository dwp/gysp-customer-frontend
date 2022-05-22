const dataStore = require('../../../lib/dataStore');
const checkChangeHelper = require('../../../lib/utils/checkChangeHelper');
const validator = require('../../../lib/validations/altFormatsChoose');

const get = (req, res) => {
  const selection = dataStore.get(req, 'alt-formats-choose');
  res.render('pages/alt-formats-choose.html', {
    selection,
  });
};

const post = (req, res) => {
  const { altFormatsChoice: selection } = req.body;
  const { errorSummary, fieldLevelErrors } = validator.validate(selection, req.session.lang);
  const hasErrors = errorSummary.length > 0;
  if (hasErrors) {
    res.render('pages/alt-formats-choose.html', {
      errorSummary,
      fieldLevelErrors,
    });
  } else {
    const editMode = checkChangeHelper.isEditMode(req, 'alt-formats');
    dataStore.save(req, 'alt-formats-choose', selection);
    if (editMode) {
      checkChangeHelper.clearCheckChange(req);
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
