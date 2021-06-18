const got = require('got');
const config = require('../../../config/application');

const getApiOptions = () => {
  const apiOptions = {
    prefixUrl: `${config.application.urls.auditGateway}/audit-adapter/api/v1/`,
  };
  if (config.application.tls.enabled && config.application.tls.ca) {
    apiOptions.https = {
      certificateAuthority: config.application.tls.ca,
    };
  }
  return apiOptions;
};

const API = got.extend(getApiOptions());

module.exports = {
  audit: (eventNumber, auditEvent) => API.post(`${eventNumber}/audits`, { json: { ...auditEvent, eventNumber: undefined } }),
};
