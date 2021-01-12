const requestHelper = require('../../lib/helpers/requestHelper');

module.exports = (log) => (request) => {
  const traceId = requestHelper.getTraceID(request);
  const uriPath = requestHelper.getUriPath(request);
  log.info({ traceId }, `verify loadRequestId: ${request.session.requestId} - Requested on ${uriPath}`);
  return request.session.requestId;
};
