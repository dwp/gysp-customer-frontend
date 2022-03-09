const { get: getData } = require('../../../../lib/dataStore');
const { statePensionDate: spaFormatter } = require('../../../../lib/helpers/dateFormatter');

const get = (req, res) => {
  const { statePensionDate } = getData(req, 'newStatePensionDate') || Object.create(null);
  const date = statePensionDate ? spaFormatter(statePensionDate, req.session.lang) : null;
  res.render('pages/request-invitation/cannot-request', {
    date,
  });
};

module.exports = {
  get,
};
