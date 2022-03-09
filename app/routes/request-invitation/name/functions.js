const { requestFilter, name } = require('../../../../lib/utils/requestHelper');
const { get: getData, checkAndSave } = require('../../../../lib/dataStore');
const { validator } = require('../../../../lib/validations/request-invitation/nameValidation');

const get = (req, res) => {
  const details = getData(req, 'request-invitation-name');
  res.render('pages/request-invitation/name', { details });
};

const post = (req, res) => {
  const details = req.body;
  const errors = validator(details, req.session.lang);
  if (Object.keys(errors).length > 0) {
    res.render('pages/request-invitation/name', { details, errors });
  } else {
    const filteredRequest = requestFilter(name(), details);
    checkAndSave(req, 'request-invitation-name', filteredRequest);
    res.redirect('date-of-birth');
  }
};

module.exports = {
  get,
  post,
};
