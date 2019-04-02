const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const location = (process.env.CONFIG_LOCATION || '/opt/gysp/customer-frontend/');
let config = '';

try {
  config = yaml.safeLoad(fs.readFileSync(path.resolve(`${location}config/application.yaml`), 'utf8'));
} catch (err) {
  config = 'error';
}

module.exports = config;
