module.exports = {
  port: Number(process.env.PORT),
  secret: process.env.SECRET,
  application: {
    session: {
      store: process.env.SESSION_STORE,
      name: process.env.SESSION_NAME,
      secret: process.env.SESSION_SECRET,
      timeout: Number(process.env.SESSION_TIMEOUT),
      securecookies: (process.env.SESSION_SECURE_COOKIES === 'true'),
    },
    urls: {
      host: 'gysp-dev-agent-proxy',
      keyServiceApiGateway: `${process.env.KEY_SERVICE_API_GATEWAY}/api`,
      keyServiceApiKey: process.env.KEY_SERVICE_API_KEY,
      claimServiceApiGateway: `${process.env.CLAIM_SERVICE_API_GATEWAY}/api`,
      claimServiceApiKey: process.env.CLAIM_SERVICE_API_KEY,
      customerServiceApiGateway: `${process.env.CUSTOMER_SERVICE_API_GATEWAY}/api`,
      customerServiceApiKey: process.env.CUSTOMER_SERVICE_API_KEY,
    },
    logs: {
      level: process.env.LOG_LEVEL,
      path: process.env.LOG_PATH,
      size: process.env.LOG_SIZE,
      backups: Number(process.env.LOG_BACKUPS),
      rotate: process.env.LOG_ROTATE,
    },
    feature: {
      bankFeature: (process.env.FEATURE_BANK === 'true'),
      dateConfirmation: (process.env.FEATURE_DATE_CONFIRMATION === 'true'),
      verify: (process.env.FEATURE_VERIFY === 'true'),
      language: (process.env.FEATURE_LANGUAGE === 'true'),
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      prefix: process.env.REDIS_PREFIX,
      password: process.env.REDIS_PASSWORD,
    },
    verify: {
      verifyServiceProviderHost: `${process.env.VERIFY_SERVICE_PROVIDER_HOST}:50401`,
    },
  },
};
