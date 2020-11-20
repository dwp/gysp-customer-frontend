module.exports = {
  genericResponse() {
    const genericResponse = {
      locals: {
        keyServiceApiGateway: 'http://test-url/api',
        claimServiceApiGateway: 'http://test-url/api',
        customerServiceApiGateway: 'http://test-url/api',
        bankValidateServiceApiGateway: 'http://test-url/api',
        logger: { error() {}, info() {} },
      },
      viewName: '',
      data: {},
      address: '',
      statusCode: '',
      headers: {},
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
    };
    return genericResponse;
  },
};
