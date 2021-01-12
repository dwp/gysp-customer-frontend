const connectRedis = require('connect-redis');

module.exports = (session, config) => {
  const redisHostUrl = new URL(`dummy://${config.hosts}`);
  const redisHost = { host: redisHostUrl.hostname, port: redisHostUrl.port };
  if (redisHostUrl.username) {
    redisHost.password = redisHostUrl.username;
  }
  if (config.prefix) {
    redisHost.prefix = config.prefix;
  }
  const RedisStore = connectRedis(session);
  return new RedisStore(redisHost);
};
