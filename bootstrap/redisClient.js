const connectRedis = require('connect-redis');
const config = require('../config/application');

module.exports = (session) => {
  const { redis } = config.application;
  const redisHostUrl = new URL(`dummy://${redis.hosts}`);
  const redisHost = { host: redisHostUrl.hostname, port: redisHostUrl.port };
  if (redisHostUrl.username) {
    redisHost.password = redisHostUrl.username;
  }
  if (redis.prefix) {
    redisHost.prefix = redis.prefix;
  }
  const RedisStore = connectRedis(session);
  return new RedisStore(redisHost);
};
