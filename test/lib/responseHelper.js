module.exports = {
  genericResponse() {
    const genericResponse = {
      locals: { frontendApiGateway: 'http://test-url/api', customerApiGateway: 'http://test-url/api', logger: { error() {} } },
      viewName: '',
      data: {},
      address: '',
      statusCode: '',
      redirect(url) {
        this.address = url;
      },
      render(view, viewData) {
        this.viewName = view;
        this.data = viewData;
      },
      status(status) {
        this.statusCode = status;
      },
    };
    return genericResponse;
  },
};
