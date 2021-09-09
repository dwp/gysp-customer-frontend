const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const { StatusCodes } = require('http-status-codes');

const domain = require('./lib/urlExtract');
const sessionHelper = require('./lib/helpers/sessionHelper');

// Middleware
const headersMiddleware = require('./middleware/headers/index');
const staticMiddleware = require('./middleware/static/index');
const nunjucksMiddleware = require('./middleware/nunjucks/index');
const sessionMiddleware = require('./middleware/session/index');
const i18nextMiddleware = require('./middleware/i18n/index');
const verifyMiddleware = require('./middleware/verify/index');
const pageMiddleware = require('./middleware/page/index');
const cookieMiddleware = require('./middleware/cookie-message/index');

const checkChangeRedirect = require('./middleware/checkChange');
const overseas = require('./middleware/overseas');

// Config
const config = require('./config/application');
const i18nextConfig = require('./config/i18next');
const log = require('./config/logging')('customer-frontend', config.application.logs);

const app = express();

// Include cookie parser
app.use(cookieParser());

// Serve default, implicit favicon
app.use(config.mountUrl, favicon('./node_modules/govuk-frontend/govuk/assets/images/favicon.ico'));

// Mount all the required middleware
staticMiddleware({
  app,
  npmGovukFrontend: path.join(__dirname, '/node_modules/govuk-frontend'),
  mountUrl: config.mountUrl,
});

headersMiddleware(app);

nunjucksMiddleware(app, [
  'app/views',
  'node_modules/govuk-frontend/',
  'node_modules/hmrc-frontend/',
]);

sessionMiddleware(app, log, config.application, {
  SESSION_KEEP_ALIVE: '/session-keep-alive',
  SESSION_ENDED: '/',
  SESSION_TIMEOUT: '/session-timeout',
});

pageMiddleware(app);

const i18next = i18nextMiddleware(app, i18nextConfig, log);

cookieMiddleware(app, config.cookieConcentName, config.gaTrackingId, config.gaDomain);

let serviceURL = '/auth';
if (config.application.feature.verify === true) {
  serviceURL = '/confirm-identity';
  verifyMiddleware(app, log, config.application.verify);
}

app.use(checkChangeRedirect(config.mountUrl));

// Route information
const generalRoutes = require('./app/routes/general/routes.js');
const cookiesRoutes = require('./app/routes/cookies/routes.js');
const authRoutes = require('./app/routes/auth/routes.js');
const verifyAuthRoutes = require('./app/routes/verify-auth/routes.js');
const verifyDetailRoutes = require('./app/routes/verify-detail/routes.js');
const dateRoutes = require('./app/routes/date/routes.js');
const startDateRoutes = require('./app/routes/start-date/routes.js');
const dobRoutes = require('./app/routes/dob/routes.js');
const overseasRoutes = require('./app/routes/overseas/routes.js');
const prisonRoutes = require('./app/routes/prison/routes.js');
const maritalRoutes = require('./app/routes/marital/routes.js');
const processRoute = require('./app/routes/process/routes.js');
const contactRoutes = require('./app/routes/contact/routes.js');
const completeRoute = require('./app/routes/complete/routes.js');
const declarationRoutes = require('./app/routes/declaration/routes.js');
const accountRoutes = require('./app/routes/account/routes.js');
const actuatorRoutes = require('./app/routes/actuator/routes.js');
const confirmIdentity = require('./app/routes/confirm-identity/routes.js');
const personalData = require('./app/routes/personal-data/routes.js');
const overseasStub = require('./app/routes/overseas-stub/routes.js');
const checkChange = require('./app/routes/check-change/routes.js');
const sessionRoutes = require('./app/routes/session/routes.js');

if (config.env !== 'production') {
  app.use(config.mountUrl, overseasStub);
}
// Overseas middleware
app.use(overseas());
app.use((req, res, next) => {
  if (req.session.isOverseas) {
    serviceURL = '/auth';
  } else {
    serviceURL = '/confirm-identity';
  }
  next();
});

app.use((req, res, next) => {
  /* eslint-disable arrow-body-style  */
  res.locals.i18n = () => {
    return (text) => {
      const split = text.split(',');
      const msgKey = split.shift().trim();

      const i18nVars = {
        ...split.filter((value, key) => {
          const vars = {};
          if (key !== undefined) {
            vars[key] = split[key];
          }
          return vars;
        }),
      };
      return req.t(msgKey, i18nVars);
    };
  };

  res.locals.logger = log;
  res.locals.assetPath = '/assets';
  res.locals.serviceURL = serviceURL;
  res.locals.mountUrl = config.mountUrl;
  res.locals.serviceName = i18next.t('app:service_name');
  res.locals.keyServiceApiGateway = config.application.urls.keyServiceApiGateway;
  res.locals.claimServiceApiGateway = config.application.urls.claimServiceApiGateway;
  res.locals.customerServiceApiGateway = config.application.urls.customerServiceApiGateway;
  res.locals.bankValidateServiceApiGateway = config.application.urls.bankValidateServiceApiGateway;
  res.locals.languageFeature = config.application.feature.language;
  res.locals.checked = (data, value) => data === value;
  next();
});

app.use((req, res, next) => {
  if (req.session.isNorthernIreland !== undefined) {
    res.locals.isNorthernIreland = req.session.isNorthernIreland;
  }
  if (req.session.isBeforeSpa !== undefined) {
    res.locals.isBeforeSpa = req.session.isBeforeSpa;
  }
  if (req.session.isInviteCodeLogin !== undefined) {
    res.locals.isInviteCodeLogin = req.session.isInviteCodeLogin;
  }
  if (req.session.isOverseas !== undefined) {
    res.locals.isOverseas = req.session.isOverseas;
  }
  next();
});

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'must-revalidate, no-cache, no-store, private');
  res.setHeader('Pragma', 'no-cache');
  next();
});

app.use(`${config.mountUrl}actuator`, actuatorRoutes);

app.use((req, res, next) => {
  let err = '';
  if (config.application.urls.keyServiceApiGateway === '' || config.application.urls.keyServiceApiGateway === undefined) {
    err = new Error('No key service URL supplied');
    return next(err);
  }
  if (config.application.urls.claimServiceApiGateway === '' || config.application.urls.claimServiceApiGateway === undefined) {
    err = new Error('No claim service URL supplied');
    return next(err);
  }
  if (config.application.urls.customerServiceApiGateway === '' || config.application.urls.customerServiceApiGateway === undefined) {
    err = new Error('No customer service URL supplied');
    return next(err);
  }
  if (!req.session) {
    err = new Error('Redis is down');
    return next(err);
  }
  return next();
});

app.use((req, res, next) => {
  if (req.session.inviteKeyHash) {
    res.locals.inviteKeyHash = req.session.inviteKeyHash;
  }
  next();
});

if (config.env === 'local') {
  // eslint-disable-next-line global-require
  app.use(`${config.mountUrl}audit-adapter`, require('./app/routes/audit-adapter-stub/routes'));
}

app.use(config.mountUrl, generalRoutes);
app.use(config.mountUrl, cookiesRoutes);
app.use(config.mountUrl, sessionRoutes);
if (config.application.feature.verify === false) {
  app.use(config.mountUrl, authRoutes);
}
if (config.application.feature.verify === true) {
  app.use(config.mountUrl, confirmIdentity);
  app.use(config.mountUrl, verifyAuthRoutes);
}
app.use(config.mountUrl, authRoutes);
app.use((req, res, next) => {
  if (domain.extract(req.headers.referer) === req.hostname || req.path.includes('/verify/your-details')) {
    next();
  } else {
    log.info(`Security redirect - user agent failed to match - ${req.method} ${req.path}`);
    sessionHelper.destroySessionAndRedirect(req, res);
  }
});
if (config.application.feature.verify === true) {
  app.use(config.mountUrl, personalData);
}

function checkInSessionAndCompletedAndNotOnCompletePage(req) {
  if (req.session.userPassedAuth === true && req.session.userHasCompleted === true && !req.path.includes('/complete')) {
    return true;
  }
  return false;
}

app.use((req, res, next) => {
  if (checkInSessionAndCompletedAndNotOnCompletePage(req)) {
    req.session.redirectComplete = true;
    log.info('user has already completed');
    res.redirect('complete');
  } else {
    next();
  }
});

app.use((req, res, next) => {
  if (req.session.userPassedAuth === true) {
    next();
  } else {
    log.info(`Security redirect - not in session - ${req.method} ${req.path}`);
    res.redirect(res.locals.timeoutDialog.timeoutUrl);
  }
});

app.use(config.mountUrl, dobRoutes);
app.use(config.mountUrl, dateRoutes);
app.use(config.mountUrl, startDateRoutes);
app.use(config.mountUrl, overseasRoutes);
app.use(config.mountUrl, prisonRoutes);
app.use(config.mountUrl, maritalRoutes);
app.use(config.mountUrl, processRoute);
app.use(config.mountUrl, contactRoutes);
app.use(config.mountUrl, completeRoute);
app.use(config.mountUrl, declarationRoutes);
app.use(config.mountUrl, accountRoutes);
app.use(config.mountUrl, verifyDetailRoutes);
app.use(config.mountUrl, checkChange);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = StatusCodes.NOT_FOUND;
  next(err);
});

// Error catch
app.use((err, req, res, next) => {
  let status = (err.status || StatusCodes.INTERNAL_SERVER_ERROR);
  res.status(StatusCodes.OK);
  if (config.env !== 'production') {
    process.stdout.write(`\n${err.status}: ${err.message}\n\n`);
    process.stdout.write(`${err.stack}\n\n`);
  }
  log.error(`${status} - ${err.message} - Requested on ${req.method} ${req.path}`);

  // Certain errors 413, locals are not set, this is to make sure they are set.
  res.locals.serviceURL = serviceURL;
  res.locals.serviceName = i18next.t('app:service_name');
  res.locals.assetPath = '/assets';

  if (status !== StatusCodes.INTERNAL_SERVER_ERROR || status !== StatusCodes.FORBIDDEN) {
    status = 'generic';
  }

  res.render('pages/error', {
    status,
  });
  next();
});

module.exports = app;
