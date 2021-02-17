const itemID = require('itemid');
const encyption = require('../encryption');

const config = require('../../config/application');

const requestInfo = {
  responseType: 'json',
  https: {
    rejectUnauthorized: false,
  },
};

const apikey = encyption.decrypt(config.application.urls.customerServiceApiKey, config.secret);
const frontendApikey = encyption.decrypt(config.application.urls.bankValidateServiceApiKey, config.secret);
const apiHost = config.application.urls.host;

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

function getResponseHeaderMessage(error) {
  if (error !== undefined
    && error.response !== undefined
    && error.response.headers !== undefined
    && error.response.headers.message !== undefined) {
    return error.response.headers.message;
  }
  return false;
}

module.exports = {
  generatePostCall(url, body, apikeyType) {
    return this.generateCall(url, body, 'POST', apikeyType);
  },
  generateGetCall(url, body) {
    return this.generateCall(url, body, 'GET');
  },
  generateCall(url, body, method, apikeyType) {
    const call = {
      headers: getHeaders(undefined, apikeyType),
      url,
    };

    if (body && Object.keys(body).length > 0) {
      call.json = body;
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
    if (errors.options !== undefined && errors.options.headers) {
      return errors.options.headers['X-B3-TraceId'];
    }
    if (errors.req !== undefined && errors.req.headers !== undefined) {
      return errors.req.headers['x-b3-traceid'];
    }
    return 'no trace ID';
  },
  errorLoggingHelper(error, location, traceID, logger, inviteKey) {
    const headerErrorMessage = getResponseHeaderMessage(error);
    if (error.response && error.response.statusCode && headerErrorMessage) {
      logger.error({ inviteKey, traceID }, `${error.response.statusCode} - ${headerErrorMessage} - Requested on ${location}`);
    } else if (error.response && error.response.statusCode) {
      logger.error({ inviteKey, traceID }, `${error.response.statusCode} - ${error.message} - Requested on ${location}`);
    } else if (error.message && error.message.startsWith('Response IssueInstant is too far in the past')) {
      logger.warn({ inviteKey, traceID }, `Other - ${error.message} - Requested on ${location}`);
    } else {
      logger.error({ inviteKey, traceID }, `Other - ${error.message} - Requested on ${location}`);
    }
  },
  infoLoggingHelper(error, location, traceID, logger, inviteKey) {
    const headerErrorMessage = getResponseHeaderMessage(error);
    if (error.response && error.response.statusCode && headerErrorMessage) {
      logger.info({ inviteKey, traceID }, `${error.response.statusCode} - ${headerErrorMessage} - Requested on ${location}`);
    } else if (error.response && error.response.statusCode) {
      logger.info({ inviteKey, traceID }, `${error.response.statusCode} - ${error.message} - Requested on ${location}`);
    } else {
      logger.info({ inviteKey, traceID }, `Other - ${error.message} - Requested on ${location}`);
    }
  },
  getUriPath(errors) {
    if (errors.options !== undefined && errors.options.url !== undefined) {
      return errors.options.url.pathname;
    }
    if (errors.options !== undefined && errors.options.pathname !== undefined) {
      return errors.options.pathname;
    }
    if (errors.response !== undefined && errors.response.req !== undefined) {
      return errors.response.req.path;
    }
    return 'no uri path';
  },
};
