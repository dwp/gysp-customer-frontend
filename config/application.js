/* eslint-disable max-len */
require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV || 'local',
  secret: process.env.CUSTOMER_FRONTEND_SECRET || 'thisIsASecret',
  mountUrl: process.env.CONTEXT_PATH || '/',
  cookieConcentName: process.env.COOKIE_CONCENT_NAME || 'seen_cookie_banner',
  gaTrackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID || null,
  gaDomain: process.env.GOOGLE_ANALYTICS_DOMAIN || 'localhost',
  application: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : null,
    tls: {
      enabled: process.env.USE_TLS === 'true',
      key: process.env.TLS_KEY || null,
      cert: process.env.TLS_CERT || null,
    },
    session: {
      store: process.env.SESSION_STORE || 'redis',
      name: process.env.SESSION_NAME || 'name',
      secret: process.env.CUSTOMER_FRONTEND_SESSION_SECRET || 'secret',
      timeout: process.env.SESSION_TIMEOUT ? parseInt(process.env.SESSION_TIMEOUT, 10) : 1800,
      timeoutDialogCountdown: process.env.TIMEOUT_DIALOG_COUNTDOWN ? parseInt(process.env.TIMEOUT_DIALOG_COUNTDOWN, 10) : 1500,
      cookies: {
        secure: process.env.SESSION_SECURE_COOKIES === 'true' || false,
        sameSite: process.env.SESSION_SAMESITE_COOKIES || 'None',
      },
    },
    urls: {
      host: 'gysp-dev-agent-proxy',
      keyServiceApiGateway: process.env.KEY_SERVICE_API_GATEWAY,
      claimServiceApiGateway: process.env.CLAIM_SERVICE_API_GATEWAY,
      customerServiceApiGateway: process.env.CUSTOMER_SERVICE_API_GATEWAY,
      bankValidateServiceApiGateway: process.env.BANK_VALIDATE_SERVICE_API_GATEWAY,
      keyServiceApiKey: process.env.KEY_SERVICE_API_KEY || 'U2FsdGVkX1+4PfQWxvxWovXkwGkw8zDfVCsUpP1J0gmegC+bIGKV7SjHygSmYupm',
      claimServiceApiKey: process.env.CLAIM_SERVICE_API_KEY || 'U2FsdGVkX1+4PfQWxvxWovXkwGkw8zDfVCsUpP1J0gmegC+bIGKV7SjHygSmYupm',
      customerServiceApiKey: process.env.CUSTOMER_SERVICE_API_KEY || 'U2FsdGVkX1+4PfQWxvxWovXkwGkw8zDfVCsUpP1J0gmegC+bIGKV7SjHygSmYupm',
      bankValidateServiceApiKey: process.env.BANK_VALIDATION_SERVICE_API_KEY || 'U2FsdGVkX1+4PfQWxvxWovXkwGkw8zDfVCsUpP1J0gmegC+bIGKV7SjHygSmYupm',
    },
    logs: {
      level: process.env.LOG_LEVEL || 'info',
    },
    feature: {
      bankFeature: (process.env.FEATURE_BANK === 'true') || true,
      dateConfirmation: (process.env.FEATURE_DATE_CONFIRMATION === 'true') || true,
      verify: (process.env.FEATURE_VERIFY === 'true') || true,
      language: (process.env.FEATURE_LANGUAGE === 'true') || true,
    },
    redis: {
      hosts: process.env.REDIS_HOSTS || null,
      prefix: process.env.REDIS_PREFIX || null,
    },
    verify: {
      verifyServiceProviderHost: process.env.VERIFY_SERVICE_PROVIDER_HOST,
    },
  },
};
