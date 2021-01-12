const requestHelper = require('../../lib/helpers/requestHelper');

module.exports = (log) => (requestId, request) => {
  const traceId = requestHelper.getTraceID(request);
  const uriPath = requestHelper.getUriPath(request);
  log.info({ traceId }, `verify saveRequestId: ${requestId} - Requested on ${uriPath}`);
  request.session.requestId = requestId;
};
