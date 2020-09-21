const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const favicon = require('serve-favicon');
const i18next = require('i18next');
const i18nextHttpMiddleware = require('i18next-http-middleware');
const i18nextFsBackend = require('i18next-fs-backend');
const helmet = require('helmet');
const session = require('express-session');
const nunjucks = require('nunjucks');
const passport = require('passport');
const passportVerify = require('passport-verify');
const httpStatus = require('http-status-codes');
const overseas = require('./lib/middleware/overseas');
const requestHelper = require('./lib/helpers/requestHelper');
const checkChangeRedirect = require('./lib/middleware/checkChange');

const redisClient = require('./bootstrap/redisClient');

const config = require('./config/application');

const domain = require('./lib/urlExtract');
const log = require('./config/logging')('customer-frontend', config.application.logs);

const app = express();
const i18nextConfig = require('./config/i18next');

nunjucks.configure([
  'app/views',
  'node_modules/govuk-frontend/',
], {
  autoescape: true,
  trimBlocks: true,
  lstripBlocks: true,
  express: app,
  noCache: config.application.noTemplateCache,
});

// Multilingual information
i18next
  .use(i18nextFsBackend)
  .init(i18nextConfig);

app.use(i18nextHttpMiddleware.handle(i18next, { ignoreRoutes: ['/public'] }));

// Compression
app.use(compression());

// Disable x-powered-by header
app.disable('x-powered-by');

// Middleware to serve static assets
app.set('view engine', 'html');
app.use(`${config.mountUrl}assets`, express.static('./public'));
app.use(`${config.mountUrl}assets`, express.static(path.join(__dirname, '/node_modules/govuk-frontend/govuk')));
app.use(`${config.mountUrl}assets`, express.static(path.join(__dirname, '/node_modules/govuk-frontend/govuk/assets'), {
  maxage: 86400000,
}));
app.use(favicon('./node_modules/govuk-frontend/govuk/assets/images/favicon.ico'));

// Disable Etag for pages
app.disable('etag');

// Use helmet to set XSS security headers, Content-Security-Policy, etc.
app.use(helmet());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.noCache());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ['\'self\''],
    scriptSrc: ['\'self\'', '\'unsafe-inline\'', 'www.google-analytics.com'],
    imgSrc: ['\'self\'', 'www.google-analytics.com'],
    fontSrc: ['\'self\'', 'data: blob:'],
  },
  reportOnly: false,
  setAllHeaders: true,
  disableAndroid: false,
}));

app.set('trust proxy', 1);

// Session settings
const sessionConfig = {
  secret: config.application.session.secret,
  name: config.application.session.name,
  cookie: {
    maxAge: config.application.session.timeout,
    secure: config.application.session.cookies.secure,
    sameSite: config.application.session.cookies.sameSite,
  },
  resave: true,
  rolling: true,
  saveUninitialized: true,
};

if (config.application.session.store === 'redis') {
  sessionConfig.store = redisClient(session);
  sessionConfig.store.client.on('error', (err) => {
    log.error(`Redis error: ${err}`);
  });
}

app.use(session(sessionConfig));

function destroySessionAndRedirect(req, res) {
  req.session.destroy(() => {
    res.redirect(res.locals.serviceURL);
  });
}

// Add post middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use((req, res, next) => {
  if (req.session && req.session.lang) {
    req.i18n.changeLanguage(req.session.lang);
    res.locals.htmlLang = req.session.lang;
  } else {
    res.locals.htmlLang = req.i18n.language;
  }
  next();
});

let serviceURL = '/auth';
if (config.application.feature.verify === true) {
  serviceURL = '/confirm-identity';
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, JSON.stringify(user)));
  passport.deserializeUser((user, done) => done(null, JSON.parse(user)));

  passport.use(passportVerify.createStrategy(
    config.application.verify.verifyServiceProviderHost,
    responseBody => responseBody,
    responseBody => responseBody,
    (requestId, request) => {
      const traceId = requestHelper.getTraceID(request);
      const uriPath = requestHelper.getUriPath(request);
      log.info({ traceId }, `verify saveRequestId: ${requestId} - Requested on ${uriPath}`);
      request.session.requestId = requestId;
    },
    (request) => {
      const traceId = requestHelper.getTraceID(request);
      const uriPath = requestHelper.getUriPath(request);
      log.info({ traceId }, `verify loadRequestId: ${request.session.requestId} - Requested on ${uriPath}`);
      return request.session.requestId;
    },
    null,
    null,
    'LEVEL_1',
  ));
}

app.use(checkChangeRedirect(config.mountUrl));

// Route information
const generalRoutes = require('./app/routes/general/routes.js');
const authRoutes = require('./app/routes/auth/routes.js');
const verifyAuthRoutes = require('./app/routes/verify-auth/routes.js');
const verifyDetailRoutes = require('./app/routes/verify-detail/routes.js');
const dateRoutes = require('./app/routes/date/routes.js');
const startDateRoutes = require('./app/routes/start-date/routes.js');
const dobRoutes = require('./app/routes/dob/routes.js');
const overseasRoutes = require('./app/routes/overseas/routes.js');
const maritalRoutes = require('./app/routes/marital/routes.js');
const processRoute = require('./app/routes/process/routes.js');
const contactRoutes = require('./app/routes/contact/routes.js');
const completeRoute = require('./app/routes/complete/routes.js');
const declarationRoutes = require('./app/routes/declaration/routes.js');
const accountRoutes = require('./app/routes/account/routes.js');
const healthRoutes = require('./app/routes/health/routes.js');
const confirmIdentity = require('./app/routes/confirm-identity/routes.js');
const personalData = require('./app/routes/personal-data/routes.js');
const overseasStub = require('./app/routes/overseas-stub/routes.js');
const checkChange = require('./app/routes/check-change/routes.js');

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

      const i18nVars = Object.assign({}, split.filter((value, key) => {
        const vars = {};
        if (key !== undefined) {
          vars[key] = split[key];
        }
        return vars;
      }));
      return req.t(msgKey, i18nVars);
    };
  };
  /* eslint-enable arrow-body-style  */
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

app.use(config.mountUrl, healthRoutes);

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

app.use(config.mountUrl, generalRoutes);
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
    destroySessionAndRedirect(req, res);
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
    res.redirect(res.locals.serviceURL);
  }
});

app.use(config.mountUrl, dobRoutes);
app.use(config.mountUrl, dateRoutes);
app.use(config.mountUrl, startDateRoutes);
app.use(config.mountUrl, overseasRoutes);
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
  err.status = httpStatus.NOT_FOUND;
  next(err);
});

// Error catch
app.use((err, req, res, next) => {
  let status = (err.status || httpStatus.INTERNAL_SERVER_ERROR);
  res.status(httpStatus.OK);
  if (config.env !== 'production') {
    process.stdout.write(`\n${err.status}: ${err.message}\n\n`);
    process.stdout.write(`${err.stack}\n\n`);
  }
  log.error(`${status} - ${err.message} - Requested on ${req.method} ${req.path}`);

  // Certain errors 413, locals are not set, this is to make sure they are set.
  res.locals.serviceURL = serviceURL;
  res.locals.serviceName = i18next.t('app:service_name');
  res.locals.assetPath = '/assets';

  if (status !== httpStatus.INTERNAL_SERVER_ERROR || status !== httpStatus.FORBIDDEN) {
    status = 'generic';
  }

  res.render('pages/error', {
    status,
  });
  next();
});

module.exports = app;
