const dataStore = require('../../../lib/dataStore');
const helper = require('../../../lib/utils/checkChangeHelper');

async function getCheckChange(req, res) {
  const formData = dataStore.getAll(req);
  const filteredData = await helper.requestFilter(formData, req.session.lang);
  res.render('pages/check-change', { details: filteredData, formatId: helper.idFormatter, formatAnalytics: helper.analyticsTagFormatter });
}

module.exports.getCheckChange = getCheckChange;
