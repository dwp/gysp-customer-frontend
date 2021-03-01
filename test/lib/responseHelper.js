module.exports = {
  genericResponse() {
    const genericResponse = {
      locals: {
        keyServiceApiGateway: 'http://test-url/api',
        claimServiceApiGateway: 'http://test-url/api',
        customerServiceApiGateway: 'http://test-url/api',
        bankValidateServiceApiGateway: 'http://test-url/api',
        traceID: '',
        logMessage: '',
        logger: {
          error(traceID, errorTxt) {
            genericResponse.locals.traceID = traceID;
            genericResponse.locals.logMessage = errorTxt;
          },
          info(traceID, errorTxt) {
            genericResponse.locals.traceID = traceID;
            genericResponse.locals.logMessage = errorTxt;
          },
        },
      },
      viewName: '',
      data: {},
      address: '',
      statusCode: '',
      headers: {},
      cookieData: {},
      clearCookieData: [],
      jsonResponse: '',
      body: '',
      redirect(url) {
        this.address = url;
      },
      render(view, viewData) {
        this.viewName = view;
        this.data = viewData;
      },
      status(status) {
        this.statusCode = status;
        return this;
      },
      json(data) {
        this.jsonResponse = data;
      },
      set(name, value) {
        this.headers[name] = value;
        return this;
      },
      send(body) {
        this.body = body;
        return this;
      },
      cookie(name, value, options) {
        this.cookieData.name = name;
        this.cookieData.value = value;
        this.cookieData.options = options;
        return this;
      },
      clearCookie(name, options) {
        this.clearCookieData.push({ name, options });
      },
    };
    return genericResponse;
  },
};
