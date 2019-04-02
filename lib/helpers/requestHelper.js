const itemID = require('itemid');
const encyption = require('../encryption');

const config = require('../../config/yaml');

const requestInfo = {
  rejectUnauthorized: false,
  json: true,
};

const apikey = encyption.decrypt(config.application.urls.apiKey, config.secret);
const frontendApikey = encyption.decrypt(config.application.urls.frontendapiKey, config.secret);
const apiHost = process.env.CUSTOMERAPIHOST ? process.env.CUSTOMERAPIHOST : config.application.urls.host;

function getHeaders(type, apikeyType) {
  const id = itemID.newId();
  let contentType = type;
  if (type === undefined) {
    contentType = 'application/json';
  }
  const headers = {
    'User-Agent': 'customer-frontend',
    'X-B3-TraceId': id,
    'X-B3-SpanId': id,
    Host: apiHost,
    'Content-Type': contentType,
  };
  if (apikeyType === 'frontend') {
    headers.apiKey = frontendApikey;
  } else {
    headers.apiKey = apikey;
  }
  return headers;
}

module.exports = {
  generatePostCall(url, body, apikeyType) {
    return this.generateCall(url, body, 'POST', apikeyType);
  },
  generatePostCallWithFullResponse(url, body, apikeyType) {
    return this.generateCall(url, body, 'POST', apikeyType, true);
  },
  generateGetCall(url, body) {
    return this.generateCall(url, body);
  },
  generateGetCallWithFullResponse(url, body) {
    return this.generateCall(url, body, undefined, undefined, true);
  },
  generateCall(url, body, method, apikeyType, resolveWithFullResponse) {
    const call = {
      headers: getHeaders(undefined, apikeyType),
      url,
      body,
    };

    if (resolveWithFullResponse === true) {
      call.simple = false;
      call.resolveWithFullResponse = true;
    }
    if (method !== undefined) {
      call.method = method;
    }
    return Object.assign(call, requestInfo);
  },
  getHeaders() {
    return Object.assign(getHeaders(), requestInfo);
  },
  getTraceID(errors) {
    if (errors.options !== undefined) {
      return errors.options.headers['X-B3-TraceId'];
    } if (errors.req !== undefined && errors.req.headers !== undefined) {
      return errors.req.headers['x-b3-traceid'];
    }
    return 'no trace ID';
  },
  loggingHelper(error, location, traceID, logger, inviteKey) {
    if (error.statusCode) {
      logger.error({ inviteKey, traceID }, `${error.statusCode} - ${error.message} - Requested on ${location}`);
    } else {
      logger.error({ inviteKey, traceID }, `Other - ${error.message} - Requested on ${location}`);
    }
  },
  getUriPath(errors) {
    if (errors.response !== undefined) {
      return errors.response.request.uri.path;
    }
    if (errors.req !== undefined) {
      return errors.req.path;
    }
    return 'no uri path';
  },
};
