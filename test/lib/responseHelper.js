module.exports = {
  genericResponse() {
    const genericResponse = {
      locals: {
        keyServiceApiGateway: 'http://test-url/api',
        claimServiceApiGateway: 'http://test-url/api',
        customerServiceApiGateway: 'http://test-url/api',
        logger: { error() {}, info() {} },
      },
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
