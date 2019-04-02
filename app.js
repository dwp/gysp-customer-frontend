const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const favicon = require('serve-favicon');
const i18n = require('i18next');
const helmet = require('helmet');
const session = require('express-session');
const nunjucks = require('nunjucks');
const passport = require('passport');
const passportVerify = require('passport-verify');
const connectRedis = require('connect-redis');
const encyption = require('./lib/encryption');
const overseas = require('./lib/middleware/overseas');
const requestHelper = require('./lib/helpers/requestHelper');

const config = require('./config/yaml');

const domain = require('./lib/urlExtract');
const log = require('./config/logging')('customer-frontend', config.application.logs);

const app = express();
const i18nConfig = require('./config/i18n');

// Config variables
let noTemplateCache = true;

const statusCodeErrorWrap = 200;

let { verifyServiceProviderHost } = config.application.verify;
if (process.env.VERIFY_SERVICE_PROVIDER_HOST) {
  verifyServiceProviderHost = process.env.VERIFY_SERVICE_PROVIDER_HOST;
}


// Template setup for nunjucks
if (config.env !== 'local') {
  noTemplateCache = false;
}

nunjucks.configure([
  'app/views',
  'node_modules/govuk-frontend/',
  'node_modules/govuk-frontend/components/',
], {
  autoescape: true,
  trimBlocks: true,
  lstripBlocks: true,
  express: app,
  noCache: noTemplateCache,
});

// Multilingual information
i18n.init(i18nConfig);
app.use(i18n.handle);
i18n.registerAppHelper(app);

// Compression
app.use(compression());

// Disable x-powered-by header
app.disable('x-powered-by');

// Middleware to serve static assets
app.set('view engine', 'html');
app.use('/assets', express.static('./public'));
app.use('/assets', express.static(path.join(__dirname, '/node_modules/govuk-frontend')));
app.use('/assets', express.static(path.join(__dirname, '/node_modules/govuk-frontend/assets'), { maxage: 86400000 }));
app.use(favicon('./node_modules/govuk-frontend/assets/images/favicon.ico'));

// Disable Etag for pages
app.disable('etag');

// Use helmet to set XSS security headers, Content-Security-Policy, etc.
app.use(helmet());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.noCache());
app.use(helmet.csp({
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

// Session settings
const sessionConfig = {
  secret: config.application.session.secret,
  name: config.application.session.name,
  cookie: {
    maxAge: config.application.session.timeout,
  },
  resave: true,
  rolling: true,
  saveUninitialized: true,
};

app.set('trust proxy', 1);

if (config.application.session.securecookies === true) {
  sessionConfig.cookie.secure = true;
}

if (config.application.session.store === 'redis') {
  const { redis } = config.application;
  redis.host = process.env.REDIS_HOST || '127.0.0.1';
  redis.password = encyption.decrypt(redis.password, config.secret);
  const RedisStore = connectRedis(session);

  sessionConfig.store = new RedisStore(redis);
}

function destroySessionAndRedirect(req, res) {
  req.session.destroy(() => {
    res.redirect(res.locals.serviceURL);
  });
}

function checkDateMatches(data, value) {
  if (data === value) {
    return true;
  }
  return false;
}

app.use(session(sessionConfig));

// Add post middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use((req, res, next) => {
  if (req.session.lang) {
    req.i18n.setLng(req.session.lang);
    res.locals.htmlLang = req.session.lang;
  } else {
    res.locals.htmlLang = req.i18n.lng();
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
    verifyServiceProviderHost,
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
const benefits = require('./app/routes/benefits/routes.js');

if (config.env !== 'prod') {
  app.use('/', overseasStub);
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
  res.locals.serviceName = i18n.t('app:service_name');
  res.locals.customerApiGateway = process.env.CUSTOMERAPIGATEWAY ? process.env.CUSTOMERAPIGATEWAY : config.application.urls.api;
  res.locals.frontendApiGateway = process.env.CUSTOMERAPIGATEWAY ? process.env.CUSTOMERAPIGATEWAY : config.application.urls.frontendapi;
  res.locals.languageFeature = config.application.feature.language;
  res.locals.checked = checkDateMatches;
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

app.use('/', healthRoutes);

app.use((req, res, next) => {
  let err = '';
  if (config.application.urls.api === '' || config.application.urls.api === undefined) {
    err = new Error('No backend URL supplied');
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

app.use('/', generalRoutes);
if (config.application.feature.verify === false) {
  app.use('/', authRoutes);
}
if (config.application.feature.verify === true) {
  app.use('/', confirmIdentity);
  app.use('/', verifyAuthRoutes);
}
app.use('/', authRoutes);
app.use((req, res, next) => {
  if (domain.extract(req.headers.referer) === req.hostname || req.path === '/verify/your-details') {
    next();
  } else {
    log.error(`Security redirect - user agent failed to match - ${req.method} ${req.path}`);
    destroySessionAndRedirect(req, res);
  }
});
if (config.application.feature.verify === true) {
  app.use('/', personalData);
}

function checkInSessionAndCompletedAndNotOnCompletePage(req) {
  if (req.session.userPassedAuth === true && req.session.userHasCompleted === true && req.path !== '/complete') {
    return true;
  }
  return false;
}

app.use((req, res, next) => {
  if (checkInSessionAndCompletedAndNotOnCompletePage(req)) {
    req.session.redirectComplete = true;
    log.error('user has already completed');
    res.redirect('/complete');
  } else {
    next();
  }
});

app.use((req, res, next) => {
  if (req.session.userPassedAuth === true) {
    next();
  } else {
    log.error(`Security redirect - not in session - ${req.method} ${req.path}`);
    res.redirect(res.locals.serviceURL);
  }
});

app.use('/', benefits);
app.use('/', dobRoutes);
app.use('/', dateRoutes);
app.use('/', startDateRoutes);
app.use('/', overseasRoutes);
app.use('/', maritalRoutes);
app.use('/', processRoute);
app.use('/', contactRoutes);
app.use('/', completeRoute);
app.use('/', declarationRoutes);
app.use('/', accountRoutes);
app.use('/', verifyDetailRoutes);
app.use('/', checkChange);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error catch
app.use((err, req, res, next) => {
  let status = (err.status || 500);
  res.status(statusCodeErrorWrap);
  if (config.env !== 'prod') {
    process.stdout.write(`\n${err.status}: ${err.message}\n\n`);
    process.stdout.write(`${err.stack}\n\n`);
  }
  log.error(`${status} - ${err.message} - Requested on ${req.method} ${req.path}`);

  // Certain errors 413, locals are not set, this is to make sure they are set.
  res.locals.serviceURL = serviceURL;
  res.locals.serviceName = i18n.t('app:service_name');
  res.locals.assetPath = '/assets';

  if (status !== 500 || status !== 403) {
    status = 'generic';
  }

  res.render('pages/error', {
    status,
  });
  next();
});

module.exports = app;
