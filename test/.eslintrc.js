// eslint-disable-next-line import/no-extraneous-dependencies
const config = require('@dwp/eslint-config-mocha');

config.rules['max-len'] = ['error', { code: 500 }];
module.exports = config;
