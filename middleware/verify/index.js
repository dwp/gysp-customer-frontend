const verify = require('./verify');

module.exports = (app, log, config) => {
  verify(app, log, config);
};
