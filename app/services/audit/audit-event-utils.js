const getIpFromRequest = (req) => {
  let ip = (typeof req.headers['x-forwarded-for'] === 'string'
    && req.headers['x-forwarded-for'].split(',').shift());
  if (!ip && req.connection) {
    ip = req.connection.remoteAddress;
  }
  if (!ip && req.socket) {
    ip = req.socket.remoteAddress;
  }
  if (!ip && req.connection && req.connection.socket) {
    ip = req.connection.socket.remoteAddress;
  }
  return ip;
};

module.exports = {
  getIpFromRequest,
};
