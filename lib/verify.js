module.exports = {
  createUser: (responseBody) => responseBody,
  verifyUser: (responseBody) => responseBody,
  saveRequestId: (requestId, request) => {
    request.session.requestId = requestId;
  },
  loadRequestId: (request) => request.session.requestId,
};
