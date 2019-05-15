module.exports = {
  ns: {
    namespaces: ['app',
      'auth',
      'auth-error-address',
      'auth-error-invite-code',
      'account',
      'account-overseas',
      'benefits',
      'complete',
      'cookies',
      'contact',
      'customer-details',
      'date-page',
      'pension-start-date',
      'pension-start-date-error',
      'dob-confirmation',
      'dob-proof',
      'dob-proof-overseas',
      'google-analytics',
      'feedback',
      'marital-date',
      'marital-details',
      'marital-select',
      'lived-abroad',
      'lived-abroad-country',
      'worked-abroad',
      'worked-abroad-country',
      'countries',
      'pension-age',
      'declaration',
      'start',
      'confirm-identity',
      'personal-data',
      'verify-start',
      'verify-cancel',
      'confirm-identity',
      'verify-your-details',
      'verify-no-match',
      'verify-pension-age',
      'verify-sign-in',
      'check-change'],
    defaultNs: 'app',
  },
  supportedLngs: ['en-GB', 'cy-GB'],
  preload: ['en', 'cy'],
  fallbackLng: 'en',
  useCookie: false,
  debug: false,
  currentLang: 'en-GB',
  sendMissingTo: 'fallback',
  detectLngFromPath: 0,
  ignoreRoutes: ['public/'],
};
