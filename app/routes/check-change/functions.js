const dataStore = require('../../../lib/dataStore');
const helper = require('../../../lib/utils/checkChangeHelper');

function getCheckChange(req, res) {
  helper.cleanSessionForCheckAndChange(req);
  const formData = dataStore.getAll(req);
  const filteredData = helper.requestFilter(formData, req.session.lang);
  res.render('pages/check-change', { details: filteredData, formatId: helper.idFormatter, formatAnalytics: helper.analyticsTagFormatter });
}

module.exports.getCheckChange = getCheckChange;
