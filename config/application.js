module.exports = {
  port: Number(process.env.PORT) || 8100,
  secret: process.env.SECRET || 'secret',
  application: {
    session: {
      store: process.env.SESSION_STORE || 'redis',
      name: process.env.SESSION_NAME || 'name',
      secret: process.env.SESSION_SECRET || 'secret',
      timeout: Number(process.env.SESSION_TIMEOUT) || 200000,
      securecookies: (process.env.SESSION_SECURE_COOKIES === 'true'),
    },
    urls: {
      host: 'gysp-dev-agent-proxy',
      keyServiceApiGateway: `${process.env.KEY_SERVICE_API_GATEWAY}/api`,
      keyServiceApiKey: process.env.KEY_SERVICE_API_KEY || 'U2FsdGVkX1/D5EN8vd/E8Cf8yArx8trlyIdFpzLGlDs=',
      claimServiceApiGateway: `${process.env.CLAIM_SERVICE_API_GATEWAY}/api`,
      claimServiceApiKey: process.env.CLAIM_SERVICE_API_KEY || 'U2FsdGVkX1/D5EN8vd/E8Cf8yArx8trlyIdFpzLGlDs=',
      customerServiceApiGateway: `${process.env.CUSTOMER_SERVICE_API_GATEWAY}/api`,
      customerServiceApiKey: process.env.CUSTOMER_SERVICE_API_KEY || 'U2FsdGVkX1/D5EN8vd/E8Cf8yArx8trlyIdFpzLGlDs=',
      bankValidateServiceApiGateway: `${process.env.BANK_VALIDATE_SERVICE_API_GATEWAY}/api`,
      bankValidateServiceApiKey: process.env.BANK_VALIDATE_SERVICE_API_KEY || 'U2FsdGVkX1/D5EN8vd/E8Cf8yArx8trlyIdFpzLGlDs=',
    },
    logs: {
      level: process.env.LOG_LEVEL,
      path: process.env.LOG_PATH,
      size: process.env.LOG_SIZE,
      backups: Number(process.env.LOG_BACKUPS),
      rotate: process.env.LOG_ROTATE,
    },
    feature: {
      bankFeature: (process.env.FEATURE_BANK === 'true') || true,
      dateConfirmation: (process.env.FEATURE_DATE_CONFIRMATION === 'true') || true,
      verify: (process.env.FEATURE_VERIFY === 'true') || true,
      language: (process.env.FEATURE_LANGUAGE === 'true') || true,
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
